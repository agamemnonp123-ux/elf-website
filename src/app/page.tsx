'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Calendar, Sparkles, Users, Star, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

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
        name: 'Leyla & Khalid',
        event: 'Engagement · Hyatt Regency, 2023',
        quote: 'The level of professionalism and artistic vision elf brought to our engagement ceremony was truly world-class.',
        rating: 5,
    },
];

export default function Home() {
    const [subServices, setSubServices] = useState<any[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: true });

            if (data) setSubServices(data);
            setLoadingServices(false);
        };
        fetchServices();
    }, []);

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            {/* ─── HERO SECTION ─────────────────────────────────── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-elf-charcoal">
                {/* Background overlay with subtle grain/pattern */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }} />

                {/* Ambient glow */}
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-elf-gold/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-elf-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <span className="section-label mb-6 inline-block text-animate animate-fade-in">Established 2016</span>

                    <h1 className="font-playfair text-6xl md:text-8xl text-white font-medium leading-[1.1] mb-8 animate-slide-up">
                        Every Love Story
                        <br />
                        <span className="text-elf-gold italic">Deserves</span> a
                        <br />
                        Perfect Chapter
                    </h1>

                    <p className="font-inter text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                        Elf (እልፍ) – Creating magical weddings and unforgettable events through elegant design, creative planning, and perfect attention to detail.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="btn-gold">
                            Begin Your Journey <ArrowRight size={16} />
                        </Link>
                        <Link href="/portfolio" className="btn-outline border-white/30 text-white hover:bg-white hover:text-elf-charcoal">
                            View Portfolio
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
                    <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Discover</span>
                    <ChevronDown size={16} />
                </div>
            </section>

            {/* ─── PLANNING PACKAGES ──────────────────────────── */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">Our Service Packages</span>
                        <h2 className="heading-serif text-4xl md:text-5xl mt-4 mb-6">
                            Elevating
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

            {/* ─── ESSENTIAL SERVICES ─────────────────────────── */}
            <section className="py-24 px-6 bg-white border-t border-elf-border">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <span className="section-label">A la Carte</span>
                            <h2 className="heading-serif text-4xl mt-2">Extraordinary Essentials</h2>
                        </div>
                        <p className="font-inter text-elf-muted text-sm max-w-xs md:text-right leading-relaxed">
                            Bespoke planning isn't just about the big picture — it's about every individual thread being perfect.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {loadingServices ? (
                            <div className="col-span-full py-12 flex justify-center">
                                <Loader2 className="animate-spin text-elf-gold" />
                            </div>
                        ) : subServices.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-elf-muted text-sm italic">
                                Creating incredible services...
                            </div>
                        ) : (
                            subServices.map((s, i) => (
                                <Link
                                    key={s.id}
                                    href={`/services/${s.slug}`}
                                    className="group bg-elf-cream border border-elf-border p-8 text-center flex flex-col items-center justify-center hover:border-elf-gold transition-all duration-500"
                                    style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <div className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-500 transform-gpu">{s.emoji}</div>
                                    <div className="font-inter text-[10px] tracking-widest uppercase text-elf-charcoal font-semibold leading-tight px-2 group-hover:text-elf-gold transition-colors">
                                        {s.title.split(' ')[0]}
                                    </div>
                                </Link>
                            ))
                        )}
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
                            <Star size={32} className="text-white" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PROCESS ────────────────────────────────────── */}
            <section className="py-32 px-6 bg-elf-cream relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/3">
                            <span className="section-label">Methodology</span>
                            <h2 className="heading-serif text-4xl mt-2 mb-8">The Elf Approach</h2>
                            <p className="font-inter text-elf-muted leading-relaxed mb-10">
                                We've refined our process over eight years to ensure clarity, creativity, and absolute peace of mind for our clients.
                            </p>
                            <Link href="/contact" className="btn-gold">
                                Schedule a Call <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {process.map((p) => (
                                <div key={p.step} className="bg-white p-10 border border-elf-border relative overflow-hidden group">
                                    <div className="font-playfair text-6xl text-elf-gold/10 absolute top-4 right-6 group-hover:text-elf-gold/20 transition-colors">
                                        {p.step}
                                    </div>
                                    <h3 className="font-playfair text-2xl mb-4 relative z-10">{p.title}</h3>
                                    <p className="font-inter text-sm text-elf-muted leading-relaxed relative z-10">
                                        {p.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ───────────────────────────────────────── */}
            <section className="py-24 border-y border-elf-border bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="font-playfair text-4xl text-elf-charcoal mb-2 font-medium">{s.value}</div>
                            <div className="font-inter text-[10px] tracking-[0.3em] uppercase text-elf-gold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── TESTIMONIALS ────────────────────────────────── */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">Kind Words</span>
                        <h2 className="heading-serif text-4xl mt-2">Client Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {testimonials.map((t) => (
                            <div key={t.name} className="relative p-12 bg-elf-warm border border-elf-border text-center">
                                <div className="flex justify-center gap-1 mb-8">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-elf-gold text-elf-gold" />
                                    ))}
                                </div>
                                <blockquote className="font-playfair text-2xl italic text-elf-charcoal leading-relaxed mb-10">
                                    "{t.quote}"
                                </blockquote>
                                <div className="w-8 h-px bg-elf-gold mx-auto mb-6" />
                                <div className="font-inter text-xs tracking-widest uppercase text-elf-charcoal font-bold">{t.name}</div>
                                <div className="font-inter text-[10px] tracking-widest uppercase text-elf-muted mt-2">{t.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ───────────────────────────────────── */}
            <section className="py-32 px-6 text-center relative overflow-hidden bg-elf-charcoal">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at center, #C9A96E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="section-label mb-6 inline-block">Unforgettable Moments</span>
                    <h2 className="font-playfair text-5xl md:text-6xl text-white font-medium mb-10">
                        Ready to Begin Your
                        <br />
                        <span className="text-elf-gold italic">Next Chapter?</span>
                    </h2>
                    <p className="font-inter text-white/40 text-lg mb-12 leading-relaxed">
                        Let's discuss how we can bring your vision to life. Our first consultation is always complimentary.
                    </p>
                    <Link href="/contact" className="btn-gold text-lg px-12 py-5">
                        Inquire Now <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
