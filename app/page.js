'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast, Toaster } from 'sonner'
import {
  Camera, Video, Film, Layers, Sparkles, Zap, Target, Clock, Award, CheckCircle2,
  Users, Cpu, Menu, X, ArrowRight, ArrowDown, Mail, Phone, MapPin, Linkedin,
  Instagram, Youtube, ExternalLink, Play, ChevronRight, Briefcase, Star,
  Rocket, Eye, Move3d, Aperture,
} from 'lucide-react'

const PORTFOLIO_IMAGES = [
  'https://images.pexels.com/photos/7672879/pexels-photo-7672879.jpeg',
  'https://images.pexels.com/photos/7671959/pexels-photo-7671959.jpeg',
  'https://images.pexels.com/photos/7660823/pexels-photo-7660823.jpeg',
  'https://images.pexels.com/photos/7662480/pexels-photo-7662480.jpeg',
  'https://images.pexels.com/photos/7662607/pexels-photo-7662607.jpeg',
  'https://images.pexels.com/photos/7662469/pexels-photo-7662469.jpeg',
  'https://images.pexels.com/photos/7661458/pexels-photo-7661458.jpeg',
  'https://images.pexels.com/photos/7672020/pexels-photo-7672020.jpeg',
]

const PROJECTS = [
  { id: 1, title: 'Nebula Rising', category: 'Movies', dept: 'Matchmove / Layout', year: '2025', client: 'Aurora Pictures', software: 'PFTrack, Maya, Nuke', desc: 'A sweeping space opera requiring 240+ shots of complex camera solves through nebulae and asteroid fields. Our team delivered pixel-perfect matchmoves for a fleet of digital spacecraft interacting with practical set photography.', img: PORTFOLIO_IMAGES[0] },
  { id: 2, title: 'Void Protocol', category: 'OTT', dept: 'Camera Track', year: '2025', client: 'Streamverse Originals', software: '3DEqualizer, Maya', desc: 'Handheld and drone camera tracking for an 8-episode sci-fi thriller. Production-ready camera solves under tight deadlines across seven episodes.', img: PORTFOLIO_IMAGES[1] },
  { id: 3, title: 'Chronos Watch', category: 'Commercials', dept: 'Roto Animation', year: '2024', client: 'Chronos Luxury', software: 'Silhouette, Maya, Nuke', desc: 'A 60-second luxury watch commercial demanding creature-tracking of an animated cosmic entity emerging from watch mechanics. Every gear, every reflection tracked to sub-pixel precision.', img: PORTFOLIO_IMAGES[2] },
  // { id: 4, title: 'Wavelengths', category: 'Music Videos', dept: 'Layout / Matchmove', year: '2024', client: 'Polaris Records', software: 'Maya, Nuke, Blender', desc: 'A performance-driven music video with morphing environments and heavy CG replacement. Layout ensured every asset landed in a physically believable space.', img: PORTFOLIO_IMAGES[3] },
  // { id: 5, title: 'Titan Ascending', category: 'CG Projects', dept: 'Full CG Layout', year: '2025', client: 'DarkFrame Studios', software: 'Houdini, Maya, Nuke', desc: 'Fully CG short film exploring a lone astronaut on Titan. Camera layout, scene assembly and previs handled entirely by The Dark Matter team.', img: PORTFOLIO_IMAGES[4] },
  // { id: 6, title: 'Kinetic Bloom', category: 'Animation', dept: 'Character Match Animation', year: '2024', client: 'Kinetic Studios', software: 'Maya, Silhouette', desc: 'A hand-animated character interacting with live plates. Frame-by-frame body tracking and prop animation across 320 shots.', img: PORTFOLIO_IMAGES[5] },
  { id: 7, title: 'Signal Lost', category: 'Movies', dept: 'Scene Reconstruction', year: '2024', client: 'Redline Films', software: '3DEqualizer, Maya, RealityCapture', desc: 'Feature-film scene reconstruction combining LIDAR survey data with matchmove for a post-apocalyptic cityscape. Complete set extension pipeline.', img: PORTFOLIO_IMAGES[6] },
  { id: 8, title: 'Aether Drive', category: 'Commercials', dept: 'Vehicle Tracking', year: '2025', client: 'Aether Automotive', software: 'PFTrack, Maya', desc: 'High-speed vehicle tracking and camera solves for a luxury EV launch spot. Multi-camera solves synced with CG environment builds.', img: PORTFOLIO_IMAGES[7] },
]

const SERVICES = [
  { icon: Camera, title: 'Matchmove', items: ['Camera Tracking', 'Object Tracking', 'Body Tracking', 'Scene Reconstruction', 'Lens Distortion', 'Survey Integration'] },
  { icon: Video, title: 'VFX Roto', items: ['Character Rotoscopy', 'Hair & Fine Detail Roto', 'Motion-Based Rotoscopy', 'Matte Extraction', 'Holdout & Garbage Mattes', 'Edge Refinement', 'Complex Occlusion Handling', 'Screen & Object Isolation', 'VFX Integration Roto'] },
  { icon: Move3d, title: 'VFX Paint', items: ['Wire & Rig Removal', 'Clean Plate Creation', 'Background Reconstruction', 'Reflection & Shadow Cleanup', 'Set Extension Cleanup', 'Digital Restoration', 'Flicker & Frame Repair', 'Prep for Compositing'] },
  { icon: Layers, title: 'Layout', items: ['Camera Layout', 'Environment Placement', 'Asset Blocking', 'Scene Assembly', 'Previs Support'] },
]

const WHY_US = [
  { icon: Target, title: 'Pixel Perfect Accuracy' },
  { icon: Zap, title: 'Fast Turnaround' },
  { icon: Award, title: 'Experienced Artists' },
  { icon: CheckCircle2, title: 'Production Ready Deliverables' },
  { icon: Cpu, title: 'Flexible Pipeline' },
  { icon: Star, title: 'Hollywood Standard Workflow' },
  { icon: Eye, title: 'Quality Assurance' },
]

const TEAM = [
  { name: 'Rohini Sutar', role: 'Founder & Director', exp: '12+ Years', bio: 'Former ILM matchmove lead who has supervised camera solves across 40+ theatrical features.', img: 'https://images.unsplash.com/photo-1589002770592-dbb6fa433434' },
  { name: 'Kavya Kankanala', role: 'Co-Founder', exp: '11+ Years', bio: 'Operations leader driving global partnerships and studio pipeline excellence.', img: 'https://images.unsplash.com/photo-1606143412458-acc5f86de897' },
  { name: 'Anup N.', role: 'Co-Founder', exp: '7+ years', bio: 'Operations leader driving global partnerships and studio pipeline excellence.', img: 'https://images.unsplash.com/photo-1589002770592-dbb6fa433434' },
  { name: 'Vedant M.', role: 'Co-Founder', exp: '6+ years', bio: 'Operations leader driving global partnerships and studio pipeline excellence.', img: 'https://images.unsplash.com/photo-1589002770592-dbb6fa433434' },
  // { name: '', role: 'Senior Matchmove Artist', exp: '10+ years', bio: 'Specialist in complex camera solves, drone photography and lens distortion pipelines.', img: 'https://images.pexels.com/photos/29433729/pexels-photo-29433729.png' },
  // { name: '', role: 'Lead Camera Tracking Artist', exp: '8+ years', bio: 'Expert in survey integration and multi-camera setups for episodic television.', img: 'https://images.unsplash.com/photo-1607503873903-c5e95f80d7b9' },
  // { name: '', role: 'Lead Roto Animation Artist', exp: '9+ years', bio: 'Character match animation and creature tracking specialist for streaming originals.', img: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7' },
  // { name: '', role: 'Layout Supervisor', exp: '11+ years', bio: 'Previs and layout supervision across features, commercials and full-CG projects.', img: 'https://images.unsplash.com/photo-1601506521793-dc748fc80b67' },
]

const STATS = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 20, suffix: '+', label: 'Clients' },
  { value: 10, suffix: '+', label: 'Artists' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: '+', label: 'Years Experience' },
]

const CAREERS = [
  { title: 'Matchmove Artist', exp: '2+ years', skills: '3DEqualizer, PFTrack, Syntheyes, Maya', location: 'On-Site (Hyderabad)', type: 'Full-time' },
  // { title: 'Camera Tracking Artist', exp: '3+ years', skills: 'PFTrack, Syntheyes, Nuke', location: 'Mumbai / Remote', type: 'Full-time' },
  { title: 'Rotomation Artist', exp: '2+ years', skills: 'Maya', location: 'On-Site (Hyderabad)', type: 'Full-time' },
  { title: 'Layout Artist', exp: '3+ years', skills: 'Maya, Blender, Unreal', location: 'On-Site (Hyderabad)', type: 'Full-time' },
  { title: 'VFX Paint Artist', exp: '1-3 years', skills: 'Silhouette, Mocha Pro, Adobe Photoshop, Fusion, Nuke', location: 'On-Site (Hyderabad)', type: 'Full-time' },
  { title: 'VFX Roto Artist', exp: '1-3 years', skills: 'Silhouette, Mocha Pro, Nuke', location: 'On-Site (Hyderabad)', type: 'Full-time' },
  { title: 'Internships', exp: '0-1 year', skills: 'Passion + Fundamentals', location: 'On-Site (Hyderabad)', type: 'Internship' },
]

const CATEGORIES = ['All', 'Movies', 'OTT', 'Commercials']
// const CATEGORIES = ['All', 'Movies', 'OTT', 'Commercials', 'Music Videos', 'CG Projects', 'Animation']

const currentYear = new Date().getFullYear();

function CustomCursor() {
  const cursor = useRef(null)
  const dot = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (cursor.current) { cursor.current.style.left = e.clientX + 'px'; cursor.current.style.top = e.clientY + 'px' }
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px' }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (<><div ref={cursor} className="custom-cursor" /><div ref={dot} className="custom-cursor-dot" /></>)
}

function Starfield() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w, y: Math.random() * h, z: Math.random() * 1.2 + 0.2,
      s: Math.random() * 1.4 + 0.2, tw: Math.random() * Math.PI * 2,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const st of stars) {
        st.tw += 0.02
        const alpha = 0.35 + Math.abs(Math.sin(st.tw)) * 0.65
        const g = ctx.createRadialGradient(st.x, st.y, 0, st.x, st.y, st.s * st.z * 3)
        g.addColorStop(0, `rgba(255,255,255,${alpha})`)
        g.addColorStop(0.5, `rgba(180,220,255,${alpha * 0.4})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.s * st.z * 2, 0, Math.PI * 2)
        ctx.fill()
        st.y += st.z * 0.08
        if (st.y > h) { st.y = 0; st.x = Math.random() * w }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none opacity-70" style={{ zIndex: 0 }} />
}

function BlackHole() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="absolute inset-0 nebula opacity-70" />
      <div className="relative w-[110vmin] h-[110vmin] flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full accretion-ring-2 animate-rotate-slower opacity-70" />
        <div className="absolute w-[85%] h-[85%] rounded-full accretion-ring animate-rotate-slow" />
        <div className="absolute w-[55%] h-[55%] rounded-full blackhole-core animate-pulse-glow" />
        <div className="absolute w-[35%] h-[35%] rounded-full bg-black" style={{ boxShadow: '0 0 40px 20px #000 inset, 0 0 80px 10px rgba(0,0,0,1)' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Portfolio', '#portfolio'], ['Team', '#team'], ['Careers', '#careers']]
  // const links = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Portfolio', '#portfolio'], ['Team', '#team'], ['Careers', '#careers'], ['Contact', '#contact']]
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 animate-pulse-glow" />
            <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">THE DARK <span className="gradient-text">MATTER</span></span>
        </a>
        <div className="hidden lg:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-white/70 hover:text-white transition-colors relative group">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#contact"><Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 hover:opacity-90 btn-magnetic">Get in Touch</Button></a>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden glass-strong overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="text-white/80 hover:text-cyan-400 py-2">{label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0"><BlackHole /></motion.div>
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white/80">Premium VFX Studio · Est. 2024</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, filter: 'blur(20px)', y: 40 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }} className="font-display font-bold text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-tight">
          THE DARK<br /><span className="gradient-text">MATTER</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-6 text-lg md:text-2xl font-light italic text-white/70">
          &ldquo;Precision Beyond Reality.&rdquo;
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-6 max-w-2xl mx-auto text-white/60 leading-relaxed">
          We transform impossible shots into seamless cinematic reality through world-class Matchmove, Camera Tracking, Roto Animation, and Layout solutions.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#portfolio"><Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white border-0 px-8 py-6 text-base btn-magnetic glow-cyan"><Play className="mr-2 h-4 w-4" /> View Portfolio</Button></a>
          <a href="#contact"><Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-base backdrop-blur-md">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Button></a>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-widest z-10">
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><ArrowDown size={16} /></motion.div>
      </motion.div>
    </section>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6 text-xs uppercase tracking-widest text-cyan-300">
      <span className="w-1 h-1 rounded-full bg-cyan-400" />{children}
    </div>
  )
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  )
}

function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-20" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <Reveal>
          <SectionLabel>About Us</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl leading-tight mb-6">
            Every great <span className="gradient-text">visual effect</span><br />begins with perfect tracking.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-4">
            The Dark Matter is a premium Visual Effects company specialising in high-end Matchmove and Layout services for films, OTT platforms, advertisements, television, and digital productions.
          </p>
          <p className="text-white/60 leading-relaxed mb-6">
            Our team combines technical precision with artistic excellence to deliver production-ready camera solves and animation. From complex drone shots to intricate character match animation, we bring impossible visions into believable reality.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[['Precision', Target], ['Speed', Zap], ['Craft', Sparkles]].map(([label, Icon]) => (
              <div key={label} className="glass rounded-xl p-4 text-center">
                <Icon className="mx-auto mb-2 text-cyan-400" size={22} />
                <div className="text-xs uppercase tracking-widest text-white/70">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-3xl overflow-hidden glass">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 nebula opacity-50" />
              <div className="absolute inset-8 rounded-full border border-cyan-400/30 animate-rotate-slow" />
              <div className="absolute inset-16 rounded-full border border-purple-400/30 animate-rotate-slower" />
              <div className="absolute inset-24 rounded-full border border-white/10 animate-rotate-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Aperture className="mx-auto mb-4 text-cyan-400 animate-pulse-glow" size={64} />
                  <div className="font-display text-4xl font-bold gradient-text">3D</div>
                  <div className="text-xs uppercase tracking-widest text-white/60 mt-2">Point Cloud · Camera Solve · Wireframe</div>
                </div>
              </div>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-cyan-400/80 animate-twinkle"
                  style={{ top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%`, animationDelay: `${(i % 4) * 0.7}s` }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl leading-tight">Services engineered for <span className="gradient-text">the impossible.</span></h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">Four disciplines. Zero compromise. Every shot delivered production-ready.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative group card-hover glass rounded-2xl p-8 h-full overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <s.icon className="text-cyan-400" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-3xl mb-4">{s.title}</h3>
                  <ul className="space-y-2">
                    {s.items.map(it => (<li key={it} className="flex items-center gap-2 text-white/70 text-sm"><ChevronRight size={14} className="text-cyan-400" /> {it}</li>))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 nebula opacity-40" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl">Built for <span className="gradient-text">Hollywood-grade</span> pipelines.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="glass rounded-xl p-6 group card-hover h-full">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition">
                  <w.icon className="text-cyan-400" size={20} />
                </div>
                <div className="text-white/90 font-medium">{w.title}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)
  return (
    <section id="portfolio" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-10">
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl">The <span className="gradient-text">portfolio.</span></h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">Shots that pushed the limits of camera tracking, matchmove, roto and layout.</p>
        </Reveal>
        <Reveal className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${filter === cat ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'glass text-white/70 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }} onClick={() => setActive(p)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer glass ${i % 5 === 0 ? 'md:row-span-2' : ''} ${i % 7 === 3 ? 'md:col-span-2' : ''}`}>
                <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="text-xs uppercase tracking-widest text-cyan-300/90 mb-2">{p.dept} · {p.year}</div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl mb-2 group-hover:text-glow-cyan transition-all">{p.title}</h3>
                  <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-flex items-center gap-1 text-sm text-cyan-300">View Project <ArrowRight size={14} /></span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 glass px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest">{p.category}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl bg-black/95 border-white/10 text-white backdrop-blur-2xl max-h-[92vh] overflow-y-auto">
          {active && (
            <>
              <div className="relative rounded-lg overflow-hidden aspect-video mb-4">
                <img src={active.img} className="w-full h-full object-cover" alt={active.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs uppercase tracking-widest text-cyan-300 mb-1">{active.category}</div>
                  <h3 className="font-display font-bold text-3xl">{active.title}</h3>
                </div>
              </div>
              <DialogHeader>
                <DialogTitle className="sr-only">{active.title}</DialogTitle>
                <DialogDescription className="text-white/70 text-base leading-relaxed">{active.desc}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div><div className="text-white/40 text-xs uppercase tracking-widest">Department</div><div className="mt-1">{active.dept}</div></div>
                <div><div className="text-white/40 text-xs uppercase tracking-widest">Client</div><div className="mt-1">{active.client}</div></div>
                <div><div className="text-white/40 text-xs uppercase tracking-widest">Year</div><div className="mt-1">{active.year}</div></div>
                <div><div className="text-white/40 text-xs uppercase tracking-widest">Software</div><div className="mt-1">{active.software}</div></div>
              </div>
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0"><Play size={14} className="mr-2" /> Watch Breakdown</Button>
                <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">Behind the Scenes <ExternalLink size={14} className="ml-2" /></Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <SectionLabel>The Crew</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl">The <span className="gradient-text">team</span> behind the pixels.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="group relative rounded-2xl overflow-hidden glass card-hover">
                <div className="aspect-[3/2] relative overflow-hidden"> {/* aspect-[4/5] */}
                  {/* <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" /> */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" /> */}
                </div>
                <div className="absolute -bottom-2 left-0 right-0 p-6"> {/* bottom-0 */}
                  <div className="text-xs uppercase tracking-widest text-cyan-300 mb-1">{m.exp}</div>
                  <h3 className="font-display font-bold text-4xl mb-1">{m.name}</h3>
                  <div className="text-white/70 text-sm mb-3">{m.role}</div>
                  <p className="text-white/60 text-xs leading-relaxed mb-4 opacity-0 transition-opacity duration-500">{m.bio}</p>
                  {/* <p className="text-white/60 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{m.bio}</p> */}
                  <div className="flex gap-2">
                    <a href="#" className="glass w-8 h-8 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"><Linkedin size={14} /></a>
                    <a href="#" className="glass w-8 h-8 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"><Mail size={14} /></a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// function Founder() {
//   return (
//     <section className="relative py-32 px-6 overflow-hidden">
//       <div className="absolute inset-0 nebula opacity-60" />
//       <div className="max-w-6xl mx-auto grid md:grid-cols-[auto_1fr] gap-12 items-center relative z-10">
//         <Reveal>
//           <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
//             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 blur-2xl opacity-60 animate-pulse-glow" />
//             <div className="absolute inset-2 rounded-full border-2 border-cyan-400/50 animate-rotate-slow" />
//             <div className="absolute inset-4 rounded-full border border-purple-400/40 animate-rotate-slower" />
//             <div className="absolute inset-6 rounded-full overflow-hidden">
//               <img src={TEAM[0].img} alt="Founder" className="w-full h-full object-cover" />
//             </div>
//           </div>
//         </Reveal>
//         <Reveal delay={0.2}>
//           <SectionLabel>Founder</SectionLabel>
//           <h2 className="font-display font-bold text-4xl md:text-5xl mb-2">Ravi Menon</h2>
//           <div className="text-cyan-300 text-sm uppercase tracking-widest mb-6">Founder &amp; VFX Supervisor</div>
//           <p className="text-white/70 leading-relaxed mb-4">
//             A veteran VFX supervisor with 15+ years across Hollywood, London and Mumbai pipelines. Ravi began as a matchmove artist on visual-effects-heavy features, later leading tracking teams at ILM and Framestore before founding The Dark Matter to bring that same standard to Indian and global productions.
//           </p>
//           <p className="text-white/60 leading-relaxed mb-8">
//             His vision: build a boutique studio where technical precision meets an artist-first culture — where every solve is treated like a signature, not a delivery.
//           </p>
//           <blockquote className="border-l-2 border-cyan-400 pl-6 italic text-white/90 text-lg leading-relaxed">
//             &ldquo;Great visual effects begin long before compositing — they begin with perfect tracking.&rdquo;
//             <div className="mt-3 text-xs not-italic uppercase tracking-widest text-cyan-300">— Ravi Menon</div>
//           </blockquote>
//         </Reveal>
//       </div>
//     </section>
//   )
// }

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1600
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(to * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

function Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto glass-strong rounded-3xl p-10 md:p-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display font-bold text-4xl md:text-6xl gradient-text mb-2">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/60 text-xs md:text-sm uppercase tracking-widest">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Careers({ onApply }) {
  return (
    <section id="careers" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <SectionLabel>We&rsquo;re Hiring</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl">Join the <span className="gradient-text">crew.</span></h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">If you obsess over sub-pixel accuracy and can tell a good solve from a great one — talk to us.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREERS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
                    <Briefcase className="text-cyan-400" size={18} />
                  </div>
                  <div className="glass px-2 py-1 rounded text-[10px] uppercase tracking-widest">{c.type}</div>
                </div>
                <h3 className="font-display font-bold text-2xl mb-3">{c.title}</h3>
                <div className="space-y-2 text-sm text-white/60 mb-6 flex-1">
                  <div><span className="text-white/40">Experience:</span> {c.exp}</div>
                  <div><span className="text-white/40">Skills:</span> {c.skills}</div>
                  <div><span className="text-white/40">Location:</span> {c.location}</div>
                </div>
                <Button onClick={() => onApply(c.title)} className="bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 hover:border-transparent transition-all">
                  Apply Now <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const j = await r.json()
      if (r.ok) { toast.success(j.message || 'Inquiry sent!'); setForm({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', message: '' }) }
      else toast.error(j.error || 'Something went wrong.')
    } catch { toast.error('Network error. Please try again.') }
    setLoading(false)
  }
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e?.target ? e.target.value : e }))
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="font-display font-bold text-5xl md:text-6xl">Let&rsquo;s build the <span className="gradient-text">impossible.</span></h2>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <form onSubmit={submit} className="glass rounded-2xl p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input required placeholder="Your Name" value={form.name} onChange={upd('name')} className="bg-white/5 border-white/10 h-12" />
                <Input required type="email" placeholder="Email" value={form.email} onChange={upd('email')} className="bg-white/5 border-white/10 h-12" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Phone" value={form.phone} onChange={upd('phone')} className="bg-white/5 border-white/10 h-12" />
                <Input placeholder="Company / Studio" value={form.company} onChange={upd('company')} className="bg-white/5 border-white/10 h-12" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select value={form.projectType} onValueChange={upd('projectType')}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12"><SelectValue placeholder="Project Type" /></SelectTrigger>
                  <SelectContent className="bg-black border-white/10 text-white">
                    {['Feature Film', 'OTT / Series', 'Commercial', 'Music Video', 'CG Project', 'Animation', 'Other'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={form.budget} onValueChange={upd('budget')}>
                  <SelectTrigger className="bg-white/5 border-white/10 h-12"><SelectValue placeholder="Budget" /></SelectTrigger>
                  <SelectContent className="bg-black border-white/10 text-white">
                    {['< $10k', '$10k – $50k', '$50k – $200k', '$200k+', 'Discuss'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Textarea required placeholder="Tell us about your project..." rows={5} value={form.message} onChange={upd('message')} className="bg-white/5 border-white/10" />
              <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 h-12 btn-magnetic glow-cyan">
                {loading ? 'Sending...' : 'Send Inquiry'} {!loading && <ArrowRight size={16} className="ml-2" />}
              </Button>
            </form>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold text-2xl mb-6">The Dark Matter</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="text-cyan-400 mt-0.5" size={18} /><div><div className="text-white/50 text-xs uppercase tracking-widest">Address</div><div className="text-white/90 text-sm mt-1">Hyderabad, Telangana, India - 500040</div></div></div>
                  <div className="flex items-start gap-3"><Mail className="text-cyan-400 mt-0.5" size={18} /><div><div className="text-white/50 text-xs uppercase tracking-widest">Email</div><a href="mailto:info@thedarkmatter.com" className="text-white/90 text-sm mt-1 hover:text-cyan-300">thedarkmattervfxstudio@gmail.com</a></div></div>
                  <div className="flex items-start gap-3"><Phone className="text-cyan-400 mt-0.5" size={18} /><div><div className="text-white/50 text-xs uppercase tracking-widest">Phone</div><div className="text-white/90 text-sm mt-1">+91-74990-22883 / +91-70328-36898</div></div></div>
                  <div className="flex items-start gap-3"><Clock className="text-cyan-400 mt-0.5" size={18} /><div><div className="text-white/50 text-xs uppercase tracking-widest">Business Hours</div><div className="text-white/90 text-sm mt-1">Monday – Friday · 10:00 AM – 7:00 PM IST</div></div></div>
                </div>
              </div>
              <div className="glass rounded-2xl overflow-hidden aspect-[16/10] relative">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 nebula opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 text-cyan-400 animate-pulse-glow" size={32} />
                    <div className="text-white/70 text-sm">Hyderabad, India</div>
                    <div className="text-white/40 text-xs mt-1">17.4629° N · 78.5610° E</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">Studio Location</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ApplyModal({ open, position, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', portfolio: '', message: '' })
  const [loading, setLoading] = useState(false)
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const r = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, position }) })
      const j = await r.json()
      if (r.ok) { toast.success(j.message); setForm({ name: '', email: '', phone: '', experience: '', portfolio: '', message: '' }); onClose() }
      else toast.error(j.error || 'Something went wrong.')
    } catch { toast.error('Network error.') }
    setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg bg-black/95 border-white/10 text-white backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Apply for <span className="gradient-text">{position}</span></DialogTitle>
          <DialogDescription className="text-white/60">Tell us about yourself. We&rsquo;ll be in touch within 48 hours.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3 mt-2">
          <Input required placeholder="Full name" value={form.name} onChange={upd('name')} className="bg-white/5 border-white/10 h-11" />
          <Input required type="email" placeholder="Email" value={form.email} onChange={upd('email')} className="bg-white/5 border-white/10 h-11" />
          <Input placeholder="Phone" value={form.phone} onChange={upd('phone')} className="bg-white/5 border-white/10 h-11" />
          <Input placeholder="Years of experience" value={form.experience} onChange={upd('experience')} className="bg-white/5 border-white/10 h-11" />
          <Input placeholder="Portfolio / reel URL" value={form.portfolio} onChange={upd('portfolio')} className="bg-white/5 border-white/10 h-11" />
          <Textarea placeholder="A few words about you..." rows={4} value={form.message} onChange={upd('message')} className="bg-white/5 border-white/10" />
          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 h-11">
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600" />
            <span className="font-display font-bold">THE DARK <span className="gradient-text">MATTER</span></span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">Precision Beyond Reality. Premium VFX studio for films, OTT, commercials and CG productions.</p>
        </div>
        <div>
          <div className="font-display font-semibold mb-4 text-sm uppercase tracking-widest">Quick Links</div>
          <ul className="space-y-2 text-sm text-white/60">
            {['Home', 'About', 'Portfolio', 'Team', 'Contact'].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-cyan-300 transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-4 text-sm uppercase tracking-widest">Services</div>
          <ul className="space-y-2 text-sm text-white/60">
            {SERVICES.map(s => <li key={s.title}><a href="#services" className="hover:text-cyan-300 transition">{s.title}</a></li>)}
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-4 text-sm uppercase tracking-widest">Follow</div>
          <div className="flex gap-3 mb-4">
              <a href="#" className="glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"><Linkedin size={16} /></a>
            {/* {[Linkedin, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" className="glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"><I size={16} /></a>
            ))} */}
          </div>
          <div className="flex gap-2 text-xs">
            {/* <a href="#" className="glass px-3 py-1.5 rounded-full hover:text-cyan-300 transition">Behance</a>
            <a href="#" className="glass px-3 py-1.5 rounded-full hover:text-cyan-300 transition">ArtStation</a> */}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
        <div>&copy; {currentYear} The Dark Matter VFX Studio. All Rights Reserved.</div>
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> All systems tracking nominal</div>
      </div>
    </footer>
  )
}

function App() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyPos, setApplyPos] = useState('')
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <CustomCursor />
      <Starfield />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Portfolio />
        <Team />
        {/* <Founder /> */}
        <Stats />
        <Careers onApply={(p) => { setApplyPos(p); setApplyOpen(true) }} />
        <Contact />
        <Footer />
      </div>
      <ApplyModal open={applyOpen} position={applyPos} onClose={() => setApplyOpen(false)} />
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.1)', color: 'white' } }} />
    </div>
  )
}

export default App
