import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-elf-charcoal text-elf-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="mb-6">
                            <div className="font-playfair text-3xl font-semibold tracking-wider text-white">elf</div>
                            <div className="text-[9px] font-inter tracking-[0.35em] uppercase text-elf-gold">Events</div>
                        </div>
                        <p className="text-sm font-inter text-white/50 leading-relaxed max-w-xs">
                            Crafting unforgettable moments. Full-service wedding and event planning with a white-glove approach.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-elf-gold hover:text-elf-gold transition-colors duration-300">
                                <Instagram size={15} />
                            </a>
                            <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-elf-gold hover:text-elf-gold transition-colors duration-300">
                                <Facebook size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-inter text-xs tracking-[0.3em] uppercase text-elf-gold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {['Full Wedding Planning', 'Partial Planning', 'Day-of Coordination', 'Design & Styling', 'Corporate Events', 'Destination Weddings'].map(s => (
                                <li key={s}>
                                    <Link href="/services" className="font-inter text-sm text-white/50 hover:text-elf-gold transition-colors duration-200">
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-inter text-xs tracking-[0.3em] uppercase text-elf-gold mb-6">Company</h4>
                        <ul className="space-y-3">
                            {[
                                ['Our Story', '/about'],
                                ['Portfolio', '/portfolio'],
                                ['Contact', '/contact'],
                                ['Client Portal', '/client/dashboard'],
                                ['Admin Portal', '/admin/dashboard']
                            ].map(([label, href]) => (
                                <li key={href}>
                                    <Link href={href} className="font-inter text-sm text-white/50 hover:text-elf-gold transition-colors duration-200">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-inter text-xs tracking-[0.3em] uppercase text-elf-gold mb-6">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone size={14} className="text-elf-gold mt-0.5 shrink-0" />
                                <div className="font-inter text-sm text-white/50 space-y-1">
                                    <div>+251 977 11 5969</div>
                                    <div>+251 969 77 6918</div>
                                    <div>+251 910 83 6667</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={14} className="text-elf-gold mt-0.5 shrink-0" />
                                <span className="font-inter text-sm text-white/50">hello@elfevents.et</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={14} className="text-elf-gold mt-0.5 shrink-0" />
                                <span className="font-inter text-sm text-white/50">Bole Road, Addis Ababa, Ethiopia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-white/30 tracking-wider">
                        © {new Date().getFullYear()} elf Events. All rights reserved.
                    </p>
                    <p className="font-inter text-xs text-white/20 tracking-wider italic font-playfair">
                        Creating love stories, one event at a time.
                    </p>
                </div>
            </div>
        </footer>
    );
}
