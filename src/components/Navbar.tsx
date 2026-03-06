'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-elf-cream/95 backdrop-blur-md shadow-sm border-b border-elf-border' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex flex-col leading-none">
                    <span className="font-playfair text-2xl font-semibold text-elf-charcoal tracking-wider">elf</span>
                    <span className="text-[9px] font-inter tracking-[0.35em] uppercase text-elf-gold">Events</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="text-sm font-inter font-medium tracking-widest uppercase text-elf-muted hover:text-elf-charcoal transition-colors duration-200"
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <Link href="/contact" className="hidden md:inline-flex btn-gold text-xs py-3 px-6">
                    Inquire Now
                </Link>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-elf-charcoal"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-elf-cream border-t border-elf-border overflow-hidden transition-all duration-300 ${open ? 'max-h-96 py-6' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col gap-4 px-6">
                    {navLinks.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="text-sm font-inter font-medium tracking-widest uppercase text-elf-muted hover:text-elf-charcoal"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link href="/contact" onClick={() => setOpen(false)} className="btn-gold text-xs py-3 px-6 w-fit mt-2">
                        Inquire Now
                    </Link>
                </nav>
            </div>
        </header>
    );
}
