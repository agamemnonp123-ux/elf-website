'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    ArrowLeft, ArrowRight, Sparkles, Utensils, Brush, Camera,
    Music, Cake, Car, Star, Loader2, Heart, Shield
} from 'lucide-react';

const iconMap: Record<string, any> = {
    'Sparkles': Sparkles,
    'Utensils': Utensils,
    'Brush': Brush,
    'Camera': Camera,
    'Music': Music,
    'Cake': Cake,
    'Car': Car,
    'Heart': Heart,
    'Shield': Shield,
};

export default function ServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchService = async () => {
            const { data: service } = await supabase
                .from('services')
                .select('*')
                .eq('slug', slug)
                .single();

            setData(service);
            setLoading(false);
        };
        fetchService();
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-elf-cream flex flex-col items-center justify-center">
                <Navbar />
                <Loader2 size={40} className="animate-spin text-elf-gold mb-4" />
                <p className="font-inter tracking-[0.2em] uppercase text-xs text-elf-muted">Curating Experience...</p>
                <Footer />
            </main>
        );
    }

    if (!data) {
        return (
            <main className="min-h-screen bg-elf-cream flex flex-col items-center justify-center p-6 mt-20">
                <Navbar />
                <h1 className="font-playfair text-4xl mb-4 text-elf-charcoal">Chapter Not Found</h1>
                <p className="text-elf-muted mb-8 italic">This service experience hasn't been written yet.</p>
                <Link href="/" className="btn-gold">Back to Home</Link>
                <Footer />
            </main>
        );
    }

    const HeroIcon = iconMap[data.icon_name] || Sparkles;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-48 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
                <div className="max-w-4xl mx-auto text-center relative">
                    <div className="w-20 h-20 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center mx-auto mb-10 text-elf-gold shadow-2xl">
                        <HeroIcon size={40} strokeWidth={1} />
                    </div>
                    <span className="section-label mb-4 block tracking-[0.4em]">Essential Offering</span>
                    <h1 className="font-playfair text-6xl md:text-8xl text-white font-medium mb-8">
                        {data.title}
                    </h1>
                    <div className="w-24 h-px bg-elf-gold mx-auto mb-10" />
                    <p className="font-inter text-white/40 text-xl leading-relaxed max-w-2xl mx-auto">
                        {data.description}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-32 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div className="space-y-16">
                            <div>
                                <span className="section-label mb-2 block">Curation</span>
                                <h2 className="font-playfair text-4xl mb-8 border-b border-elf-border pb-6">What We Offer</h2>
                                <p className="font-inter text-elf-muted leading-relaxed text-lg">
                                    At Elf Events, we don't believe in one-size-fits-all. Every {data.title.toLowerCase()} package is bespoke, curated strictly for your specific aesthetic and requirements.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {data.features?.map((f: string) => (
                                    <div key={f} className="flex items-center gap-6 p-6 border-l-4 border-elf-gold bg-white shadow-sm hover:translate-x-2 transition-all duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-elf-gold" />
                                        <span className="font-inter text-sm tracking-[0.15em] text-elf-charcoal uppercase font-semibold">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <Link href="/contact" className="btn-gold group">
                                    Inquire for {data.title} <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative sticky top-32">
                            <div className="aspect-[3/4] bg-white border border-elf-border flex items-center justify-center overflow-hidden p-12">
                                <div className="text-center relative">
                                    <div className="font-playfair text-9xl text-elf-gold/5 mb-4 select-none">{data.emoji}</div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <Star size={60} className="text-elf-gold/10 mb-8" />
                                        <div className="font-playfair text-3xl font-medium text-elf-charcoal/30">elf</div>
                                        <div className="w-10 h-px bg-elf-gold/30 my-4" />
                                        <p className="font-inter text-elf-muted/30 uppercase tracking-[0.4em] text-[10px]">Exceptionalism</p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative blocks */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-elf-gold/5 -z-10 blur-xl" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 border border-elf-gold/5 -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-16 border-t border-elf-border bg-elf-charcoal px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link href="/" className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-elf-gold flex items-center gap-4 transition-all">
                        <ArrowLeft size={14} /> Back to Haven
                    </Link>
                    <div className="w-px h-12 bg-white/10 hidden md:block" />
                    <Link href="/services" className="font-inter text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-elf-gold flex items-center gap-4 transition-all">
                        Discover All Wonders <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
