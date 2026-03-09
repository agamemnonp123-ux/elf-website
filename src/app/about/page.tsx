import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Heart, Award, Clock, Globe } from 'lucide-react';

const values = [
    { icon: Heart, title: 'Love-Led', desc: 'We genuinely care about every couple and every event. It shows in every detail.' },
    { icon: Award, title: 'Excellence', desc: 'We set high standards and refuse to compromise on the quality of your experience.' },
    { icon: Clock, title: 'Unwavering Reliability', desc: 'On time, on budget, on vision — every time. Your trust is our most guarded asset.' },
    { icon: Globe, title: 'Creative Curiosity', desc: 'We draw inspiration globally and apply it locally, creating events that feel fresh and original.' },
];

const team = [
    { name: 'Rahel Girma', role: 'Founder & Lead Planner', bio: '12 years crafting extraordinary events across Ethiopia and beyond. Rahel built elf Events on the belief that every story deserves a perfect telling.' },
    { name: 'Tigist Bekele', role: 'Senior Event Designer', bio: 'With a background in architecture and interior design, Tigist transforms spaces into immersive experiences that guests never forget.' },
    { name: 'Dawit Haile', role: 'Logistics & Vendor Director', bio: 'The backbone of elf\'s operations. Dawit ensures every supplier, timeline, and plan works in seamless harmony.' },
];

export default function AboutPage() {
    return (
        <main>
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="relative text-center max-w-3xl mx-auto">
                    <span className="section-label">Our Story</span>
                    <h1 className="font-playfair text-5xl md:text-7xl font-medium text-white">
                        Born from a Passion
                        <br />
                        <span className="text-elf-gold italic">for Beautiful Moments</span>
                    </h1>
                </div>
            </section>

            {/* Story */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="section-label">The Beginning</span>
                        <h2 className="heading-serif text-4xl mb-8">
                            A Studio Built on
                            <span className="italic text-elf-gold"> Intention</span>
                        </h2>
                        <p className="font-inter text-elf-muted leading-relaxed mb-6">
                            elf Events was founded with a simple but powerful conviction: the moments that mark our lives deserve to be honored with care, creativity, and flawless execution.
                        </p>
                        <p className="font-inter text-elf-muted leading-relaxed mb-6">
                            Starting from Addis Ababa, we've grown into a full-service studio trusted by discerning couples and thoughtful brands who want more than just a vendor — they want a true partner.
                        </p>
                        <p className="font-inter text-elf-muted leading-relaxed">
                            Today, elf Events has planned over 250 events across Ethiopia and internationally, each one a testimony to our dedication to excellence.
                        </p>
                        <p className="font-inter text-elf-muted leading-relaxed mt-6 italic border-l-2 border-elf-gold pl-6">
                            The name Elf (እልፍ) represents abundance, beauty, and unforgettable moments. Our brand is built on the idea of bringing people together to celebrate life’s most important occasions with style, creativity, and excellence.
                        </p>
                    </div>

                    {/* Visual block */}
                    <div className="relative h-96">
                        <div className="absolute top-0 right-0 w-4/5 h-3/4 bg-elf-warm border border-elf-border flex items-center justify-center">
                            <div className="text-center">
                                <div className="font-playfair text-7xl font-medium text-elf-charcoal/10">elf</div>
                                <div className="font-inter text-xs tracking-[0.5em] uppercase text-elf-gold mt-2">Est. 2016</div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-elf-charcoal flex items-center justify-center p-8">
                            <div className="text-center">
                                <div className="font-playfair text-4xl font-medium text-white">250+</div>
                                <div className="font-inter text-xs tracking-widest uppercase text-elf-gold mt-2">Events Crafted</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-28 px-6 bg-elf-charcoal">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">What Drives Us</span>
                        <h2 className="font-playfair text-4xl md:text-5xl text-white font-medium">
                            Our Core
                            <span className="text-elf-gold italic"> Values</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="p-8 border border-white/10 hover:border-elf-gold/40 transition-all duration-300 group">
                                <Icon size={28} className="text-elf-gold mb-6" />
                                <h3 className="font-playfair text-xl text-white font-medium mb-3 group-hover:text-elf-gold transition-colors duration-300">{title}</h3>
                                <p className="font-inter text-sm text-white/40 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">The Team</span>
                        <h2 className="heading-serif text-4xl md:text-5xl">
                            The People Behind
                            <span className="italic text-elf-gold"> the Magic</span>
                        </h2>
                        <div className="gold-divider" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="group">
                                {/* Placeholder portrait */}
                                <div className="h-72 bg-gradient-to-br from-stone-200 to-elf-warm border border-elf-border flex items-center justify-center mb-6 group-hover:shadow-xl transition-shadow duration-500">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-elf-charcoal/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <span className="font-playfair text-2xl text-elf-charcoal/40">{member.name.charAt(0)}</span>
                                        </div>
                                        <div className="font-inter text-xs tracking-widest uppercase text-elf-muted">Team Member</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-playfair text-xl font-medium text-elf-charcoal mb-1">{member.name}</h3>
                                    <div className="font-inter text-xs tracking-widest uppercase text-elf-gold mb-4">{member.role}</div>
                                    <p className="font-inter text-sm text-elf-muted leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-elf-warm border-t border-elf-border text-center">
                <h2 className="heading-serif text-4xl mb-6">Ready to Work Together?</h2>
                <p className="font-inter text-elf-muted max-w-xl mx-auto mb-10">
                    Let's start with a conversation. Tell us about your event and vision.
                </p>
                <Link href="/contact" className="btn-gold">
                    Book a Consultation <ArrowRight size={16} />
                </Link>
            </section>

            <Footer />
        </main>
    );
}
