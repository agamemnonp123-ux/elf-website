import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const portfolioItems = [
    { id: 1, title: 'Meron & Dawit', category: 'Wedding', style: 'Modern Luxe', location: 'Sheraton Addis', color: 'from-amber-900/40 to-stone-900/60', accent: '#C9A96E' },
    { id: 2, title: 'Sintayehu Gala', category: 'Corporate', style: 'Glamour', location: 'Skylight Hotel', color: 'from-slate-800/60 to-zinc-900/80', accent: '#E8C97E' },
    { id: 3, title: 'Selam & Yonas', category: 'Wedding', style: 'Destination', location: 'Lalibela', color: 'from-stone-700/50 to-amber-950/70', accent: '#C9A96E' },
    { id: 4, title: 'Hana & Michael', category: 'Wedding', style: 'Rustic Chic', location: 'Kuriftu Resort', color: 'from-green-900/40 to-stone-900/60', accent: '#C9A96E' },
    { id: 5, title: 'Brand Horizon Launch', category: 'Corporate', style: 'Minimalist', location: 'Radisson Blu', color: 'from-zinc-800/60 to-slate-900/70', accent: '#E8C97E' },
    { id: 6, title: 'Tigist & Amanuel', category: 'Wedding', style: 'Garden Romance', location: 'Entoto Park', color: 'from-emerald-900/40 to-stone-900/60', accent: '#C9A96E' },
    { id: 7, title: 'Firehiwot & Tesfaye', category: 'Wedding', style: 'Grand Luxe', location: 'Hilton Addis', color: 'from-purple-900/30 to-stone-900/70', accent: '#C9A96E' },
    { id: 8, title: 'Harvest Gala 2024', category: 'Corporate', style: 'Festive', location: 'Capital Hotel', color: 'from-amber-800/40 to-stone-900/60', accent: '#E8C97E' },
    { id: 9, title: 'Bethlehem & Simon', category: 'Wedding', style: 'Intimate', location: 'Private Villa', color: 'from-rose-900/30 to-stone-900/70', accent: '#C9A96E' },
];

const styles = ['All', 'Wedding', 'Corporate', 'Destination'];

export default function PortfolioPage() {
    return (
        <main>
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="relative text-center max-w-3xl mx-auto">
                    <span className="section-label">Our Work</span>
                    <h1 className="font-playfair text-5xl md:text-7xl font-medium text-white">
                        Stories We've
                        <br />
                        <span className="text-elf-gold italic">Had the Honor to Tell</span>
                    </h1>
                    <div className="w-16 h-px bg-elf-gold mx-auto my-8" />
                    <p className="font-inter text-white/50 text-lg leading-relaxed">
                        Each event is a unique story. Here are a few of the chapters we've had the privilege of crafting.
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto">
                    {/* Filter pills (static visual — filtering would need client component) */}
                    <div className="flex flex-wrap gap-3 justify-center mb-16">
                        {styles.map((s, i) => (
                            <span key={s}
                                className={`px-6 py-2 text-xs font-inter tracking-widest uppercase border cursor-pointer transition-all duration-200 ${i === 0 ? 'bg-elf-charcoal text-white border-elf-charcoal' : 'bg-white text-elf-muted border-elf-border hover:border-elf-charcoal hover:text-elf-charcoal'
                                    }`}
                            >
                                {s}
                            </span>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item) => (
                            <div key={item.id} className="group relative overflow-hidden cursor-pointer card-hover">
                                {/* Placeholder image with gradient bg */}
                                <div className={`relative h-72 bg-gradient-to-br ${item.color} flex items-end p-8`}>
                                    {/* Decorative pattern */}
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 30% 30%, ${item.accent} 1px, transparent 1px)`,
                                            backgroundSize: '24px 24px',
                                        }}
                                    />

                                    {/* Category badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="text-xs font-inter tracking-widest uppercase text-white/60 border border-white/20 px-3 py-1">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-elf-charcoal/0 group-hover:bg-elf-charcoal/40 transition-all duration-500" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="text-xs font-inter tracking-widest uppercase text-white/50 mb-2">{item.style}</div>
                                        <h3 className="font-playfair text-2xl font-medium text-white">{item.title}</h3>
                                        <div className="text-xs font-inter text-white/50 mt-1">{item.location}</div>
                                    </div>

                                    {/* Hover arrow */}
                                    <div className="absolute right-6 bottom-6 w-10 h-10 bg-elf-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                        <ArrowRight size={16} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-elf-warm border-t border-elf-border text-center">
                <span className="section-label">Your Turn</span>
                <h2 className="heading-serif text-4xl md:text-5xl mb-6">Let's Add Your Story</h2>
                <p className="font-inter text-elf-muted max-w-xl mx-auto mb-10 leading-relaxed">
                    Every event above started with a single conversation. Reach out and let's begin writing yours.
                </p>
                <Link href="/contact" className="btn-gold">
                    Start Planning <ArrowRight size={16} />
                </Link>
            </section>

            <Footer />
        </main>
    );
}
