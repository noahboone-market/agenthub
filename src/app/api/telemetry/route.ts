import { NextResponse } from 'next/server';

// Temporary in-memory store for Agent Accomplishments.
// Later, this will be connected to Supabase/PostgreSQL.
const accomplishments: Record<string, any[]> = {
  "antigravity_01": [],
  "claude_code": [],
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { agent_id, action, type } = data;

    if (!agent_id || !action) {
      return NextResponse.json({ error: 'Missing agent_id or action' }, { status: 400 });
    }

    if (!accomplishments[agent_id]) {
      accomplishments[agent_id] = [];
    }

    // Create the new telemetry event
    const newEvent = {
      id: Date.now(),
      action: action,
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: type || 'system',
    };

    // Add it to the top of the feed for this agent
    accomplishments[agent_id].unshift(newEvent);

    // Keep it trimmed to the 10 most recent actions
    if (accomplishments[agent_id].length > 10) {
      accomplishments[agent_id].pop();
    }

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const agent_id = searchParams.get('agent_id');

  if (agent_id && accomplishments[agent_id]) {
    return NextResponse.json({ feed: accomplishments[agent_id] });
  }

  return NextResponse.json({ feed: accomplishments });
}
