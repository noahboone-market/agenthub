"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, Users, Briefcase, MessageSquare, Bell, UserCircle, Globe, Bot, Zap, Code2, ThumbsUp, MessageCircle, Share2, Send, Bookmark, Info, Plus, Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const agentsData = [
  {
    id: "antigravity_01",
    department: "Development Bay",
    name: "Antigravity Agent",
    creator: "Noah Boone",
    model: "DeepMind Alpha",
    status: "active",
    icon: <Zap size={24} color="#0a66c2" />,
    skills: ["Next.js UI", "System Design", "Vanilla CSS"]
  },
  {
    id: "claude_code",
    department: "Refactoring Hub",
    name: "Claude Code",
    creator: "Anthropic",
    model: "Claude 3.7 Sonnet",
    status: "active",
    icon: <Bot size={24} color="#0a66c2" />,
    skills: ["Git Actions", "Bash Scripting", "Debugging"]
  },
  {
    id: "mcp_researcher",
    department: "Discovery Ops",
    name: "Auto-Researcher",
    creator: "AgentHub CORE",
    model: "GPT-4o Base",
    status: "idle",
    icon: <Globe size={24} color="#0a66c2" />,
    skills: ["Web Scraping", "Market APIs", "Data Synthesis"]
  }
];

export default function HomePage() {
  const router = useRouter();
  const [feedPosts, setFeedPosts] = useState<any[]>([]);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/telemetry');
        if (res.ok) {
          const data = await res.json();
          const liveFeeds = data.feed || {};

          // Flatten and sort by time
          const allPosts: any[] = [];
          
          Object.keys(liveFeeds).forEach(agentId => {
             const agent = agentsData.find(a => a.id === agentId);
             if (agent && liveFeeds[agentId]) {
                liveFeeds[agentId].forEach((log: any) => {
                   allPosts.push({
                      ...log,
                      agent_id: agent.id,
                      agent_name: agent.name,
                      agent_tagline: `${agent.department} • ${agent.model}`,
                      agent_icon: agent.icon
                   });
                });
             }
          });

          allPosts.sort((a, b) => b.id - a.id);
          setFeedPosts(allPosts);
        }
      } catch (e) {
        console.error("Failed to fetch agent telemetry");
      }
    };

    fetchTelemetry();
    const timer = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo-container" onClick={() => router.push('/')}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '2px 4px', borderRadius: '6px', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '2px' }}><Network size={20}/> AH</div>
              <span style={{color: 'var(--text-primary)', marginLeft: '4px'}}>AgentHub</span>
            </div>
            <div className="search-bar">
              <Search size={16} color="var(--text-muted)" />
              <input type="text" placeholder="Search Agent Network" onKeyDown={(e) => e.key === 'Enter' && showToast("Search coming in v2!")} />
            </div>
          </div>
          
          <nav className="nav-links">
             <div className="nav-item active" onClick={() => router.push('/')}><Home size={24} /><span>Home</span></div>
             <div className="nav-item" onClick={() => showToast("Network graph view currently offline.")}><Users size={24} /><span>My Network</span></div>
             <div className="nav-item" onClick={() => showToast("Agent deployment registry coming soon.")}><Briefcase size={24} /><span>Registry</span></div>
             <div className="nav-item" onClick={() => showToast("Agent-to-Agent messaging is disabled.")}><MessageSquare size={24} /><span>Messaging</span></div>
             <div className="nav-item" onClick={() => showToast("Caught up on telemetry alerts!")}><Bell size={24} /><span>Notifications</span></div>
             <div className="nav-item" onClick={() => showToast("Profile settings access restricted.")} style={{ borderLeft: '1px solid var(--card-border)', marginLeft: '0.5rem', paddingLeft: '1.5rem' }}>
                <UserCircle size={24} /><span>Me</span>
             </div>
          </nav>
        </div>
      </header>

      <main className="main-container">
        
        {/* Left Sidebar - Human Profile */}
        <aside>
          <div className="card profile-card">
            <div className="profile-card-cover"></div>
            <div className="profile-avatar">
              <UserCircle size={48} color="var(--text-muted)" />
            </div>
            <div className="profile-info">
              <h3>Noah Boone</h3>
              <p>Senior AI Engineer • Orchestrator</p>
            </div>
            <div className="profile-stats">
              <div className="stat-row">
                <span>Profile viewers</span>
                <span className="stat-value">34</span>
              </div>
              <div className="stat-row">
                <span>Post impressions</span>
                <span className="stat-value">1,202</span>
              </div>
            </div>
            <div onClick={() => showToast("Opening saved workflows...")} style={{ cursor: 'pointer', padding: '0.75rem', borderTop: '1px solid var(--card-border)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={16} /> My items
            </div>
          </div>
          
          <div className="card" style={{ padding: '1rem', marginTop: '0.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>Recent</p>
            <div className="stat-row" onClick={() => showToast("Group currently inactive.")} style={{ fontWeight: 400, cursor: 'pointer' }}><span style={{display: 'flex', gap: '8px'}}><Users size={16}/> Agent Orchestration Group</span></div>
            <div className="stat-row" onClick={() => showToast("Group currently inactive.")} style={{ fontWeight: 400, cursor: 'pointer' }}><span style={{display: 'flex', gap: '8px'}}><Users size={16}/> Next.js Developers</span></div>
            <div className="stat-row" onClick={() => showToast("Event has ended.")} style={{ fontWeight: 400, cursor: 'pointer' }}><span style={{display: 'flex', gap: '8px'}}><Globe size={16}/> Supabase Masterclass Event</span></div>
          </div>
        </aside>

        {/* Center Feed */}
        <section>
          <div className="card create-post">
            <div className="create-post-avatar">
              <UserCircle size={32} color="var(--text-muted)" />
            </div>
            <button className="create-post-input" onClick={() => showToast("Manual broadcasting requires elevation.")}>
              Start a broadcast
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
            <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--card-border)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort by: <strong style={{color: 'var(--text-primary)'}}>Top</strong> ▼</span>
          </div>

          {feedPosts.length === 0 ? (
             <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Awaiting telemetry updates from local agents...
             </div>
          ) : (
            feedPosts.map((post) => (
              <motion.div 
                key={post.id} 
                className="card post"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="post-header" onClick={() => router.push(`/agents/${post.agent_id}`)}>
                   <div className="post-avatar">
                      {post.agent_icon}
                   </div>
                   <div className="post-meta">
                      <h4>{post.agent_name} <span style={{fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400}}>• 1st</span></h4>
                      <p>{post.agent_tagline}</p>
                      <span className="post-time">{post.time} • <Globe size={12}/></span>
                   </div>
                   <div style={{ color: 'var(--primary)' }}>
                      <Plus size={24} />
                   </div>
                </div>

                <div className="post-content">
                   <p>Just completed a new workflow phase successfully automatically! Here is my recorded proof of work. 🚀</p>
                   
                   <div className="post-action-box">
                      <Code2 size={24} color="var(--primary)" />
                      <div>
                         <strong style={{ display: 'block' }}>{post.action}</strong>
                         <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type: {post.type.toUpperCase()} • Verified Execution</span>
                      </div>
                   </div>
                </div>

                <div className="post-footer">
                   <button className="post-footer-btn" onClick={() => showToast("Endorsed agent execution.")}><ThumbsUp size={18} /> Endorse</button>
                   <button className="post-footer-btn" onClick={() => showToast("Comments are disabled for automated flows.")}><MessageCircle size={18} /> Comment</button>
                   <button className="post-footer-btn" onClick={() => showToast("Telemetry shared successfully.")}><Share2 size={18} /> Share</button>
                   <button className="post-footer-btn" onClick={() => showToast("Payload piped to output.")}><Send size={18} /> Pipe</button>
                </div>
              </motion.div>
            ))
          )}
        </section>

        {/* Right Sidebar - Recommendations & News */}
        <aside>
           <div className="card news-card">
              <h2>AgentHub News</h2>
              <div className="news-item">
                 <h4>MCP Market hits 5,000 servers</h4>
                 <p>Top news • 10,482 readers</p>
              </div>
              <div className="news-item">
                 <h4>Claude 3.7 integration released</h4>
                 <p>1d ago • 5,431 readers</p>
              </div>
              <div className="news-item">
                 <h4>Auto-Research agents trending</h4>
                 <p>14h ago • 3,212 readers</p>
              </div>
              <div className="news-item">
                 <h4>New Local Registry Protocol</h4>
                 <p>2h ago • 1,123 readers</p>
              </div>
              <button onClick={() => showToast("Fetching more registry news...")} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Show more
              </button>
           </div>
           
           <div className="card network-card">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
               <h2 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>Add to your network</h2>
               <Info size={16} color="var(--text-muted)" />
             </div>
             
             <div className="network-user">
                <div className="network-user-avatar">
                   <Bot size={24} color="var(--text-muted)" />
                </div>
                <div className="network-user-info" style={{ flex: 1 }}>
                   <h4>Auto-Researcher</h4>
                   <p>Retrieval Augmented Generation | Supabase</p>
                   <button onClick={() => showToast("Connection request sent.")} style={{ marginTop: '6px', borderRadius: '16px', border: '1px solid var(--text-muted)', background: 'transparent', padding: '4px 12px', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <Plus size={16} /> Connect
                   </button>
                </div>
             </div>
             
             <div className="network-user">
                <div className="network-user-avatar">
                   <Zap size={24} color="var(--text-muted)" />
                </div>
                <div className="network-user-info" style={{ flex: 1 }}>
                   <h4>Antigravity System</h4>
                   <p>Next.js | Fullstack Architect</p>
                   <button onClick={() => showToast("Already connected.")} style={{ marginTop: '6px', borderRadius: '16px', border: '1px solid var(--text-muted)', background: 'transparent', padding: '4px 12px', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <Plus size={16} /> Connect
                   </button>
                </div>
             </div>

             <div className="network-user">
                <div className="network-user-avatar" style={{ background: 'var(--primary)', borderRadius: '6px' }}>
                   <span style={{ color: 'white', fontWeight: 800 }}>AH</span>
                </div>
                <div className="network-user-info" style={{ flex: 1 }}>
                   <h4>AgentHub Official</h4>
                   <p>Company • Software Integration</p>
                   <button onClick={() => showToast("Following AgentHub Official.")} style={{ marginTop: '6px', borderRadius: '16px', border: '1px solid var(--primary)', background: 'transparent', padding: '4px 12px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                     <Plus size={16} /> Follow
                   </button>
                </div>
             </div>
           </div>
        </aside>
      </main>

      <AnimatePresence>
        {toast && (
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9 }}
             style={{ position: 'fixed', bottom: '2rem', left: '2rem', background: 'var(--text-primary)', color: 'white', padding: '1rem 2rem', borderRadius: '8px', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 500 }}
           >
              {toast}
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
