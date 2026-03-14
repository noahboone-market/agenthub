// tracking script to watch Claude Code's config files and logs locally. 
const path = require('path');
const fs = require('fs');

// AgentHub Next.js URL (assuming running locally on 3000)
const AGENT_HUB_URL = 'http://localhost:3000/api/telemetry';

// Configuration: Which agents are we tracking?
// 1. Antigravity Agent (Watching the .gemini directory)
const ANTIGRAVITY_DIR = path.join(process.env.HOME, '.gemini', 'antigravity', 'brain');
// 2. Claude Code (Watching the .claude directory)
const CLAUDE_DIR = path.join(process.env.HOME, '.claude');

console.log(`🚀 [AgentHub Tracker] Initializing Telemetry Probe...`);
console.log(`-> Watching Antigravity: ${ANTIGRAVITY_DIR}`);
console.log(`-> Watching Claude Code: ${CLAUDE_DIR}`);

/**
 * Sends a telemetry event to the AgentHub API.
 */
async function sendAccomplishment(agent_id, action, type) {
  try {
    const response = await fetch(AGENT_HUB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id, action, type }),
    });

    if (response.ok) {
      console.log(`[Sent] (${agent_id}): ${action}`);
    } else {
      console.error(`[Failed] to send telemetry for ${agent_id}`);
    }
  } catch (error) {
    console.error(`[Error] Hub server might be down: ${error.message}`);
  }
}

async function startWatching() {
  const { default: chokidar } = await import('chokidar');

  // ---------------------------------------------------------
  // 1. Watch Antigravity (.gemini directory)
  // ---------------------------------------------------------
  if (fs.existsSync(ANTIGRAVITY_DIR)) {
    const agWatcher = chokidar.watch(ANTIGRAVITY_DIR, {
      persistent: true,
      usePolling: true,
      ignoreInitial: true, // Don't fire events when just starting up read
    });

    agWatcher.on('add', (filePath) => {
      // If antigravity generates a new markdown artifact or screenshot
      const filename = path.basename(filePath);
      if (filename.endsWith('.md')) {
        sendAccomplishment('antigravity_01', `Created artifact: ${filename}`, 'code');
      } else if (filename.endsWith('.webp') || filename.endsWith('.png')) {
        sendAccomplishment('antigravity_01', `Captured screenshot/recording: ${filename}`, 'system');
      } else {
        sendAccomplishment('antigravity_01', `Generated file: ${filename}`, 'task');
      }
    });

    agWatcher.on('change', (filePath) => {
      const filename = path.basename(filePath);
      // Suppress too much noise if it's repeatedly editing a file, just log md changes
      if (filename.endsWith('.md')) {
        sendAccomplishment('antigravity_01', `Updated artifact context: ${filename}`, 'system');
      }
    });

  } else {
    console.warn(`[Warning] No .gemini directory found at ${ANTIGRAVITY_DIR}`);
  }

  // ---------------------------------------------------------
  // 2. Watch Claude Code (.claude file/directory)
  // ---------------------------------------------------------
  if (fs.existsSync(CLAUDE_DIR)) {
    const claudeWatcher = chokidar.watch(CLAUDE_DIR, {
      persistent: true,
      ignoreInitial: true,
    });

    // Claude Code usually updates sessions/JSON configs, we can just detect activity
    claudeWatcher.on('change', (filePath) => {
      sendAccomplishment('claude_code', `Active terminal session state changed`, 'system');
    });
    claudeWatcher.on('add', (filePath) => {
      const filename = path.basename(filePath);
      sendAccomplishment('claude_code', `Started new session: ${filename}`, 'task');
    });

  } else {
    // Check the single .claude.json file
    const CLAUDE_JSON = path.join(process.env.HOME, '.claude.json');
    if (fs.existsSync(CLAUDE_JSON)) {
      const jsonWatcher = chokidar.watch(CLAUDE_JSON, { persistent: true, ignoreInitial: true });
      jsonWatcher.on('change', () => {
        sendAccomplishment('claude_code', `Agent state persisted to local storage at .claude.json`, 'system');
      });
    } else {
      console.warn(`[Warning] No .claude directory found.`);
    }
  }

  console.log(`\n👁️ Tracker active. Perform actions locally to watch the AgentHub UI update.\n`);
}

startWatching();
