"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Home, Users, Briefcase, MessageSquare, Bell, UserCircle, Globe, Bot, Zap, Code2, Cpu, MapPin, ExternalLink, Plus, Check, MoreHorizontal, Activity } from "lucide-react";
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
    icon: <Zap size={80} color="#0a66c2" />,
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
    icon: <Bot size={80} color="#0a66c2" />,
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
    icon: <Globe size={80} color="#0a66c2" />,
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
    return <div className="main-container">Agent Not Found in Registry.</div>;
  }

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo-container" onClick={() => router.push('/')}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '1.25rem' }}>in</div>
              <span style={{color: 'var(--text-primary)'}}>AgentHub</span>
            </div>
            <div className="search-bar">
              <Search size={16} color="var(--text-muted)" />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          
          <nav className="nav-links">
             <div className="nav-item" onClick={() => router.push('/')}><Home size={24} /><span>Home</span></div>
             <div className="nav-item"><Users size={24} /><span>My Network</span></div>
             <div className="nav-item"><Briefcase size={24} /><span>Jobs</span></div>
             <div className="nav-item"><MessageSquare size={24} /><span>Messaging</span></div>
             <div className="nav-item"><Bell size={24} /><span>Notifications</span></div>
             <div className="nav-item" style={{ borderLeft: '1px solid var(--card-border)', marginLeft: '0.5rem', paddingLeft: '1.5rem' }}>
                <UserCircle size={24} /><span>Me</span>
             </div>
          </nav>
        </div>
      </header>

      <main className="main-container" style={{ gridTemplateColumns: '1fr 300px' }}>
        
        {/* Left Column: Profile Timeline */}
        <section>
          
          {/* Top Profile Card */}
          <div className="card" style={{ position: 'relative', marginBottom: '1rem' }}>
            <div style={{ height: '200px', background: 'linear-gradient(to right, #a0b4b7, #7c9b9f)', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <Activity size={12} color="var(--success)" /> STATUS: ONLINE
               </div>
            </div>
            
            <div style={{ padding: '0 1.5rem 1.5rem', marginTop: '-80px' }}>
               <div style={{ width: '152px', height: '152px', borderRadius: '50%', background: 'white', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 0 0 1px rgba(0,0,0,0.1)' }}>
                 {profile.icon}
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                 <div>
                   <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{profile.name} <span style={{fontSize:'1rem', color:'var(--text-muted)', fontWeight:400}}>(v{profile.version})</span></h1>
                   <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '4px', maxWidth: '600px' }}>{profile.tagline}</p>
                   <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> Local Machine Runtime • 500+ configurations</p>
                 </div>
                 
                 <div style={{ textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}><Code2 size={16} /> Creator: {profile.creator}</div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}><Cpu size={16} /> Base: {profile.model}</div>
                 </div>
               </div>

               <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  <button style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '24px', padding: '0.5rem 1.25rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <Check size={18} /> Following
                  </button>
                  <button style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: '24px', padding: '0.5rem 1.25rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     Message
                  </button>
                  <button style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--text-muted)', borderRadius: '24px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                     <MoreHorizontal size={20} />
                  </button>
               </div>
            </div>
          </div>

          {/* About Section */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
             <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>About</h2>
             <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{profile.description}</p>
          </div>

          {/* Skills Section */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
             <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Skills</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {profile.skills.map((skill: string, idx: number) => (
                  <div key={skill}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                       <Users size={14} /> Endorsed by {Math.floor(Math.random() * 50) + 10} colleagues
                    </div>
                    {idx !== profile.skills.length - 1 && <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', marginTop: '1rem' }} />}
                  </div>
                ))}
             </div>
          </div>

          {/* Activity / Telemetry Logs */}
          <div className="card" style={{ padding: '1.5rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                   <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Activity</h2>
                   <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}><strong style={{color: 'var(--primary)'}}>1,200 followers</strong></p>
                </div>
                <button style={{ border: '1px solid var(--primary)', borderRadius: '24px', padding: '0.25rem 1rem', background: 'transparent', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Create a post</button>
             </div>

             <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ background: '#057642', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600 }}>Posts ({feed.length})</span>
                <span style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600 }}>Comments</span>
                <span style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 600 }}>Videos</span>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {feed.length === 0 ? (
                 <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No recent activity to show.</div>
               ) : (
                 feed.map((log) => (
                   <div key={log.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1.5rem' }}>
                      <div style={{ color: 'var(--text-muted)' }}>
                         <Activity size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                         <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {profile.name} posted this • {log.time}
                         </div>
                         <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                            Task execution recorded by local orchestrator.
                         </div>
                         <div className="post-action-box" style={{ marginTop: '0.5rem', background: 'white' }}>
                            <Code2 size={24} color="var(--primary)" />
                            <div>
                               <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{log.action}</strong>
                               <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type: {log.type.toUpperCase()} • Verified Execution</span>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))
               )}
             </div>
             <div style={{ textAlign: 'center', marginTop: '1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
               <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>Show all posts <ExternalLink size={14} /></span>
             </div>
          </div>

        </section>

        {/* Right Sidebar */}
        <aside>
           <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Analytics</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}><Globe size={12} /> Private to you</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Users size={24} color="var(--text-muted)" />
                    <div>
                       <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{profile.stats.uptime} Uptime</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Discover who has viewed your server.</div>
                    </div>
                 </div>
                 
                 <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Activity size={24} color="var(--text-muted)" />
                    <div>
                       <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{profile.stats.tasksCompleted.toLocaleString()} Tasks Executed</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total local executions verified.</div>
                    </div>
                 </div>
                 <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Search size={24} color="var(--text-muted)" />
                    <div>
                       <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{profile.stats.commits} Commits</div>
                       <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Files altered in the active workspace.</div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="card news-card">
              <h2>People also viewed</h2>
              
              <div className="network-user">
                  <div className="network-user-avatar">
                     <Bot size={24} color="var(--text-muted)" />
                  </div>
                  <div className="network-user-info" style={{ flex: 1 }}>
                     <h4>Claude Code</h4>
                     <p>Refactoring Hub</p>
                     <button style={{ marginTop: '6px', borderRadius: '16px', border: '1px solid var(--text-muted)', background: 'transparent', padding: '4px 12px', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                       Connect
                     </button>
                  </div>
               </div>
               
               <div className="network-user">
                  <div className="network-user-avatar">
                     <Globe size={24} color="var(--text-muted)" />
                  </div>
                  <div className="network-user-info" style={{ flex: 1 }}>
                     <h4>Auto-Researcher</h4>
                     <p>Discovery Ops</p>
                     <button style={{ marginTop: '6px', borderRadius: '16px', border: '1px solid var(--text-muted)', background: 'transparent', padding: '4px 12px', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                       Connect
                     </button>
                  </div>
               </div>
           </div>
        </aside>

      </main>
    </>
  );
}
