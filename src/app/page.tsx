import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Calendar, Sparkles, Users, Star } from 'lucide-react';

const services = [
    {
        title: 'Full Wedding Planning',
        desc: '12+ months of dedicated partnership — from venue scouting to the last dance.',
        icon: '✦',
    },
    {
        title: 'Partial Planning',
        desc: 'We step in 6 months out to refine your vision and manage every detail.',
        icon: '◈',
    },
    {
        title: 'Day-of Coordination',
        desc: 'Flawless execution on the day — you celebrate, we handle everything else.',
        icon: '◇',
    },
    {
        title: 'Design & Styling',
        desc: 'Mood boards, florals, décor — immersive aesthetic experiences crafted for you.',
        icon: '✿',
    },
];

const stats = [
    { value: '250+', label: 'Events Planned' },
    { value: '8', label: 'Years of Excellence' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '40+', label: 'Trusted Vendors' },
];

const process = [
    { step: '01', title: 'Consultation', desc: 'We begin with a deep discovery session to understand your vision, priorities, and dreams.' },
    { step: '02', title: 'Design', desc: 'Our designers craft a bespoke mood board, palette, and concept tailored to your love story.' },
    { step: '03', title: 'Planning', desc: 'We orchestrate every detail — vendors, timelines, logistics — with meticulous precision.' },
    { step: '04', title: 'Execution', desc: 'On the day, we bring your vision to life while you simply enjoy every magical moment.' },
];

const testimonials = [
    {
        name: 'Meron & Dawit',
        event: 'Wedding · Sheraton Addis, 2024',
        quote: 'elf Events didn\'t just plan our wedding — they created a world for us. Every detail was beyond what we imagined.',
        rating: 5,
    },
    {
        name: 'Hana Tesfaye',
        event: 'Corporate Gala · Kuriftu Resort, 2024',
        quote: 'The most seamless event I\'ve ever hosted. The team anticipated every need before I even expressed it.',
        rating: 5,
    },
    {
        name: 'Selam & Yonas',
        event: 'Destination Wedding · Lalibela, 2023',
        quote: 'Planning a wedding in Lalibela sounded impossible — elf Events made it extraordinary. Our guests still talk about it.',
        rating: 5,
    },
];

export default function HomePage() {
    return (
        <main className="overflow-hidden">
            <Navbar />

            {/* ─── HERO ──────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center justify-center bg-elf-charcoal overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1a1510] to-[#0F0F0F]" />

                {/* Decorative gold orb */}
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-elf-gold/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-elf-gold/5 blur-3xl pointer-events-none" />

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <span className="section-label text-center">Wedding & Event Planning</span>

                    <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.05] mb-8">
                        Every Love Story
                        <br />
                        <span className="text-elf-gold italic">Deserves</span> a
                        <br />
                        Perfect Chapter
                    </h1>

                    <p className="font-inter text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                        elf Events crafts unforgettable weddings and luxury experiences with a white-glove approach that makes every detail effortless.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="btn-gold">
                            Begin Your Journey <ArrowRight size={16} />
                        </Link>
                        <Link href="/portfolio" className="btn-outline border-white/30 text-white hover:bg-white hover:text-elf-charcoal">
                            View Our Work
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
                    <span className="font-inter text-[10px] tracking-[0.3em] uppercase">Discover</span>
                    <ChevronDown size={16} className="animate-bounce" />
                </div>
            </section>

            {/* ─── STATS ──────────────────────────────────────────── */}
            <section className="bg-elf-warm py-16 border-y border-elf-border">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="font-playfair text-4xl md:text-5xl font-medium text-elf-charcoal">{s.value}</div>
                                <div className="font-inter text-xs tracking-widest uppercase text-elf-muted mt-2">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SERVICES ──────────────────────────────────────── */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">What We Do</span>
                        <h2 className="heading-serif text-4xl md:text-5xl lg:text-6xl">
                            Tailored Services for
                            <br />
                            <span className="italic text-elf-gold">Every Milestone</span>
                        </h2>
                        <div className="gold-divider" />
                        <p className="font-inter text-elf-muted max-w-lg mx-auto text-base leading-relaxed">
                            From intimate gatherings to grand celebrations — we design, plan, and execute with passion and precision.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((s, i) => (
                            <div key={s.title}
                                className="group bg-white border border-elf-border p-8 card-hover cursor-pointer"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="text-3xl text-elf-gold mb-6 font-playfair">{s.icon}</div>
                                <h3 className="font-playfair text-xl font-medium text-elf-charcoal mb-4 group-hover:text-elf-gold transition-colors duration-300">
                                    {s.title}
                                </h3>
                                <p className="font-inter text-sm text-elf-muted leading-relaxed">{s.desc}</p>
                                <div className="mt-6 flex items-center gap-2 text-elf-gold text-xs font-inter tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Learn More <ArrowRight size={12} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/services" className="btn-outline">
                            Explore All Services <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── FEATURE SPLIT ─────────────────────────────────── */}
            <section className="py-28 bg-elf-charcoal overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div>
                        <span className="section-label">Our Promise</span>
                        <h2 className="font-playfair text-4xl md:text-5xl text-white font-medium leading-tight mb-8">
                            A White-Glove Experience
                            <br />
                            <span className="text-elf-gold italic">From First Call to Final Dance</span>
                        </h2>
                        <p className="font-inter text-white/50 text-base leading-relaxed mb-6">
                            We believe the planning journey should be as beautiful as the event itself. Our team becomes an extension of your vision — attentive, creative, and deeply committed.
                        </p>
                        <p className="font-inter text-white/50 text-base leading-relaxed mb-10">
                            Every client receives a dedicated planner, real-time collaboration tools, and a transparent process that removes the stress and amplifies the joy.
                        </p>
                        <Link href="/about" className="btn-gold">
                            Meet Our Team <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Visual card stack */}
                    <div className="relative h-80 lg:h-[500px]">
                        <div className="absolute top-0 right-0 w-[75%] h-64 bg-gradient-to-br from-elf-gold/20 to-elf-gold/5 border border-elf-gold/20 flex items-end p-6">
                            <div>
                                <div className="font-playfair text-white text-xl italic mb-1">"Pure Magic"</div>
                                <div className="font-inter text-white/40 text-xs tracking-widest uppercase">Selam & Yonas, 2023</div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-[70%] h-52 bg-elf-gold/10 border border-elf-gold/20 flex items-center justify-center">
                            <div className="text-center">
                                <Sparkles size={32} className="text-elf-gold mx-auto mb-3" />
                                <div className="font-playfair text-white text-lg">Crafted with Love</div>
                                <div className="font-inter text-white/30 text-xs mt-1 tracking-widest uppercase">Every Detail Matters</div>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-elf-gold flex items-center justify-center">
                            <Calendar size={24} className="text-white" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PROCESS ───────────────────────────────────────── */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">How It Works</span>
                        <h2 className="heading-serif text-4xl md:text-5xl">
                            Your Journey,
                            <span className="italic text-elf-gold"> Simplified</span>
                        </h2>
                        <div className="gold-divider" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {process.map((p, i) => (
                            <div key={p.step} className="relative p-8 border-t-2 border-t-elf-border group hover:border-t-elf-gold transition-colors duration-300">
                                <div className="font-playfair text-6xl font-medium text-elf-border group-hover:text-elf-gold/20 transition-colors duration-300 mb-4 leading-none">
                                    {p.step}
                                </div>
                                <h3 className="font-playfair text-xl font-medium text-elf-charcoal mb-3">{p.title}</h3>
                                <p className="font-inter text-sm text-elf-muted leading-relaxed">{p.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 right-0 w-px h-12 bg-elf-border" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ──────────────────────────────────── */}
            <section className="py-28 px-6 bg-elf-warm border-y border-elf-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">Kind Words</span>
                        <h2 className="heading-serif text-4xl md:text-5xl">
                            Stories That
                            <span className="italic text-elf-gold"> Warm Our Hearts</span>
                        </h2>
                        <div className="gold-divider" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t) => (
                            <div key={t.name} className="bg-white p-10 border border-elf-border card-hover flex flex-col">
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} size={14} className="text-elf-gold fill-elf-gold" />
                                    ))}
                                </div>
                                <blockquote className="font-playfair text-lg italic text-elf-charcoal leading-relaxed mb-8 flex-1">
                                    "{t.quote}"
                                </blockquote>
                                <div>
                                    <div className="font-inter font-medium text-elf-charcoal text-sm">{t.name}</div>
                                    <div className="font-inter text-xs text-elf-muted mt-1">{t.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA BANNER ────────────────────────────────────── */}
            <section className="py-32 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-elf-gold/5 via-transparent to-elf-gold/5" />
                <div className="relative text-center max-w-3xl mx-auto">
                    <span className="section-label">Ready to Begin?</span>
                    <h2 className="font-playfair text-4xl md:text-6xl font-medium text-white mb-6">
                        Let's Create Something
                        <br />
                        <span className="text-elf-gold italic">Extraordinary</span>
                    </h2>
                    <p className="font-inter text-white/50 text-base mb-12 max-w-xl mx-auto leading-relaxed">
                        Start with a complimentary consultation. Tell us your vision and let us show you what's possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="btn-gold px-12 py-5 text-sm">
                            Book a Consultation <ArrowRight size={16} />
                        </Link>
                        <Link href="/portfolio" className="font-inter text-sm tracking-widest uppercase text-white/50 hover:text-elf-gold transition-colors duration-200 flex items-center gap-2">
                            See Our Portfolio <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
