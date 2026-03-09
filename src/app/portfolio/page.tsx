'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    category: string;
    style: string;
    location: string;
    image_url: string;
}

const styles = ['All', 'Wedding', 'Corporate', 'Destination', 'Social'];

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');
    const supabase = createClient();

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProjects(data);
                setFilteredProjects(data);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(p => p.category === activeFilter));
        }
    }, [activeFilter, projects]);

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
            <section className="py-28 px-6 bg-elf-cream min-h-[60vh]">
                <div className="max-w-7xl mx-auto">
                    {/* Filter pills */}
                    <div className="flex flex-wrap gap-3 justify-center mb-16">
                        {styles.map((s) => (
                            <button
                                key={s}
                                onClick={() => setActiveFilter(s)}
                                className={`px-6 py-2 text-xs font-inter tracking-widest uppercase border transition-all duration-200 ${activeFilter === s
                                        ? 'bg-elf-charcoal text-white border-elf-charcoal shadow-lg'
                                        : 'bg-white text-elf-muted border-elf-border hover:border-elf-charcoal hover:text-elf-charcoal'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-elf-gold">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="font-inter tracking-widest uppercase text-xs text-elf-muted">Curating Gallery...</p>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-24 text-elf-muted font-inter italic">
                            No projects found in this category.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden cursor-pointer card-hover h-[450px]">
                                    {/* Image */}
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-elf-warm flex items-center justify-center text-elf-muted/20">
                                            <span className="font-playfair text-4xl italic">elf</span>
                                        </div>
                                    )}

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-elf-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Category Overlay */}
                                    <div className="absolute inset-0 bg-elf-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Category badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="text-[10px] font-inter tracking-[0.2em] uppercase text-white border border-white/30 px-3 py-1 bg-black/20 backdrop-blur-sm">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-8 left-8 right-8 z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="text-[10px] font-inter tracking-[0.3em] uppercase text-elf-gold mb-3 font-semibold">{item.style}</div>
                                        <h3 className="font-playfair text-3xl font-medium text-white mb-2">{item.title}</h3>
                                        <div className="text-xs font-inter text-white/60 tracking-wider flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-elf-gold" />
                                            {item.location}
                                        </div>
                                    </div>

                                    {/* Hover arrow */}
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                        <ArrowRight size={20} className="text-elf-charcoal" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
