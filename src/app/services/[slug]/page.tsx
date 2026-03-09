'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, Utensils, Brush, Camera, Music, Cake, Car, Star } from 'lucide-react';

const serviceData: Record<string, any> = {
    'decor': {
        title: 'Bespoke Decor',
        icon: '✨',
        HeroIcon: Sparkles,
        desc: 'Transforming spaces into immersive experiences. From ethereal floral installations to avant-garde lighting, our decor services are designed to captivate and inspire.',
        features: ['Bespoke Floral Design', 'Custom Floor Plans', 'Luxury Rentals', 'Ambient Lighting Design'],
    },
    'catering': {
        title: 'Exquisite Catering',
        icon: '🍽️',
        HeroIcon: Utensils,
        desc: 'A culinary journey tailored to your taste. We specialize in sophisticated sweets, elegant finger foods, and traditional delicacies served with modern flair.',
        features: ['Custom Menu Design', 'Artisan Sweet Displays', 'Gourmet Finger Foods', 'Professional Service Staff'],
    },
    'makeup': {
        title: 'Master Makeup Artist',
        icon: '🎨',
        HeroIcon: Brush,
        desc: 'Enhancing natural beauty with expert precision. Our artists use premium products to ensure a flawless, long-lasting look that radiates confidence and grace.',
        features: ['Bridal Makeup', 'Editorial Styling', 'Premium Product Range', 'Personalized Consultation'],
    },
    'photo-video': {
        title: 'Photo & Video',
        icon: '🎬',
        HeroIcon: Camera,
        desc: 'Capturing moments that last a lifetime. Our cinematic approach to photography and videography ensures every glance, tear, and dance is preserved in stunning detail.',
        features: ['Cinematic Videography', 'Fine Art Photography', 'Drone Coverage', 'Luxury Photo Albums'],
    },
    'sound-system': {
        title: 'Premium Sound System',
        icon: '🎵',
        HeroIcon: Music,
        desc: 'The heartbeat of your celebration. We provide state-of-the-art audio equipment and expert engineering to ensure crystal-clear sound from the first toast to the final song.',
        features: ['High-Fidelity Audio', 'Wireless Mic Systems', 'Live Sound Engineering', 'Custom Playlists'],
    },
    'cake-designer': {
        title: 'Cake Designer',
        icon: '🍰',
        HeroIcon: Cake,
        desc: 'Artistry in every bite. Our master bakers craft stunning centerpieces that are as delicious as they are beautiful, using the finest ingredients and intricate designs.',
        features: ['Custom Flavor Profiles', 'Hand-Painted Details', 'Sugar Artistry', 'Tasting Consultations'],
    },
    'transportation': {
        title: 'Luxury Transportation',
        icon: '⚜️',
        HeroIcon: Car,
        desc: 'Arrival in style. From vintage classics to modern luxury fleets, we ensure your journey is as comfortable and elegant as the destination itself.',
        features: ['Luxury Vehicle Fleet', 'Chauffeur Services', 'Coordinated Logistics', 'Vintage Car Options'],
    }
};

export default function ServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const data = serviceData[slug];

    if (!data) {
        return (
            <main className="min-h-screen bg-elf-cream flex flex-col items-center justify-center p-6 mt-20">
                <Navbar />
                <h1 className="font-playfair text-4xl mb-4">Service Not Found</h1>
                <Link href="/" className="text-elf-gold hover:underline">Back to Home</Link>
                <Footer />
            </main>
        );
    }

    const { HeroIcon } = data;

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            {/* Hero */}
            <section className="pt-48 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="max-w-4xl mx-auto text-center relative">
                    <div className="w-16 h-16 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center mx-auto mb-8 text-elf-gold">
                        <HeroIcon size={32} />
                    </div>
                    <span className="section-label mb-4 block">Our Expertise</span>
                    <h1 className="font-playfair text-5xl md:text-7xl text-white font-medium mb-6">
                        {data.title}
                    </h1>
                    <div className="w-20 h-px bg-elf-gold mx-auto mb-8" />
                    <p className="font-inter text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
                        {data.desc}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            <div>
                                <h2 className="heading-serif text-4xl mb-6">What We Offer</h2>
                                <p className="font-inter text-elf-muted leading-relaxed">
                                    At Elf Events, we don't believe in one-size-fits-all. Every {data.title.toLowerCase()} package is bespoke, curated strictly for your specific aesthetic and requirements.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.features.map((f: string) => (
                                    <div key={f} className="flex items-center gap-4 p-4 border border-elf-border bg-white group hover:border-elf-gold transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-elf-gold" />
                                        <span className="font-inter text-sm tracking-wide text-elf-charcoal uppercase">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <Link href="/contact" className="btn-gold">
                                    Book This Service <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] bg-elf-warm border border-elf-border flex items-center justify-center overflow-hidden">
                                <div className="text-center p-12">
                                    <div className="font-playfair text-8xl text-elf-charcoal/5 mb-4">{data.icon}</div>
                                    <Star size={40} className="text-elf-gold/20 mx-auto mb-6" />
                                    <p className="font-inter text-elf-muted/40 uppercase tracking-[0.3em] text-xs">Elf Excellence</p>
                                </div>
                            </div>
                            {/* Decorative blocks */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-elf-gold/10 border border-elf-gold/20 -z-10" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 border border-elf-border -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <section className="py-12 border-t border-elf-border bg-white px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="font-inter text-xs tracking-widest uppercase text-elf-muted hover:text-elf-gold flex items-center gap-2 transition-all">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                    <Link href="/services" className="font-inter text-xs tracking-widest uppercase text-elf-muted hover:text-elf-gold flex items-center gap-2 transition-all">
                        All Services <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
