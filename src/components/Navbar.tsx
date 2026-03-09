'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import LogoutButton from './LogoutButton';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState<SupabaseUser | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);

        const checkUser = async () => {
            const { data: { user: sessionUser } } = await supabase.auth.getUser();
            setUser(sessionUser);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener('scroll', onScroll);
            subscription.unsubscribe();
        };
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
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href={user.email === 'admin@elfevents.et' ? '/admin/dashboard' : '/client/dashboard'}
                                className="flex items-center gap-2 text-sm font-inter font-medium tracking-widest uppercase text-elf-gold hover:text-elf-charcoal transition-colors"
                            >
                                <User size={16} /> Portal
                            </Link>
                            <div className="w-px h-4 bg-elf-border" />
                            <LogoutButton className="text-[10px] font-inter font-medium tracking-widest uppercase text-elf-muted hover:text-red-400 transition-colors" />
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm font-inter font-medium tracking-widest uppercase text-elf-muted hover:text-elf-gold transition-colors">
                            Login
                        </Link>
                    )}
                    <Link href="/contact" className="btn-gold text-xs py-3 px-6">
                        Inquire Now
                    </Link>
                </div>

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
