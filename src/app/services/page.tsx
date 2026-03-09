'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Sparkles, Utensils, Brush, Camera, Music, Cake, Car } from 'lucide-react';

const packages = [
    {
        title: 'Full Wedding Planning',
        desc: 'The ultimate white-glove experience. We manage every single detail from venue selection to the farewell brunch.',
        price: 'Bespoke Quote',
        icon: '✦'
    },
    {
        title: 'Design & Concept',
        desc: 'For the couple who has the logistics handled but wants a breathtaking, high-concept aesthetic.',
        price: 'Bespoke Quote',
        icon: '✿'
    },
    {
        title: 'Day-of Coordination',
        desc: 'You create the vision, we ensure its flawless execution so you can simply be present.',
        price: 'Bespoke Quote',
        icon: '◇'
    }
];

const essentials = [
    { name: 'Decor', slug: 'decor', icon: Sparkles, emoji: '✨' },
    { name: 'Catering', slug: 'catering', icon: Utensils, emoji: '🍽️' },
    { name: 'Makeup Artist', slug: 'makeup', icon: Brush, emoji: '🎨' },
    { name: 'Photo & Video', slug: 'photo-video', icon: Camera, emoji: '🎬' },
    { name: 'Sound System', slug: 'sound-system', icon: Music, emoji: '🎵' },
    { name: 'Cake Designer', slug: 'cake-designer', icon: Cake, emoji: '🍰' },
    { name: 'Transportation', slug: 'transportation', icon: Car, emoji: '⚜️' },
];

export default function ServicesPage() {
    return (
        <main className="bg-elf-cream">
            <Navbar />

            {/* Header */}
            <section className="pt-48 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="max-w-4xl mx-auto text-center relative">
                    <span className="section-label mb-4 block">Our Offerings</span>
                    <h1 className="font-playfair text-5xl md:text-7xl text-white font-medium mb-8">
                        The Art of
                        <br />
                        <span className="text-elf-gold italic">Curation</span>
                    </h1>
                    <div className="w-20 h-px bg-elf-gold mx-auto mb-8" />
                    <p className="font-inter text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
                        Whether you need full-scale planning or specialized a la carte services, we bring the same level of luxury and attention to every element.
                    </p>
                </div>
            </section>

            {/* Main Packages */}
            <section className="py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="section-label">Signature Experience</span>
                        <h2 className="heading-serif text-4xl mt-2">Planning Packages</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div key={pkg.title} className="bg-white border border-elf-border p-10 flex flex-col items-center text-center group hover:border-elf-gold transition-all duration-500">
                                <div className="text-4xl text-elf-gold mb-6 font-playfair">{pkg.icon}</div>
                                <h3 className="font-playfair text-2xl mb-4">{pkg.title}</h3>
                                <p className="font-inter text-elf-muted text-sm leading-relaxed mb-8">{pkg.desc}</p>
                                <div className="mt-auto pt-8 border-t border-elf-border w-full flex justify-between items-center">
                                    <span className="text-[10px] tracking-widest uppercase text-elf-gold font-bold">{pkg.price}</span>
                                    <Link href="/contact" className="text-xs tracking-widest uppercase text-elf-charcoal hover:text-elf-gold flex items-center gap-2 transition-all">
                                        Inquire <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Essentials Grid */}
            <section className="py-28 px-6 bg-white border-y border-elf-border">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="section-label">A la Carte</span>
                        <h2 className="heading-serif text-4xl mt-2">Extraordinary Essentials</h2>
                        <p className="font-inter text-elf-muted text-sm mt-4 max-w-lg mx-auto">Click into any essential to discover how we elevate every individual thread of your event.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {essentials.map((s) => (
                            <Link
                                key={s.slug}
                                href={`/services/${s.slug}`}
                                className="group bg-elf-cream border border-elf-border p-10 text-center flex flex-col items-center justify-center hover:border-elf-gold hover:shadow-xl transition-all duration-500"
                            >
                                <div className="w-14 h-14 bg-white border border-elf-border flex items-center justify-center mb-6 text-elf-muted group-hover:text-elf-gold group-hover:border-elf-gold transition-all duration-500">
                                    <s.icon size={24} strokeWidth={1.5} />
                                </div>
                                <div className="text-2xl mb-2">{s.emoji}</div>
                                <div className="font-inter text-xs tracking-[0.2em] uppercase text-elf-charcoal font-semibold mb-4">
                                    {s.name}
                                </div>
                                <div className="text-[10px] tracking-widest uppercase text-elf-gold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    Explore <ArrowRight size={10} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <h2 className="heading-serif text-4xl mb-6">Ready to Build Your Event?</h2>
                <p className="font-inter text-elf-muted max-w-xl mx-auto mb-10 leading-relaxed">
                    Contact us today for a bespoke consultation. Let's discuss which combination of services will best tell your unique story.
                </p>
                <Link href="/contact" className="btn-gold">
                    Start Your Consultation <ArrowRight size={16} />
                </Link>
            </section>

            <Footer />
        </main>
    );
}
