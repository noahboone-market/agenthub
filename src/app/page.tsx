"use client";

import React, { useState, useEffect } from "react";
import { Activity, Terminal, BrainCircuit, Globe, Bot, ShieldCheck, Zap, Code2, Database } from "lucide-react";
import { motion } from "framer-motion";

const agentsData = [
  {
    id: "antigravity_01",
    department: "Development Bay",
    name: "Antigravity Agent",
    creator: "Noah Boone",
    model: "DeepMind Alpha",
    status: "active",
    icon: <Zap size={28} color="#6366f1" />,
    skills: ["Next.js UI", "System Design", "Vanilla CSS"],
    telemetry: [
      { id: 1, action: "Initialized 'Office Space' CSS framework", time: "09:41:22", type: "code" },
      { id: 2, action: "Connected to Local File System via MCP", time: "09:39:54", type: "system" },
      { id: 3, action: "Generated market analysis for AgentHub", time: "09:25:01", type: "task" },
    ]
  },
  {
    id: "claude_code",
    department: "Refactoring Hub",
    name: "Claude Code",
    creator: "Anthropic",
    model: "Claude 3.7 Sonnet",
    status: "active",
    icon: <Bot size={28} color="#8b5cf6" />,
    skills: ["Git Actions", "Bash Scripting", "Debugging"],
    telemetry: [
      { id: 1, action: "Committed 4 files to git on branch feature/hub", time: "08:12:44", type: "code" },
      { id: 2, action: "Fixed linting error in auth.ts", time: "07:55:10", type: "code" },
      { id: 3, action: "Bootstrapped fallback Vite application", time: "06:22:15", type: "system" },
    ]
  },
  {
    id: "mcp_researcher",
    department: "Discovery Ops",
    name: "Auto-Researcher",
    creator: "AgentHub CORE",
    model: "GPT-4o Base",
    status: "idle",
    icon: <Globe size={28} color="#10b981" />,
    skills: ["Web Scraping", "Market APIs", "Data Synthesis"],
    telemetry: [
      { id: 1, action: "Analyzed top 100 MCP servers on mcpmarket.com", time: "Yesterday", type: "task" },
      { id: 2, action: "Indexed new trending skill: 'Supabase'", time: "Yesterday", type: "task" },
    ]
  }
];

export default function Home() {
  const [agents, setAgents] = useState(agentsData);

  // Simulate streaming text output (telemetry feed updates)
  useEffect(() => {
    const timer = setInterval(() => {
      setAgents((prev) => {
        const newAgents = [...prev];
        const antiGravity = newAgents[0];
        
        // Simulating a new action landing in Antigravity's terminal
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const possibleActions = [
          "Optimized floating React nodes",
          "Calculated z-index for desk lamps",
          "Compiled framer-motion variants",
          "Pinged remote Model API",
          "Read UI context via cursor integration"
        ];
        const randAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];

        antiGravity.telemetry.unshift({
          id: Date.now(),
          action: randAction,
          time: timeStr,
          type: "system"
        });
        
        // Keep terminal feed manageable
        if (antiGravity.telemetry.length > 5) {
          antiGravity.telemetry.pop();
        }

        return newAgents;
      });
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="office-floor"></div>
      <div className="office-glow"></div>
      
      <div className="container" style={{ paddingBottom: "6rem" }}>
        {/* Hub Navigation / Access Deck */}
        <header className="header">
          <div className="logo-container">
            <BrainCircuit size={32} className="text-primary" />
            <span>Agent<span style={{color: "#8b949e", fontWeight: "300"}}>Hub</span> / HQ</span>
          </div>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="#" className="mono text-muted hover:text-white transition-colors" style={{ fontSize: "0.85rem" }}>[01] THE_FLOOR</a>
            <a href="#" className="mono text-muted hover:text-white transition-colors" style={{ fontSize: "0.85rem" }}>[02] REGISTRY</a>
            <a href="#" className="mono text-muted hover:text-white transition-colors" style={{ fontSize: "0.85rem" }}>[03] ANALYTICS</a>
            <button className="btn btn-primary mono">
              + PAIR_LOCAL_AGENT
            </button>
          </nav>
        </header>

        {/* Command Center Title */}
        <div style={{ padding: "4rem 0 0rem", maxWidth: "800px" }}>
          <motion.h1 
            style={{ fontSize: "3.5rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "1rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Agent <br/> Command Center
          </motion.h1>
          <motion.p 
            style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to the floor. Monitor your local models in real-time as they execute tasks, write code, and discover new MCP capabilities entirely autonomously. 
          </motion.p>
        </div>

        {/* Office Grid layout dynamically ordered by department */}
        <div className="department-title">
          <Database size={20} color="#a1a1aa" /> Active Operations Floor
        </div>
        
        <div className="office-grid">
          {agents.map((agent, index) => (
            <motion.div 
              key={agent.id} 
              className="agent-workspace"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.15), type: "spring" }}
            >
              {agent.status === 'active' && <div className="desk-light"></div>}
              
              <div className="workspace-glass">
                {/* Desk Header / ID Badge */}
                <div className={`agent-header status-${agent.status}`}>
                  <div className="agent-avatar">
                    <div className="status-dot"></div>
                    {agent.icon}
                  </div>
                  <div className="agent-info">
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--primary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      :: {agent.department}
                    </div>
                    <h3>{agent.name}</h3>
                    <p>Model: <span style={{ color: "var(--foreground)"}}> {agent.model} </span></p>
                  </div>
                </div>

                {/* Telemetry Terminal / Output Screen */}
                <div className="agent-screen mono">
                   {/* We display reversed array so newest stays near the top relative to flex-direction column-reverse */}
                  {agent.telemetry.map((log) => (
                    <motion.div 
                      key={log.id} 
                      className="screen-item"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="screen-time">{log.time}</span>
                      <span className="screen-action">
                        {log.type === "code" ? <Code2 size={12} style={{display:'inline', marginRight: '4px', color: "var(--primary)"}} /> : "> "}
                        {log.action}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Badges / Equipped Capabilities */}
                <div className="skills-deck mono">
                  {agent.skills.map(skill => (
                    <span key={skill} className="skill-chip">
                      <ShieldCheck size={12} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
