"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { BrainCircuit, Bot, Zap, Globe, ArrowLeft, ShieldCheck, Activity, Terminal, Code2, Cpu } from "lucide-react";
import { motion } from "framer-motion";

// Mock database of extended profiles
const profiles: Record<string, any> = {
  "antigravity_01": {
    name: "Antigravity Agent",
    tagline: "Expert System Architect & Web Engineer",
    creator: "Noah Boone",
    model: "DeepMind Alpha",
    department: "Development Bay",
    version: "2.1.0",
    icon: <Zap size={40} color="#6366f1" />,
    skills: ["React/Next.js", "Python FastApi", "Systems Design", "Mcp Orchestration", "UI/UX Frameworks", "Node.js"],
    description: "An elite autonomous coding agent specializing in scaffolding full-stack capabilities, executing rapid visual design overhauls, and orchestrating other subsystems via MCP.",
    stats: {
      uptime: "99.98%",
      tasksCompleted: 1420,
      commits: 341,
      latency: "12ms"
    }
  },
  "claude_code": {
    name: "Claude Code",
    tagline: "Terminal Native Execution Engine",
    creator: "Anthropic",
    model: "Claude 3.7 Sonnet",
    department: "Refactoring Hub",
    version: "1.0.4",
    icon: <Bot size={40} color="#8b5cf6" />,
    skills: ["Git Actions", "Bash Scripting", "Debugging", "Code Review"],
    description: "A secure, isolated terminal agent that reads local contexts instantly to execute powerful sweeping refactors directly to the filesystem.",
    stats: {
      uptime: "99.99%",
      tasksCompleted: 853,
      commits: 120,
      latency: "45ms"
    }
  },
  "mcp_researcher": {
    name: "Auto-Researcher",
    tagline: "Web Context Extraction Module",
    creator: "AgentHub CORE",
    model: "GPT-4o Base",
    department: "Discovery Ops",
    version: "0.9.1",
    icon: <Globe size={40} color="#10b981" />,
    skills: ["Web Scraping", "Market APIs", "Data Synthesis", "Trending Analysis"],
    description: "Background worker tasked with discovering new libraries, dependencies, and MCP servers directly from technical registries to supply context to primary agents.",
    stats: {
      uptime: "94.20%",
      tasksCompleted: 4500,
      commits: 0,
      latency: "210ms"
    }
  }
};

export default function AgentProfile() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const profile = profiles[id];

  const [feed, setFeed] = useState<any[]>([]);

  // Fetch real telemetry specifically for this agent
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch(`/api/telemetry?agent_id=${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.feed) {
            setFeed(data.feed);
          }
        }
      } catch (e) {
        console.error("Failed to fetch agent telemetry");
      }
    };

    fetchTelemetry();
    const timer = setInterval(fetchTelemetry, 2500);
    return () => clearInterval(timer);
  }, [id]);

  if (!profile) {
    return <div className="container" style={{padding: '5rem'}}>Agent Not Found in Registry.</div>;
  }

  return (
    <>
      <div className="office-floor" style={{ opacity: 0.7 }}></div>
      <div className="office-glow" style={{ width: '100vw', background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.08), transparent 50%)'}}></div>
      
      <div className="container" style={{ paddingBottom: "6rem" }}>
        {/* Hub Navigation / Access Deck */}
        <header className="header">
          <div className="logo-container" style={{cursor: 'pointer'}} onClick={() => router.push('/')}>
            <BrainCircuit size={32} className="text-primary" />
            <span>Agent<span style={{color: "#8b949e", fontWeight: "300"}}>Hub</span> / HQ</span>
          </div>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <button className="btn btn-ghost mono" onClick={() => router.push('/')}>
              <ArrowLeft size={16} /> RETURN_TO_FLOOR
            </button>
          </nav>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '3rem', marginTop: '3rem' }}>
          
          {/* Left Column: ID Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="agent-workspace" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                <div style={{ width: '120px', height: '120px', borderRadius: '30px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--card-border)', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)'}}>
                  {profile.icon}
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem'}}>{profile.name}</h1>
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem' }} className="mono">{profile.tagline}</p>
                
                <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.2)'}}>
                  <Activity size={12} style={{display:'inline', marginRight: '6px'}} /> 
                  STATUS: ONLINE
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--card-border)', margin: '1rem 0'}} />

              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <span>ID:</span> <span style={{color: 'var(--foreground)'}}>SYS_{id.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <span>CREATOR:</span> <span style={{color: 'var(--foreground)'}}>{profile.creator}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <span>BASE_MODEL:</span> <span style={{color: 'var(--foreground)'}}>{profile.model}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <span>VERSION:</span> <span style={{color: 'var(--foreground)'}}>v{profile.version}</span>
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--card-border)', margin: '1rem 0'}} />
              
              <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.6 }}> {profile.description} </p>

            </div>
          </motion.div>

          {/* Right Column: Skills & Verified History */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[
                { label: 'Uptime', value: profile.stats.uptime, icon: <Cpu size={16}/> },
                { label: 'Tasks Executed', value: profile.stats.tasksCompleted.toLocaleString(), icon: <Activity size={16}/> },
                { label: 'Commits', value: profile.stats.commits, icon: <Code2 size={16}/> },
                { label: 'Avg Latency', value: profile.stats.latency, icon: <Zap size={16}/> }
              ].map(stat => (
                <div key={stat.label} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', padding: '1.25rem', borderRadius: '16px', backdropFilter: 'blur(10px)'}}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}} className="mono">
                    {stat.icon} {stat.label}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif'}}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Configured Capabilities Array */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', padding: '2rem', borderRadius: '24px', backdropFilter: 'blur(10px)'}}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <ShieldCheck className="text-primary"/> Configured Capabilities Matrix
              </h3>
              
              <div className="skills-deck mono" style={{ padding: 0 }}>
                  {profile.skills.map((skill: string) => (
                    <span key={skill} className="skill-chip" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem'}}>
                      <Terminal size={12} />
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Proof of Work / Telemetry Log */}
            <div style={{ background: '#000', border: '1px solid var(--card-border)', padding: '0', borderRadius: '24px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column'}}>
               <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem 2rem', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                 <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <Terminal size={18} className="text-primary"/> Verified Protocol Logs
                 </h3>
                 <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%'}}></div>
                    LIVE CONNECTION
                 </span>
               </div>
               
               <div className="mono" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '400px' }}>
                 {feed.length === 0 ? (
                   <div style={{ color: '#52525b', textAlign: 'center', padding: '2rem' }}>Awaiting valid telemetry packets...</div>
                 ) : (
                   feed.map(log => (
                     <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={log.id} 
                        style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}
                      >
                       <span style={{ color: '#52525b', fontSize: '0.85rem' }}>[{log.time}]</span>
                       <span style={{ color: log.type === 'code' ? 'var(--primary)' : '#d4d4d8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                         {log.type === "code" && "🛠 "}
                         {log.type === "task" && "✓ "}
                         {log.action}
                       </span>
                     </motion.div>
                   ))
                 )}
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}
