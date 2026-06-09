import { useState, useEffect, useRef } from "react";
import "./index.css";

function Icon({ d, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display:"inline-block", flexShrink:0 }}>
      {Array.isArray(d) ? d.map((p,i) => <path key={i} d={p}/>) : <path d={d}/>}
    </svg>
  );
}

const I = {
  sparkles:["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z","M20 3v4","M22 5h-4","M4 17v2","M5 18H3"],
  arrowRight:"M5 12h14M12 5l7 7-7 7",
  arrowUp:"M12 19V5M5 12l7-7 7 7",
  arrowLeft:"M19 12H5M12 19l-7-7 7-7",
  mapPin:["M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0","M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6"],
  shield:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
  video:["M15.6 11.6L22 7v10l-6.4-4.5v-1z","M4 5h9a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"],
  stethoscope:["M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3","M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4","M17 9h.01","M20 9h.01"],
  check:["M22 11.08V12a10 10 0 1 1-5.93-9.14","M9 11l3 3L22 4"],
  clock:["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M12 6v6l4 2"],
  dollar:["M12 2v20","M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  heart:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  monitor:["M9 10h.01","M15 10h.01","M12 2a8 8 0 0 0-7 11.9L4.27 19a2 2 0 0 0 1.9 2.73h11.66a2 2 0 0 0 1.9-2.73L18.07 14A8 8 0 0 0 12 2z"],
  messageCircle:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
  star:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
  brain:["M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z","M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z","M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4","M17.599 6.5a3 3 0 0 0 .399-1.375","M6.003 5.125A3 3 0 0 0 6.401 6.5","M3.477 10.896a4 4 0 0 1 .585-.396","M19.938 10.5a4 4 0 0 1 .585.396","M6 18a4 4 0 0 1-1.967-.516","M19.967 17.484A4 4 0 0 1 18 18"],
  pill:"M10.5 9.5 14.5 13.5M16.646 16.646a5 5 0 0 1-7.292-6.878l6.878 6.878z",
  activity:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
  clipboard:["M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2","M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"],
  chevDown:"M6 9l6 6 6-6",
  chevUp:"M18 15l-6-6-6 6",
  creditCard:["M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z","M2 10h20"],
  fileText:["M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z","M14 2v4a2 2 0 0 0 2 2h4","M10 9H8","M16 13H8","M16 17H8"],
  user:["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  tag:["M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z","M7.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"],
  alert:["M22 20H2l10-18z","M12 9v4","M12 16v.01"],
  info:["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z","M12 16v-4","M12 8h.01"],
  menu:["M4 6h16","M4 12h16","M4 18h16"],
  x:"M18 6 6 18M6 6l12 12",
};

const T="#0F766E",TD="#134E4A",TL="#CCFBF1",TB="#F0FDFA",CR="#F97066",CRH="#E85D52";
const S={50:"#F8FAFC",100:"#F1F5F9",200:"#E2E8F0",400:"#94A3B8",500:"#64748B",600:"#475569",700:"#334155",800:"#1E293B",900:"#0F172A"};
const F="'Plus Jakarta Sans', system-ui, sans-serif";
const IMGS={
  hero:"https://d2xsxph8kpxj0f.cloudfront.net/310519663389991654/crJCCDDuyDshcEVD5zndSx/clarity-hero-kTCUx7QnfGEGtTwu3tG9jk.webp",
  telehealth:"https://d2xsxph8kpxj0f.cloudfront.net/310519663389991654/crJCCDDuyDshcEVD5zndSx/clarity-telehealth-JrwZMBRbq9377SSakiLhcP.webp",
  brain:"https://d2xsxph8kpxj0f.cloudfront.net/310519663389991654/crJCCDDuyDshcEVD5zndSx/clarity-brain-ShCScqtSMCxF3q62nDeurG.webp",
  pnw:"https://d2xsxph8kpxj0f.cloudfront.net/310519663389991654/crJCCDDuyDshcEVD5zndSx/clarity-pnw-Xtv2g8sSnYbVGNsb5NhtbW.webp",
};

if(!document.getElementById("clarity-font")){
  const l=document.createElement("link");
  l.id="clarity-font";l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
}

// scroll to a ref smoothly
function scrollTo(ref){ ref?.current?.scrollIntoView({behavior:"smooth",block:"start"}); }

function Badge({label}){
  return <span style={{display:"inline-block",padding:"6px 16px",background:TB,color:T,fontSize:13,fontWeight:600,borderRadius:999,marginBottom:16}}>{label}</span>;
}

function FilterPill({label,active,onClick}){
  return(
    <button onClick={onClick} style={{padding:"6px 16px",borderRadius:999,border:`1px solid ${active?T:S[200]}`,background:active?TB:"#fff",color:active?T:S[600],fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:F}}>
      {label}
    </button>
  );
}

// ── NAVBAR ──
function Navbar({setPage,sectionRefs}){
  const [scrolled,setScrolled]=useState(false);
  const [mob,setMob]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);

  const links=[
    {label:"How It Works",ref:"process"},
    {label:"Pricing",ref:"pricing"},
    {label:"About",ref:"about"},
    {label:"Resources",pg:"blog"},
    {label:"Patient Guides",pg:"guides"},
    {label:"FAQ",ref:"faq"},
  ];

  const handleLink=(lk)=>{
    setMob(false);
    if(lk.pg){setPage(lk.pg);return;}
    if(lk.ref&&sectionRefs?.[lk.ref]){scrollTo(sectionRefs[lk.ref]);}
  };

  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,fontFamily:F,background:scrolled?"rgba(255,255,255,0.97)":"transparent",backdropFilter:scrolled?"blur(12px)":"none",boxShadow:scrolled?"0 1px 3px rgba(0,0,0,0.08)":"none",transition:"all .3s"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
          <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer"}}>
            <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${T},${TD})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
              <Icon d={I.sparkles} size={16}/>
            </div>
            <span style={{fontSize:17,fontWeight:700,color:S[800]}}>Clarity <span style={{color:T}}>ADHD</span></span>
          </button>

          {/* desktop */}
          <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"nowrap"}}>
            {links.map(lk=>(
              <button key={lk.label} onClick={()=>handleLink(lk)} style={{fontSize:13,fontWeight:500,color:S[600],background:"none",border:"none",cursor:"pointer",fontFamily:F,whiteSpace:"nowrap"}}>
                {lk.label}
              </button>
            ))}
            <button onClick={()=>sectionRefs?.book&&scrollTo(sectionRefs.book)} style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px",background:`linear-gradient(135deg,${CR},${CRH})`,color:"#fff",fontSize:13,fontWeight:700,borderRadius:999,border:"none",cursor:"pointer",fontFamily:F,whiteSpace:"nowrap"}}>
              Book Consultation <Icon d={I.arrowRight} size={14}/>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── HERO ──
function Hero({bookRef}){
  return(
    <section style={{position:"relative",minHeight:"88vh",display:"flex",alignItems:"center",overflow:"hidden",fontFamily:F}}>
      <div style={{position:"absolute",inset:0}}>
        <img src={IMGS.hero} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(255,255,255,.97) 0%,rgba(255,255,255,.88) 55%,rgba(255,255,255,.3) 100%)"}}/>
      </div>
      <div style={{position:"relative",maxWidth:1100,margin:"0 auto",padding:"120px 20px 80px",width:"100%"}}>
        <div style={{maxWidth:560}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 14px",background:TB,border:`1px solid ${TL}`,borderRadius:999,marginBottom:22}}>
            <Icon d={I.mapPin} size={14}/> <span style={{fontSize:13,fontWeight:500,color:TD}}>Serving adults across Washington State</span>
          </div>
          <h1 style={{fontSize:"clamp(32px,4.5vw,54px)",fontWeight:800,color:S[900],lineHeight:1.1,letterSpacing:"-0.02em",marginBottom:20}}>
            Finally, ADHD care that <span style={{color:T}}>actually works.</span>
          </h1>
          <p style={{fontSize:"clamp(15px,1.8vw,18px)",color:S[500],lineHeight:1.75,marginBottom:28,maxWidth:480}}>
            Evidence-based ADHD assessment, objective testing, and personalized medication management — all from the comfort of your home. No waitlists. No rushed appointments.
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:36}}>
            <button onClick={()=>scrollTo(bookRef)} style={{display:"flex",alignItems:"center",gap:8,padding:"13px 26px",background:`linear-gradient(135deg,${CR},${CRH})`,color:"#fff",fontWeight:700,fontSize:15,borderRadius:999,border:"none",cursor:"pointer",fontFamily:F,boxShadow:"0 4px 16px rgba(249,112,102,.35)"}}>
              Get Started <Icon d={I.arrowRight} size={17}/>
            </button>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:18,paddingTop:24,borderTop:`1px solid rgba(148,163,184,.3)`}}>
            {[[I.shield,"HIPAA Compliant"],[I.video,"100% Telehealth"],[I.stethoscope,"Board-Certified PA"]].map(([ic,lb])=>(
              <div key={lb} style={{display:"flex",alignItems:"center",gap:7,color:S[500],fontSize:13}}>
                <span style={{color:T}}><Icon d={ic} size={14}/></span>{lb}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TRUST BAR ──
function TrustBar(){
  return(
    <section style={{background:S[50],borderTop:`1px solid ${S[100]}`,borderBottom:`1px solid ${S[100]}`,fontFamily:F}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"36px 20px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24}}>
          {[["6-Week","Structured Program"],["QBTest","Objective Testing"],["3","Medication Trials"],["100%","Telehealth"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:800,color:T,marginBottom:4}}>{v}</div>
              <div style={{fontSize:13,color:S[500],fontWeight:500}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ──
function Process({sRef}){
  const steps=[
    {week:"Week 1",title:"Comprehensive Assessment",desc:"50-minute deep-dive evaluation covering your history, symptoms, and goals. We listen — really listen.",icon:I.clipboard,detail:"Includes validated screening tools (ASRS-5, DIVA-5) and clinical interview"},
    {week:"Week 2",title:"QBTest Results & Start Medication #1",desc:"Review your FDA-cleared QBTest results together, discuss what the data shows, and start your first medication trial.",icon:I.brain,detail:"QBTest objectively measures attention, impulsivity, and activity — giving us data to guide treatment"},
    {week:"Week 3",title:"Check-In & Medication #2",desc:"Review how you responded to the first medication. We assess effectiveness and side effects, then start a second option.",icon:I.pill,detail:"Systematic tracking of response, side effects, and daily functioning for each trial"},
    {week:"Week 4",title:"Check-In & Medication #3",desc:"Evaluate the second trial and start a third medication. Comparing three options gives us the best chance of finding your ideal fit.",icon:I.activity,detail:"Three trials means we're not guessing — we're finding what truly works for your brain"},
    {week:"Week 6",title:"Optimization & Maintenance Plan",desc:"Based on your response across all three trials, we settle on the best medication and dose — then build your long-term plan.",icon:I.check,detail:"Transition to maintenance visits every 1-3 months"},
  ];
  return(
    <section ref={sRef} style={{padding:"80px 20px",background:"#fff",fontFamily:F}}>
      <div style={{maxWidth:640,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <Badge label="Our Process"/>
          <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:S[900],marginBottom:14}}>A structured path to finding what works</h2>
          <p style={{fontSize:16,color:S[500],lineHeight:1.7}}>Most ADHD clinics spend 15 minutes and hand you a prescription. We take 6 weeks to systematically find your optimal treatment.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {steps.map((s,i)=>(
            <div key={s.week} style={{display:"flex",gap:0,alignItems:"stretch"}}>
              {/* left spine */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:56,flexShrink:0}}>
                {i>0&&<div style={{width:2,flex:"0 0 20px",background:TL}}/>}
                <div style={{width:44,height:44,borderRadius:13,background:`linear-gradient(135deg,${T},${TD})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>
                  <Icon d={s.icon} size={18}/>
                </div>
                {i<steps.length-1&&<div style={{width:2,flex:1,background:TL,minHeight:40}}/>}
              </div>
              {/* content */}
              <div style={{flex:1,paddingLeft:20,paddingBottom:40}}>
                <span style={{display:"inline-block",padding:"3px 10px",background:TB,color:T,fontSize:11,fontWeight:700,borderRadius:999,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.week}</span>
                <h3 style={{fontSize:17,fontWeight:700,color:S[900],marginBottom:6}}>{s.title}</h3>
                <p style={{color:S[600],lineHeight:1.7,marginBottom:4,fontSize:14}}>{s.desc}</p>
                <p style={{fontSize:12,color:S[400],fontStyle:"italic"}}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHY CLARITY ──
function WhyClarity(){
  const items=[
    [I.brain,"Objective Testing, Not Just Questionnaires","We use the FDA-cleared QBTest to measure attention, impulsivity, and activity objectively — giving you data, not opinions."],
    [I.pill,"Systematic Medication Optimization","We systematically trial 3 medications to find what actually works best for your brain chemistry."],
    [I.clock,"Thorough, Never Rushed","Your initial assessment is 50 minutes. Complex conditions deserve careful, unhurried attention."],
    [I.video,"Telehealth That Actually Works","HIPAA-compliant video visits from anywhere in Washington. No commute, no waiting rooms."],
    [I.dollar,"Transparent Cash-Pay Pricing","One clear price for your assessment program. No insurance headaches, no surprise bills."],
    [I.heart,"Continuity of Care","You see the same provider every visit. No rotating residents, no starting over."],
  ];
  return(
    <section style={{padding:"80px 20px",background:S[50],fontFamily:F}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",maxWidth:600,margin:"0 auto 48px"}}>
          <Badge label="Why Clarity ADHD"/>
          <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:S[900],lineHeight:1.2}}>ADHD care designed for adults who've been let down before</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:16}}>
          {items.map(([ic,title,desc])=>(
            <div key={title} style={{display:"flex",gap:16,background:"#fff",borderRadius:16,padding:"20px 22px",border:`1px solid ${S[100]}`}}>
              <div style={{width:42,height:42,borderRadius:12,background:TL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:T}}>
                <Icon d={ic} size={19}/>
              </div>
              <div>
                <div style={{fontWeight:700,color:S[900],marginBottom:5,fontSize:14}}>{title}</div>
                <div style={{fontSize:13,color:S[500],lineHeight:1.65}}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ──
function Pricing({sRef,bookRef}){
  return(
    <section ref={sRef} style={{padding:"80px 20px",background:"#fff",fontFamily:F}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",maxWidth:600,margin:"0 auto 56px"}}>
          <Badge label="Transparent Pricing"/>
          <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:S[900],marginBottom:14}}>Clear pricing. No surprises.</h2>
          <p style={{fontSize:16,color:S[500],lineHeight:1.7,marginBottom:18}}>Cash-pay means no insurance battles, no prior authorizations, and no surprise bills.</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:8}}>
            {["No Monthly Subscriptions","No Auto-Charges","No Hidden Fees","No 4-Week Waitlists"].map(b=>(
              <span key={b} style={{display:"flex",alignItems:"center",gap:4,padding:"5px 12px",background:TB,border:`1px solid ${TL}`,color:T,fontSize:12,fontWeight:600,borderRadius:999}}>
                <Icon d={I.check} size={12}/> {b}
              </span>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:24,maxWidth:860,margin:"0 auto"}}>
          {/* featured */}
          <div style={{background:`linear-gradient(135deg,${T},${TD})`,borderRadius:22,padding:32,color:"#fff",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-40,right:-40,width:140,height:140,background:"rgba(255,255,255,.07)",borderRadius:"50%"}}/>
            <div style={{position:"relative"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",background:"rgba(255,255,255,.2)",borderRadius:999,fontSize:12,fontWeight:500,marginBottom:18}}>
                <Icon d={I.star} size={12}/> Most Popular
              </div>
              <h3 style={{fontSize:20,fontWeight:700,marginBottom:5}}>ADHD Assessment & Optimization</h3>
              <p style={{color:"rgba(255,255,255,.7)",fontSize:13,marginBottom:20}}>Complete 6-week program · 5 visits</p>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:20}}>
                <span style={{fontSize:48,fontWeight:800}}>$949</span>
                <span style={{color:"rgba(255,255,255,.6)",fontSize:13}}>total program</span>
              </div>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:9,marginBottom:24}}>
                {["50-min comprehensive initial assessment","FDA-cleared QBTest + results review","3 medication trials with weekly check-ins","Optimization & maintenance planning","Secure messaging between visits"].map(it=>(
                  <li key={it} style={{display:"flex",alignItems:"flex-start",gap:9}}>
                    <span style={{color:TL,flexShrink:0,marginTop:2}}><Icon d={I.check} size={15}/></span>
                    <span style={{fontSize:13,color:"rgba(255,255,255,.9)"}}>{it}</span>
                  </li>
                ))}
              </ul>
              <button onClick={()=>scrollTo(bookRef)} style={{width:"100%",padding:"13px",background:"#fff",color:TD,fontWeight:700,borderRadius:999,border:"none",cursor:"pointer",fontFamily:F,fontSize:14}}>
                Get Started
              </button>
            </div>
          </div>

          {/* right col */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {[
              {title:"Maintenance Follow-Up",sub:"25-min check-in after stabilization",price:"$175",unit:"per visit",bullets:["Medication management & refills","Symptom monitoring & adjustments","Every 1-3 months as needed"]},
              {title:"Extended Follow-Up",sub:"40-min session for complex needs",price:"$225",unit:"per visit",bullets:["Complex medication adjustments","Co-occurring anxiety or depression","Detailed treatment plan updates"]},
            ].map(c=>(
              <div key={c.title} style={{background:"#fff",border:`2px solid ${S[100]}`,borderRadius:20,padding:24}}>
                <h3 style={{fontSize:16,fontWeight:700,color:S[900],marginBottom:3}}>{c.title}</h3>
                <p style={{fontSize:12,color:S[500],marginBottom:14}}>{c.sub}</p>
                <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:14}}>
                  <span style={{fontSize:32,fontWeight:800,color:S[900]}}>{c.price}</span>
                  <span style={{fontSize:12,color:S[400]}}>{c.unit}</span>
                </div>
                <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:7}}>
                  {c.bullets.map(b=>(
                    <li key={b} style={{display:"flex",alignItems:"flex-start",gap:7}}>
                      <span style={{color:T,flexShrink:0,marginTop:2}}><Icon d={I.check} size={13}/></span>
                      <span style={{fontSize:12,color:S[600]}}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{background:S[50],borderRadius:14,padding:16,display:"flex",alignItems:"center",gap:12}}>
              <span style={{color:T}}><Icon d={I.fileText} size={24}/></span>
              <div>
                <p style={{fontWeight:600,color:S[800],fontSize:13,margin:"0 0 3px"}}>Letters & Forms</p>
                <p style={{fontSize:12,color:S[500],margin:0}}>Accommodation letters, records — $35 each</p>
              </div>
            </div>
            <div style={{background:S[50],borderRadius:14,padding:16,display:"flex",alignItems:"center",gap:12}}>
              <span style={{color:T}}><Icon d={I.activity} size={24}/></span>
              <div>
                <p style={{fontWeight:600,color:S[800],fontSize:13,margin:"0 0 3px"}}>Add-On QBTest</p>
                <p style={{fontSize:12,color:S[500],margin:0}}>$68 per test — included in initial bundle</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{maxWidth:600,margin:"32px auto 0",display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"13px 18px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:14,fontSize:13,color:"#92400E"}}>
            <span style={{color:"#D97706",flexShrink:0,marginTop:1}}><Icon d={I.dollar} size={16}/></span>
            <p style={{margin:0}}><strong>Insurance reimbursement:</strong> We provide superbills you can submit to your insurance for potential out-of-network reimbursement.</p>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"13px 18px",background:TB,border:`1px solid ${TL}`,borderRadius:14,fontSize:13,color:TD}}>
            <span style={{color:T,flexShrink:0,marginTop:1}}><Icon d={I.creditCard} size={16}/></span>
            <p style={{margin:0}}><strong>Flexible payment options available.</strong> Split your $949 bundle into installments at no extra cost.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ──
function About({sRef}){
  return(
    <section ref={sRef} style={{padding:"80px 20px",background:S[50],fontFamily:F}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <Badge label="Your Provider"/>
        <h2 style={{fontSize:"clamp(22px,3vw,32px)",fontWeight:800,color:S[900],marginBottom:28,lineHeight:1.25}}>Specialized expertise in adult ADHD</h2>
        {/* provider card */}
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:24}}>
          <img src="data:image/png;base64,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" alt="Lucas Craft, PA-C" style={{width:88,height:88,borderRadius:18,objectFit:"cover",objectPosition:"center top",flexShrink:0}}/>
          <div>
            <h3 style={{fontSize:20,fontWeight:700,color:S[900],marginBottom:2}}>Lucas, PA-C</h3>
            <p style={{fontSize:14,color:T,fontWeight:500,marginBottom:8}}>Physician Assistant — Psychiatry</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {["Board-Certified PA","WA Licensed PA","DEA Registered","ADHD Specialized"].map(b=>(
                <span key={b} style={{padding:"4px 10px",background:"#fff",border:`1px solid ${S[200]}`,borderRadius:999,fontSize:11,fontWeight:500,color:S[600]}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
        <img src={IMGS.telehealth} alt="Telehealth appointment" style={{width:"100%",borderRadius:18,boxShadow:"0 12px 40px rgba(0,0,0,.1)",display:"block",marginBottom:24}}/>
        <p style={{color:S[600],lineHeight:1.8,marginBottom:14,fontSize:15}}>
          With extensive experience in psychiatric care focused specifically on adult ADHD, Lucas brings a thorough, evidence-based approach to every patient interaction. His background in a high-volume ADHD telehealth practice means he's seen the full spectrum of presentations and treatment responses.
        </p>
        <p style={{color:S[600],lineHeight:1.8,fontSize:15}}>
          Lucas founded Clarity ADHD because he believes every patient deserves a systematic, data-driven approach to finding the right treatment — not a 15-minute appointment and a prescription.
        </p>
      </div>
    </section>
  );
}

// ── WHY SOLO PA ──
function WhySoloPA(){
  const cards=[
    {them:"Provider Roulette",themD:"Platforms like Done, Klarity, and LifeStance have high provider turnover. You build a relationship, then your clinician leaves.",us:"Same Provider, Every Visit",usD:"You see the same PA every single appointment — guaranteed. Your history and progress are never lost."},
    {them:"Subscription Billing & Auto-Charges",themD:"Many platforms auto-charge monthly fees, bill for services you didn't receive, and are nearly impossible to reach.",us:"Flat-Fee Transparency",usD:"One clear price. No monthly subscriptions. No auto-charges. No surprise bills. Ever."},
    {them:'"No Stimulants" Policies',themD:'After DEA scrutiny, major platforms like Cerebral stopped prescribing stimulants. Patients are left without first-line treatment.',us:"Comprehensive Medication Management",usD:"We prescribe the full range of ADHD medications — including stimulants — under current DEA telehealth guidelines."},
    {them:"Fast but Low-Quality",themD:"15-minute appointments, rushed evaluations, and one-size-fits-all prescriptions are the norm at high-volume platforms.",us:"Speed With Depth",usD:"Seen within days, not weeks — but with a 50-minute initial evaluation and a 6-week systematic optimization process."},
  ];
  return(
    <section style={{padding:"80px 20px",background:"#fff",fontFamily:F}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",maxWidth:600,margin:"0 auto 48px"}}>
          <Badge label="Why Clarity ADHD"/>
          <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:S[900],marginBottom:14}}>The anti-corporate ADHD clinic.</h2>
          <p style={{fontSize:16,color:S[500],lineHeight:1.7}}>Large telehealth platforms have made ADHD care fast and cheap. They've also made it impersonal, inconsistent, and frustrating.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:16,maxWidth:860,margin:"0 auto"}}>
          {cards.map((c,i)=>(
            <div key={i} style={{borderRadius:14,border:`1px solid ${S[100]}`,overflow:"hidden"}}>
              <div style={{background:"rgba(254,242,242,.7)",padding:"16px 18px",borderBottom:`1px solid ${S[100]}`}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#EF4444",marginBottom:3}}>The Corporate Experience</div>
                <div style={{fontWeight:700,fontSize:13,color:S[800],marginBottom:4}}>{c.them}</div>
                <p style={{fontSize:12,color:S[500],lineHeight:1.6,margin:0}}>{c.themD}</p>
              </div>
              <div style={{background:"rgba(240,253,250,.6)",padding:"16px 18px"}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:T,marginBottom:3}}>Clarity ADHD</div>
                <div style={{fontWeight:700,fontSize:13,color:TD,marginBottom:4}}>{c.us}</div>
                <p style={{fontSize:12,color:S[600],lineHeight:1.6,margin:0}}>{c.usD}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BOOKING ──
function Booking({sRef}){
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:"",msg:""});
  const [sent,setSent]=useState(false);
  const set=(k)=>(e)=>setForm(f=>({...f,[k]:e.target.value}));
  const inp={width:"100%",padding:"11px 15px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",borderRadius:11,color:"#fff",fontSize:14,fontFamily:F,outline:"none",boxSizing:"border-box"};
  return(
    <section ref={sRef} style={{padding:"80px 20px",background:"#fff",fontFamily:F}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{position:"relative",background:`linear-gradient(135deg,${T},${TD})`,borderRadius:28,overflow:"hidden",boxShadow:`0 20px 72px rgba(15,118,110,.25)`}}>
          <div style={{position:"absolute",inset:0,opacity:.07}}>
            <img src={IMGS.pnw} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div style={{position:"relative",padding:"64px 32px"}}>
            <div style={{maxWidth:520,margin:"0 auto",textAlign:"center"}}>
              <h2 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:800,color:"#fff",marginBottom:14}}>Ready to find clarity?</h2>
              <p style={{fontSize:16,color:"rgba(255,255,255,.8)",lineHeight:1.7,marginBottom:36}}>Take the first step toward understanding your ADHD. Book your initial consultation today.</p>
              <div style={{background:"rgba(255,255,255,.12)",borderRadius:18,padding:28,border:"1px solid rgba(255,255,255,.2)",marginBottom:20,textAlign:"left"}}>
                <h3 style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:20,textAlign:"center"}}>Request an Appointment</h3>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    {[["First Name","firstName","text","Your first name"],["Last Name","lastName","text","Your last name"]].map(([lb,k,type,ph])=>(
                      <div key={k}>
                        <label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(255,255,255,.8)",marginBottom:5}}>{lb}</label>
                        <input type={type} value={form[k]} onChange={set(k)} placeholder={ph} style={inp}/>
                      </div>
                    ))}
                  </div>
                  {[["Email","email","email","your@email.com"],["Phone","phone","tel","(555) 123-4567"]].map(([lb,k,type,ph])=>(
                    <div key={k}>
                      <label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(255,255,255,.8)",marginBottom:5}}>{lb}</label>
                      <input type={type} value={form[k]} onChange={set(k)} placeholder={ph} style={inp}/>
                    </div>
                  ))}
                  <div>
                    <label style={{display:"block",fontSize:12,fontWeight:500,color:"rgba(255,255,255,.8)",marginBottom:5}}>What brings you to Clarity ADHD?</label>
                    <textarea rows={3} value={form.msg} onChange={set("msg")} placeholder="Tell us a bit about what you're experiencing..." style={{...inp,resize:"none"}}/>
                  </div>
                  <button onClick={()=>{setSent(true);setTimeout(()=>setSent(false),4000);}} style={{padding:"14px",background:`linear-gradient(135deg,${CR},${CRH})`,color:"#fff",fontWeight:700,fontSize:15,borderRadius:999,border:"none",cursor:"pointer",fontFamily:F}}>
                    {sent?"✓ Request Sent!":"Request Appointment"}
                  </button>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:28,color:"rgba(255,255,255,.7)",fontSize:13,flexWrap:"wrap"}}>
                <span style={{display:"flex",alignItems:"center",gap:6}}><Icon d={I.clock} size={14}/> Responds within 24 hours</span>
                <span style={{display:"flex",alignItems:"center",gap:6}}><Icon d={I.shield} size={14}/> HIPAA-secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ──
function FAQ({sRef}){
  const [open,setOpen]=useState(null);
  const faqs=[
    ["Do you accept insurance?","Clarity ADHD is a cash-pay practice. We provide detailed superbills (receipts with medical codes) that you can submit to your insurance for potential out-of-network reimbursement. Many patients recover 50-80% of their costs this way."],
    ["Can you prescribe stimulants (Adderall, Vyvanse, etc.) via telehealth?","Yes — and we want to be direct about this because many telehealth clinics have stopped prescribing stimulants entirely. Under the DEA and HHS telemedicine flexibilities extended through December 31, 2026, we can prescribe Schedule II stimulant medications via telehealth after a thorough video evaluation. We follow all federal and Washington State prescribing regulations, including mandatory PDMP checks."],
    ["What is the QBTest?","The QBTest is an FDA-cleared, computer-based test that objectively measures three core ADHD symptoms: attention, impulsivity, and motor activity. It takes about 20 minutes and provides data-driven results that complement our clinical assessment."],
    ["Why do you trial 3 different medications?","ADHD medication response is highly individual. By systematically trying 3 medications, we can compare your response to each and find the one that provides the best symptom control with the fewest side effects."],
    ["I think I have ADHD but I've never been diagnosed. Can you help?","Absolutely — that's exactly what our 6-week assessment program is designed for. We'll conduct a comprehensive evaluation including clinical interview, validated screening tools, and objective testing."],
    ["How long are appointments?","Your initial assessment is 50 minutes. Follow-up visits during the medication optimization phase are 25 minutes each. Maintenance visits are also 25 minutes, with 40-minute extended sessions available for complex needs."],
    ["Do I need to be in Washington State?","Yes, you must be physically located in Washington State during your appointments. We serve patients throughout the entire state — from Seattle to Spokane, Bellingham to Vancouver."],
    ["What if I've already been diagnosed with ADHD elsewhere?","If you have an existing ADHD diagnosis and are looking for ongoing medication management, we can discuss a streamlined path that may not require the full assessment program."],
    ["Why choose a solo PA practice over a large telehealth platform?","At Clarity ADHD, you see the same PA every single visit, guaranteed. Combined with transparent flat-fee pricing — no monthly subscriptions, no auto-charges — this is the opposite of the corporate telehealth experience."],
  ];
  return(
    <section ref={sRef} style={{padding:"80px 20px",background:S[50],fontFamily:F}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:44}}>
          <Badge label="FAQ"/>
          <h2 style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:800,color:S[900]}}>Common questions</h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {faqs.map(([q,a],i)=>(
            <div key={i} style={{background:"#fff",borderRadius:14,border:`1px solid ${S[100]}`,overflow:"hidden"}}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 22px",background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:F}}>
                <span style={{fontWeight:600,color:S[900],paddingRight:14,fontSize:14}}>{q}</span>
                <span style={{color:open===i?T:S[400],flexShrink:0}}><Icon d={open===i?I.chevUp:I.chevDown} size={17}/></span>
              </button>
              {open===i&&(
                <div style={{padding:"0 22px 18px",color:S[600],lineHeight:1.75,fontSize:14}}>{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ──
function Footer({setPage,sectionRefs,onFooterClick}){
  const nav=[
    {label:"How It Works",ref:"process"},
    {label:"Pricing",ref:"pricing"},
    {label:"About",ref:"about"},
    {label:"FAQ",ref:"faq"},
    {label:"Patient Guides",pg:"guides"},
    {label:"Book Consultation",ref:"book"},
  ];
  return(
    <footer style={{background:S[900],color:"#fff",padding:"56px 20px",fontFamily:F}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:36}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <div style={{width:30,height:30,borderRadius:9,background:`linear-gradient(135deg,${T},#0D9488)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                <Icon d={I.sparkles} size={15}/>
              </div>
              <span style={{fontSize:16,fontWeight:700}}>Clarity <span style={{color:"#2DD4BF"}}>ADHD</span></span>
            </div>
            <p style={{color:S[400],fontSize:13,lineHeight:1.7}}>Evidence-based adult ADHD assessment and medication management via telehealth across Washington State.</p>
          </div>
          <div>
            <h4 style={{fontWeight:600,marginBottom:14,fontSize:14}}>Quick Links</h4>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {nav.map(lk=>(
                <button key={lk.label} onClick={()=>{if(lk.pg)setPage(lk.pg);else if(lk.ref&&sectionRefs?.[lk.ref])scrollTo(sectionRefs[lk.ref]);}} style={{textAlign:"left",fontSize:13,color:S[400],background:"none",border:"none",cursor:"pointer",fontFamily:F,padding:0}}>{lk.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{fontWeight:600,marginBottom:14,fontSize:14}}>Contact</h4>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[[I.mapPin,"Serving all of Washington State"],[I.monitor,"100% Telehealth Practice"],[I.messageCircle,"lucas@clarityadhdwa.com"],[I.phone,"(360) 453-7663"],[I.arrowRight,"clarityadhdwa.com"]].map(([ic,txt])=>(
                <div key={txt} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:S[400]}}>
                  <span style={{color:"#2DD4BF"}}><Icon d={ic} size={14}/></span>{txt}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{marginTop:40,paddingTop:20,borderTop:`1px solid ${S[800]}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
            <p onClick={onFooterClick} style={{fontSize:12,color:S[500],cursor:"default",userSelect:"none"}}>© {new Date().getFullYear()} Clarity ADHD, PLLC. All rights reserved.</p>
            <div style={{display:"flex",gap:16}}>
              {["Privacy Policy","Terms of Service","Notice of Privacy Practices"].map(it=>(
                <span key={it} style={{fontSize:12,color:S[500],cursor:"pointer"}}>{it}</span>
              ))}
            </div>
          </div>
          <p style={{marginTop:14,fontSize:11,color:S[600],textAlign:"center",lineHeight:1.7,maxWidth:680,margin:"14px auto 0"}}>
            This website is for informational purposes only and does not constitute medical advice. No provider-patient relationship is established until a formal intake is completed. If you are experiencing a medical emergency, call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── PRACTICE PAGE ──
function PracticePage({setPage,onFooterClick}){
  const refs={
    process:useRef(),pricing:useRef(),about:useRef(),faq:useRef(),book:useRef()
  };
  const [showTop,setShowTop]=useState(false);
  useEffect(()=>{
    const h=()=>setShowTop(window.scrollY>500);
    window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);
  return(
    <div style={{fontFamily:F}}>
      <Navbar setPage={setPage} sectionRefs={refs}/>
      <Hero bookRef={refs.book}/>
      <TrustBar/>
      <Process sRef={refs.process}/>
      <WhyClarity/>
      <Pricing sRef={refs.pricing} bookRef={refs.book}/>
      <About sRef={refs.about}/>
      <WhySoloPA/>
      <Booking sRef={refs.book}/>
      <FAQ sRef={refs.faq}/>
      <Footer setPage={setPage} sectionRefs={refs} onFooterClick={onFooterClick}/>
      {showTop&&(
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:22,right:22,width:44,height:44,borderRadius:"50%",background:T,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(0,0,0,.2)",zIndex:50}}>
          <Icon d={I.arrowUp} size={18}/>
        </button>
      )}
    </div>
  );
}

// ── ARTICLES DATA ──
const ARTICLES=[
  {id:"adult-adhd-symptoms",title:"7 Adult ADHD Symptoms You Might Be Overlooking",subtitle:"ADHD in adults looks different than in children. Here's what to watch for — and why so many adults go undiagnosed.",category:"Understanding ADHD",readTime:"6 min read",color:T,
    takeaways:["ADHD in adults is often predominantly inattentive","Task initiation deficit is neurological, not laziness","Hyperfocus is a hallmark of ADHD, not a contradiction","Emotional dysregulation is common and often misdiagnosed","Time blindness affects real-time functioning","Working memory gaps cause daily impairment","Masking is exhausting and hides undiagnosed ADHD"],
    sections:[["ADHD Isn't Just About Hyperactivity","When most people think of ADHD, they picture a hyperactive child bouncing off the walls. But adult ADHD often looks completely different. Many adults — especially women — have the predominantly inattentive presentation. Research suggests approximately 4.4% of U.S. adults have ADHD, but the majority remain undiagnosed."],["1. Chronic Procrastination That Feels Physical","Everyone procrastinates sometimes. But ADHD procrastination is different — it's not laziness or poor discipline. It often feels like a physical inability to start a task, even when you desperately want to. This is called 'task initiation deficit.'"],["2. Hyperfocus on the Wrong Things","Paradoxically, people with ADHD can focus intensely — just not always on what they need to. The issue isn't inability to focus; it's inability to regulate what you focus on."],["3. Emotional Dysregulation","ADHD profoundly affects emotions. You might experience intense reactions to minor frustrations, rejection sensitivity, or rapid mood shifts. Many adults with ADHD are initially misdiagnosed with mood disorders."],["4. Time Blindness","People with ADHD often have a fundamentally different relationship with time — consistently underestimating how long tasks take, or struggling to feel the urgency of a deadline until it's right on top of you."],["5. Working Memory Gaps","Walking into a room and forgetting why you're there. Losing your train of thought mid-sentence. Reading an entire page and retaining nothing. These working memory lapses are core features of ADHD."],["6. Exhaustion from Masking","Many adults with ADHD have spent years developing coping strategies to appear neurotypical. This 'masking' is exhausting. Many patients describe starting medication as 'putting on glasses for the first time.'"]],
    cta:"Think you might have ADHD? Schedule a comprehensive evaluation with Clarity ADHD."},
  {id:"adhd-medications",title:"ADHD Medications Explained: Stimulants, Non-Stimulants, and What to Expect",subtitle:"A clear-headed guide to the medications used to treat adult ADHD — what they are, how they work, and what the research actually shows.",category:"Treatment",readTime:"8 min read",color:"#7C3AED",
    takeaways:["Stimulants are first-line treatment with ~70-80% efficacy","Amphetamines and methylphenidates work differently","Non-stimulants are options when stimulants aren't appropriate","Response is highly individual — systematic trialing matters","Most side effects are dose-dependent and manageable"],
    sections:[["The Basics: Why Medication Helps ADHD","ADHD involves differences in dopamine and norepinephrine systems. ADHD medications work by increasing the availability of these neurotransmitters in key brain regions. This isn't a 'chemical crutch' — it's like correcting vision with glasses."],["Stimulant Class 1: Amphetamines","Amphetamine-based medications (Adderall, Vyvanse, Dexedrine) increase dopamine and norepinephrine release while also blocking reuptake. Vyvanse is a prodrug — it converts to dextroamphetamine in the body, providing a smoother, longer onset."],["Stimulant Class 2: Methylphenidate","Methylphenidate-based medications (Ritalin, Concerta, Focalin) primarily block reuptake of dopamine and norepinephrine without triggering release. Extended-release formulations like Concerta last 8-12 hours with a gradual curve."],["Non-Stimulants: When They Make Sense","Non-stimulant options include atomoxetine (Strattera), viloxazine (Qelbree), guanfacine (Intuniv), and clonidine (Kapvay). These are not controlled substances and may be preferred when stimulants cause significant side effects."],["Why We Trial Three Medications","There's no blood test or brain scan that tells us which medication will work best for a given individual. Response is genuinely unpredictable — which is exactly why systematic trialing matters more than guessing."]],
    cta:"Ready to find what works for your brain? Start with a comprehensive evaluation at Clarity ADHD."},
  {id:"washington-adhd-telehealth",title:"Getting ADHD Treatment via Telehealth in Washington State",subtitle:"Current DEA regulations, what to look for in a provider, and why telehealth is often the best option for adult ADHD care in Washington.",category:"Washington State",readTime:"5 min read",color:"#0369A1",
    takeaways:["DEA flexibilities extend Schedule II prescribing through late 2026","You must be physically in WA during appointments","Telehealth is equally effective as in-person for ADHD management","Look for providers who actually spend time with you","Cash-pay telehealth avoids insurance headaches"],
    sections:[["The Current Regulatory Landscape","The DEA and HHS have extended telemedicine flexibilities that allow Schedule II controlled substance prescribing (including Adderall and Vyvanse) via video visit without an in-person evaluation first. These extensions currently run through December 31, 2026."],["What This Means for Washington Patients","If you live anywhere in Washington State, you can receive a comprehensive ADHD evaluation and, if appropriate, a stimulant medication prescription — all from home via video. You don't need to drive to a clinic."],["What to Look for in a Telehealth ADHD Provider","Be wary of platforms offering 15-minute evaluations. A thorough ADHD evaluation for an adult should take 45-60 minutes minimum. Look for validated assessment tools, objective testing options, and clear medication management policies."],["Why Cash-Pay Often Works Better","Insurance-based ADHD care often means prior authorizations, medication quantity limits, and step therapy requirements. Cash-pay practices can prescribe the most appropriate medication from day one without jumping through insurance hoops."]],
    cta:"Ready to get started with evidence-based ADHD care in Washington State? Contact Clarity ADHD today."},
];

// ── BLOG PAGE ──
function BlogPage({setPage}){
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("All");
  const cats=["All",...Array.from(new Set(ARTICLES.map(a=>a.category)))];
  useEffect(()=>{ window.scrollTo({top:0}); },[selected]);

  if(selected){
    const a=ARTICLES.find(x=>x.id===selected);
    return(
      <div style={{fontFamily:F,paddingTop:68}}>
        <div style={{background:`${a.color}10`,borderBottom:`1px solid ${S[100]}`,padding:"56px 20px 40px"}}>
          <div style={{maxWidth:760,margin:"0 auto"}}>
            <button onClick={()=>setSelected(null)} style={{display:"flex",alignItems:"center",gap:6,color:a.color,background:"none",border:"none",cursor:"pointer",fontFamily:F,fontSize:14,fontWeight:600,marginBottom:20}}>
              <Icon d={I.arrowLeft} size={15}/> Back to Resources
            </button>
            <span style={{display:"inline-block",padding:"4px 12px",background:`${a.color}20`,color:a.color,fontSize:12,fontWeight:600,borderRadius:999,marginBottom:14}}>{a.category}</span>
            <h1 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800,color:S[900],lineHeight:1.2,marginBottom:14}}>{a.title}</h1>
            <p style={{fontSize:16,color:S[500],lineHeight:1.7,marginBottom:16}}>{a.subtitle}</p>
            <div style={{display:"flex",gap:14,color:S[400],fontSize:13}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><Icon d={I.clock} size={13}/> {a.readTime}</span>
            </div>
          </div>
        </div>
        <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
          <div style={{background:TB,border:`1px solid ${TL}`,borderRadius:14,padding:24,marginBottom:40}}>
            <h3 style={{fontSize:15,fontWeight:700,color:TD,marginBottom:14}}>Key Takeaways</h3>
            <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:9}}>
              {a.takeaways.map((t,i)=>(
                <li key={i} style={{display:"flex",alignItems:"flex-start",gap:9}}>
                  <span style={{color:T,flexShrink:0,marginTop:2}}><Icon d={I.check} size={14}/></span>
                  <span style={{fontSize:13,color:TD}}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {a.sections.map(([heading,content],i)=>(
            <div key={i} style={{marginBottom:32}}>
              <h2 style={{fontSize:20,fontWeight:700,color:S[900],marginBottom:10}}>{heading}</h2>
              <p style={{color:S[600],lineHeight:1.8,fontSize:15}}>{content}</p>
            </div>
          ))}
          <div style={{background:`linear-gradient(135deg,${T},${TD})`,borderRadius:18,padding:28,marginTop:40,textAlign:"center"}}>
            <p style={{color:"rgba(255,255,255,.9)",fontSize:15,lineHeight:1.7,marginBottom:18}}>{a.cta}</p>
            <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 26px",background:"#fff",color:TD,fontWeight:700,borderRadius:999,border:"none",cursor:"pointer",fontFamily:F}}>
              Schedule Consultation <Icon d={I.arrowRight} size={15}/>
            </button>
          </div>
        </div>
        <Footer setPage={setPage}/>
      </div>
    );
  }

  const filtered=filter==="All"?ARTICLES:ARTICLES.filter(a=>a.category===filter);
  return(
    <div style={{fontFamily:F,paddingTop:68}}>
      <div style={{background:S[50],borderBottom:`1px solid ${S[100]}`,padding:"56px 20px 40px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,color:T,background:"none",border:"none",cursor:"pointer",fontFamily:F,fontSize:14,fontWeight:600,marginBottom:20}}>
            <Icon d={I.arrowLeft} size={15}/> Back to Home
          </button>
          <Badge label="Resources"/>
          <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:S[900],marginBottom:14}}>ADHD Resources & Guides</h1>
          <p style={{fontSize:16,color:S[500],lineHeight:1.7,maxWidth:560}}>Evidence-based articles on adult ADHD — symptoms, treatment, medication, and navigating care in Washington State.</p>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{display:"flex",gap:8,marginBottom:36,flexWrap:"wrap"}}>
          {cats.map(c=><FilterPill key={c} label={c} active={filter===c} onClick={()=>setFilter(c)}/>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {filtered.map(a=>(
            <div key={a.id} onClick={()=>setSelected(a.id)} style={{background:"#fff",borderRadius:18,border:`1px solid ${S[100]}`,overflow:"hidden",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
              <div style={{height:6,background:a.color}}/>
              <div style={{padding:22}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                  <span style={{display:"inline-block",padding:"4px 10px",background:`${a.color}18`,color:a.color,fontSize:11,fontWeight:600,borderRadius:999}}>{a.category}</span>
                  <span style={{fontSize:12,color:S[400]}}>{a.readTime}</span>
                </div>
                <h3 style={{fontSize:16,fontWeight:700,color:S[900],lineHeight:1.3,marginBottom:9}}>{a.title}</h3>
                <p style={{fontSize:13,color:S[500],lineHeight:1.6,marginBottom:18}}>{a.subtitle}</p>
                <div style={{display:"flex",alignItems:"center",gap:5,color:a.color,fontSize:13,fontWeight:600}}>
                  Read Article <Icon d={I.arrowRight} size={14}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ── GUIDES DATA ──
const GUIDES=[
  {id:"stimulant-basics",title:"Stimulant Medications: What to Expect",category:"Medication Education",color:"#7C3AED",
    note:"This guide provides general educational information only. Your specific medication, dosing instructions, and titration schedule will be discussed during your appointments.",
    sections:[["How Stimulants Work","Stimulant medications work by increasing the availability of dopamine and norepinephrine in the brain's prefrontal cortex — the area responsible for attention, impulse control, and working memory. They are not sedatives and do not 'calm you down' — instead, they help your brain regulate itself more effectively."],["Common Side Effects and How to Manage Them","The most common side effects are decreased appetite (especially in the afternoon), mild increases in heart rate and blood pressure, difficulty falling asleep if taken too late, dry mouth, and mild headaches initially. Most side effects are dose-dependent and improve with dose adjustment."],["When to Take Your Medication","Most stimulant medications should be taken in the morning with or without food. Extended-release formulations typically last 8-12 hours. Avoid taking medication after 2-3 PM if you're having trouble sleeping."],["What 'Working' Looks Like","Many patients expect to feel dramatically different when their medication is working. The reality is often more subtle — tasks feel less overwhelming, you can start things more easily, conversations feel more manageable. If you feel over-stimulated, jittery, or anxious, the dose may be too high."]]},
  {id:"non-stimulants",title:"Non-Stimulant ADHD Medications",category:"Medication Education",color:"#0369A1",
    note:"Non-stimulant medications require consistent daily use to be effective. Missing doses is less disruptive than with stimulants, but consistency matters for optimal results.",
    sections:[["When Non-Stimulants Are Used","Non-stimulant medications may be preferred when stimulants cause unacceptable side effects, when there is a history of substance misuse, when stimulants worsen anxiety or mood, or when cardiac conditions make stimulants contraindicated."],["Atomoxetine (Strattera)","Atomoxetine is a selective norepinephrine reuptake inhibitor (SNRI) approved specifically for ADHD. Unlike stimulants, it takes 4-6 weeks to reach full effect. It does not have abuse potential and is not a controlled substance."],["Alpha-2 Agonists: Guanfacine and Clonidine","Guanfacine (Intuniv) and clonidine (Kapvay) affect norepinephrine receptors in the prefrontal cortex and are often used as adjuncts to stimulants rather than standalone treatments."],["Setting Realistic Expectations","Non-stimulants generally provide more modest symptom improvement than stimulants for most adults. The advantage is tolerability and the absence of controlled substance regulations."]]},
  {id:"medication-tracking",title:"Tracking Your Medication Response",category:"Treatment Optimization",color:T,
    note:"There is no 'correct' way to respond to ADHD medication. Your experience — good and bad — is valuable clinical data that helps us find your optimal treatment.",
    sections:[["Why Tracking Matters","During your 6-week assessment program, we'll be comparing your response across multiple medications. Your observations are data — and the more specific you can be, the better we can optimize your treatment."],["What to Track","Symptom control (focus, task initiation, organization), side effects and when they occur, sleep quality and timing, appetite changes, mood and emotional regulation, and timing: when did the medication seem to wear off?"],["The On/Off Day Test","If you're unsure whether a medication is helping, try taking note of how you function on days you take it versus days you don't. The difference — or lack of it — tells us a lot."],["When to Contact Us Between Appointments","Contact us if you experience chest pain, significantly elevated heart rate, severe mood changes, or any side effect affecting your safety or daily functioning."]]},
];

// ── GUIDES PAGE ──
function GuidesPage({setPage}){
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("All");
  const cats=["All",...Array.from(new Set(GUIDES.map(g=>g.category)))];
  useEffect(()=>{ window.scrollTo({top:0}); },[selected]);

  if(selected){
    const g=GUIDES.find(x=>x.id===selected);
    return(
      <div style={{fontFamily:F,paddingTop:68}}>
        <div style={{background:`${g.color}08`,borderBottom:`1px solid ${S[100]}`,padding:"56px 20px 40px"}}>
          <div style={{maxWidth:760,margin:"0 auto"}}>
            <button onClick={()=>setSelected(null)} style={{display:"flex",alignItems:"center",gap:6,color:g.color,background:"none",border:"none",cursor:"pointer",fontFamily:F,fontSize:14,fontWeight:600,marginBottom:20}}>
              <Icon d={I.arrowLeft} size={15}/> Back to Patient Guides
            </button>
            <span style={{display:"inline-block",padding:"4px 12px",background:`${g.color}20`,color:g.color,fontSize:12,fontWeight:600,borderRadius:999,marginBottom:14}}>{g.category}</span>
            <h1 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800,color:S[900],lineHeight:1.2}}>{g.title}</h1>
          </div>
        </div>
        <div style={{maxWidth:760,margin:"0 auto",padding:"40px 20px"}}>
          {g.note&&(
            <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"14px 18px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:12,marginBottom:36}}>
              <span style={{color:"#D97706",flexShrink:0,marginTop:1}}><Icon d={I.info} size={16}/></span>
              <p style={{fontSize:13,color:"#92400E",lineHeight:1.7,margin:0}}><strong>Note:</strong> {g.note}</p>
            </div>
          )}
          {g.sections.map(([heading,content],i)=>(
            <div key={i} style={{marginBottom:32}}>
              <h2 style={{fontSize:20,fontWeight:700,color:S[900],marginBottom:10}}>{heading}</h2>
              <p style={{color:S[600],lineHeight:1.8,fontSize:15}}>{content}</p>
            </div>
          ))}
          <div style={{background:`linear-gradient(135deg,${T},${TD})`,borderRadius:18,padding:28,marginTop:40,textAlign:"center"}}>
            <p style={{color:"rgba(255,255,255,.9)",fontSize:15,lineHeight:1.7,marginBottom:18}}>Have questions about your treatment? Your provider is here to help.</p>
            <button onClick={()=>setPage("home")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 26px",background:"#fff",color:TD,fontWeight:700,borderRadius:999,border:"none",cursor:"pointer",fontFamily:F}}>
              Schedule Appointment <Icon d={I.arrowRight} size={15}/>
            </button>
          </div>
        </div>
        <Footer setPage={setPage}/>
      </div>
    );
  }

  const filtered=filter==="All"?GUIDES:GUIDES.filter(g=>g.category===filter);
  return(
    <div style={{fontFamily:F,paddingTop:68}}>
      <div style={{background:S[50],borderBottom:`1px solid ${S[100]}`,padding:"56px 20px 40px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:6,color:T,background:"none",border:"none",cursor:"pointer",fontFamily:F,fontSize:14,fontWeight:600,marginBottom:20}}>
            <Icon d={I.arrowLeft} size={15}/> Back to Home
          </button>
          <Badge label="Patient Guides"/>
          <h1 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:800,color:S[900],marginBottom:14}}>Patient Education Guides</h1>
          <p style={{fontSize:16,color:S[500],lineHeight:1.7,maxWidth:560}}>General educational resources about ADHD medications, treatment, and what to expect during your care at Clarity ADHD.</p>
          <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 16px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:12,marginTop:18,maxWidth:580}}>
            <span style={{color:"#D97706",flexShrink:0,marginTop:1}}><Icon d={I.alert} size={16}/></span>
            <p style={{fontSize:13,color:"#92400E",lineHeight:1.7,margin:0}}>These guides provide general educational information only. Your personalized instructions will be provided through your SimplePractice patient portal.</p>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 20px"}}>
        <div style={{display:"flex",gap:8,marginBottom:36,flexWrap:"wrap"}}>
          {cats.map(c=><FilterPill key={c} label={c} active={filter===c} onClick={()=>setFilter(c)}/>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
          {filtered.map(g=>(
            <div key={g.id} onClick={()=>setSelected(g.id)} style={{background:"#fff",borderRadius:18,border:`1px solid ${S[100]}`,overflow:"hidden",cursor:"pointer",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
              <div style={{height:6,background:g.color}}/>
              <div style={{padding:22}}>
                <span style={{display:"inline-block",padding:"4px 10px",background:`${g.color}18`,color:g.color,fontSize:11,fontWeight:600,borderRadius:999,marginBottom:14}}>{g.category}</span>
                <h3 style={{fontSize:16,fontWeight:700,color:S[900],lineHeight:1.3,marginBottom:9}}>{g.title}</h3>
                <p style={{fontSize:13,color:S[500],lineHeight:1.6,marginBottom:18}}>{g.sections[0][1].slice(0,100)}...</p>
                <div style={{display:"flex",alignItems:"center",gap:5,color:g.color,fontSize:13,fontWeight:600}}>
                  Read Guide <Icon d={I.arrowRight} size={14}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

// ── REFERRAL DIRECTORY (PRIVATE — NOT LINKED FROM PATIENT SITE) ──
// Access by clicking the footer copyright text 5 times

const REFERRALS = [
  {
    id: 1,
    name: "Amy Voros",
    type: "ADHD Coach",
    focus: "Adults",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Interesting, a little scattered in conversation. Works with adult ADHD.",
    status: "active",
    tags: ["ADHD Coach","Adults"],
  },
  {
    id: 2,
    name: "Tracy Foels",
    type: "Therapist",
    credentials: "LMHC",
    focus: "Adult ADHD, Anxiety",
    modality: "In-person & Telehealth",
    location: "Tumwater & Lacey, WA",
    website: "tracyfoels.com",
    notes: "Very nice. Works with adult ADHD and anxiety. Both in-person and telehealth.",
    status: "active",
    tags: ["LMHC","ADHD","Anxiety","In-Person","Telehealth"],
  },
  {
    id: 3,
    name: "Hannah Asher",
    type: "ADHD Coach + Yoga",
    focus: "ADHD",
    modality: "Online",
    location: "Online",
    website: null,
    notes: "Very nice. Combines ADHD coaching with yoga. Online only.",
    status: "active",
    tags: ["ADHD Coach","Yoga","Online"],
  },
  {
    id: 4,
    name: "Lorie Ritchie",
    type: "ADHD Coach",
    focus: "ADHD",
    modality: "Online",
    location: "Online",
    website: "makesenseofadhd.com",
    notes: "Runs a free online ADHD support group.",
    status: "active",
    tags: ["ADHD Coach","Support Group","Free","Online"],
  },
  {
    id: 5,
    name: "Danielle Dorn",
    type: "Physician",
    credentials: "DO",
    focus: "TBD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Currently on maternity leave. Plan to reach out December 2026.",
    status: "pending",
    tags: ["DO","Physician"],
  },
  {
    id: 6,
    name: "Beth Burgess",
    type: "ADHD Coach",
    focus: "ADHD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Haven't met yet. Website coming soon — follow up when available.",
    status: "pending",
    tags: ["ADHD Coach"],
  },
  {
    id: 7,
    name: "Amudha Irudayam",
    type: "Therapist",
    credentials: "LMHC",
    focus: "TBD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Follow up when launched.",
    status: "pending",
    tags: ["LMHC","Therapist"],
  },
  {
    id: 8,
    name: "Celeste Carolin",
    type: "Therapist",
    credentials: "LMHC",
    focus: "TBD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Follow up.",
    status: "pending",
    tags: ["LMHC","Therapist"],
  },
  {
    id: 9,
    name: "Shannon Schoonover",
    type: "Therapist",
    credentials: "DBT Specialist",
    focus: "DBT",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "DBT specialist. Follow up.",
    status: "pending",
    tags: ["DBT","Therapist"],
  },
  {
    id: 10,
    name: "Lauren Ashbaugh",
    type: "Psychologist",
    credentials: "Clinical Psychologist",
    focus: "TBD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "",
    status: "active",
    tags: ["Psychologist","Clinical Psychology"],
  },
  {
    id: 11,
    name: "Kristina Krick",
    type: "PMHNP",
    credentials: "PMHNP",
    focus: "TBD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Reached out — replied with interest in the practice. Have not spoken yet.",
    status: "pending",
    tags: ["PMHNP","Psychiatric NP"],
  },
  {
    id: 12,
    name: "Jane Hayward",
    type: "Psychologist",
    credentials: "Clinical Psychologist",
    focus: "TBD",
    modality: "TBD",
    location: "TBD",
    website: null,
    notes: "Reached out — replied with interest in the practice. Have not spoken yet.",
    status: "pending",
    tags: ["Psychologist","Clinical Psychology"],
  },
];

const TYPE_COLORS = {
  "ADHD Coach": { bg: "#F0FDFA", border: "#99F6E4", text: "#0F766E" },
  "Therapist": { bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
  "LMHC": { bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
  "Physician": { bg: "#FDF4FF", border: "#E9D5FF", text: "#7C3AED" },
  "Psychologist": { bg: "#FFF7ED", border: "#FED7AA", text: "#C2410C" },
  "PMHNP": { bg: "#F0F9FF", border: "#BAE6FD", text: "#0369A1" },
  "ADHD Coach + Yoga": { bg: "#F0FDFA", border: "#99F6E4", text: "#0F766E" },
  default: { bg: "#F8FAFC", border: "#E2E8F0", text: "#475569" },
};

function ReferralPage({ setPage }) {
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [refs, setRefs] = useState(REFERRALS);
  const [editForm, setEditForm] = useState({});

  const types = ["All", ...Array.from(new Set(refs.map(r => r.type)))];
  const filtered = filter === "All" ? refs : refs.filter(r => r.type === filter);

  const startEdit = (r) => { setEditId(r.id); setEditForm({ ...r }); };
  const saveEdit = () => { setRefs(rs => rs.map(r => r.id === editId ? { ...editForm, id: editId } : r)); setEditId(null); };
  const set = (k) => (e) => setEditForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "8px 12px", border: `1px solid ${S[200]}`,
    borderRadius: 8, fontSize: 13, fontFamily: F, color: S[800],
    background: "#fff", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: F, background: S[50], minHeight: "100vh", paddingTop: 0 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${T}, ${TD})`, padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ padding: "4px 10px", background: "rgba(255,255,255,0.15)", borderRadius: 999, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  🔒 Private — Not Patient-Facing
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                Referral Directory
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                Clarity ADHD, PLLC  ·  Lucas Craft, PA-C  ·  For internal use only
              </p>
            </div>
            <button
              onClick={() => setPage("home")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}
            >
              <Icon d={I.arrowLeft} size={14} /> Back to Site
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            ["Total Referrals", refs.length, T],
            ["Active", refs.filter(r => r.status === "active").length, "#059669"],
            ["Follow Up Needed", refs.filter(r => r.status === "pending").length, "#D97706"],
          ].map(([label, val, color]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", border: `1px solid ${S[100]}`, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color, marginBottom: 4 }}>{val}</div>
              <div style={{ fontSize: 13, color: S[500] }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: "6px 16px", borderRadius: 999, border: `1px solid ${filter === t ? T : S[200]}`, background: filter === t ? TB : "#fff", color: filter === t ? T : S[600], fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F }}>
              {t}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(r => {
            const typeColor = TYPE_COLORS[r.type] || TYPE_COLORS.default;
            const isEditing = editId === r.id;

            return (
              <div key={r.id} style={{ background: "#fff", borderRadius: 16, border: `1px solid ${S[100]}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${S[50]}`, flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: typeColor.bg, border: `1px solid ${typeColor.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                      {r.type.includes("Coach") ? "🧠" : r.type === "Therapist" ? "💬" : r.type === "Physician" ? "🩺" : "⭐"}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: S[900] }}>{r.name}</span>
                        {r.credentials && <span style={{ fontSize: 12, color: S[500] }}>{r.credentials}</span>}
                        <span style={{ padding: "2px 8px", background: r.status === "active" ? "#D1FAE5" : "#FEF3C7", color: r.status === "active" ? "#065F46" : "#92400E", fontSize: 11, fontWeight: 700, borderRadius: 999 }}>
                          {r.status === "active" ? "✓ Active" : "⏳ Follow Up"}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{ padding: "2px 8px", background: typeColor.bg, color: typeColor.text, fontSize: 11, fontWeight: 600, borderRadius: 999, border: `1px solid ${typeColor.border}` }}>{r.type}</span>
                        {r.focus && r.focus !== "TBD" && <span style={{ fontSize: 12, color: S[500] }}>{r.focus}</span>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => isEditing ? saveEdit() : startEdit(r)}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: isEditing ? T : S[50], border: `1px solid ${isEditing ? T : S[200]}`, borderRadius: 999, color: isEditing ? "#fff" : S[600], fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F }}
                  >
                    {isEditing ? "✓ Save" : "✏️ Edit"}
                  </button>
                </div>

                {/* Card body */}
                <div style={{ padding: "16px 20px" }}>
                  {isEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[["Name", "name"], ["Type", "type"], ["Credentials", "credentials"], ["Focus", "focus"]].map(([lb, k]) => (
                          <div key={k}>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: S[500], marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lb}</label>
                            <input value={editForm[k] || ""} onChange={set(k)} style={inputStyle} />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {[["Location", "location"], ["Modality", "modality"], ["Website", "website"]].map(([lb, k]) => (
                          <div key={k}>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: S[500], marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lb}</label>
                            <input value={editForm[k] || ""} onChange={set(k)} style={inputStyle} placeholder={lb} />
                          </div>
                        ))}
                        <div>
                          <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: S[500], marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</label>
                          <select value={editForm.status || "active"} onChange={set("status")} style={inputStyle}>
                            <option value="active">Active</option>
                            <option value="pending">Follow Up</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: S[500], marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Notes</label>
                        <textarea value={editForm.notes || ""} onChange={set("notes")} rows={3} style={{ ...inputStyle, resize: "none" }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {[
                        ["Modality", r.modality],
                        ["Location", r.location],
                        ["Website", r.website],
                      ].filter(([, v]) => v && v !== "TBD").map(([label, value]) => (
                        <div key={label}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: S[400], textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{label}</div>
                          {label === "Website"
                            ? <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: T, fontWeight: 500 }}>{value}</a>
                            : <div style={{ fontSize: 13, color: S[700] }}>{value}</div>
                          }
                        </div>
                      ))}
                      {r.notes && (
                        <div style={{ gridColumn: "1 / -1" }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: S[400], textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Notes</div>
                          <div style={{ fontSize: 13, color: S[600], lineHeight: 1.65, background: S[50], borderRadius: 8, padding: "10px 12px", borderLeft: `3px solid ${T}` }}>{r.notes}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add new referral button */}
        <button
          onClick={() => {
            const newRef = { id: Date.now(), name: "New Referral", type: "ADHD Coach", focus: "", modality: "", location: "", website: null, notes: "", status: "pending", tags: [] };
            setRefs(rs => [...rs, newRef]);
            setEditId(newRef.id);
            setEditForm(newRef);
          }}
          style={{ display: "flex", alignItems: "center", gap: 8, margin: "24px auto 0", padding: "12px 24px", background: T, color: "#fff", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: F, fontSize: 14, fontWeight: 600 }}
        >
          + Add Referral
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: S[400], marginTop: 24 }}>
          Clarity ADHD, PLLC  ·  Internal referral directory  ·  Not patient-facing
        </p>
      </div>
    </div>
  );
}

// ── ROOT ──
export default function App(){
  const [page,setPage]=useState("home");
  const [footerClicks,setFooterClicks]=useState(0);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);

  // Secret access: click copyright text 5 times
  const handleFooterClick = () => {
    const next = footerClicks + 1;
    setFooterClicks(next);
    if(next >= 5){ setPage("referrals"); setFooterClicks(0); }
  };

  return(
    <div style={{fontFamily:F,background:"#fff",minHeight:"100vh"}}>
      {page==="home"&&<PracticePage setPage={setPage} onFooterClick={handleFooterClick}/>}
      {page==="blog"&&<BlogPage setPage={setPage}/>}
      {page==="guides"&&<GuidesPage setPage={setPage}/>}
      {page==="referrals"&&<ReferralPage setPage={setPage}/>}
    </div>
  );
}
