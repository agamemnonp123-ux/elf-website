'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Settings, Hammer, Construction } from 'lucide-react';

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            <section className="pt-40 pb-24 px-6 flex flex-col items-center justify-center text-center">
                <div className="max-w-xl mx-auto">
                    <Link href="/admin/dashboard" className="text-elf-gold text-xs tracking-widest uppercase flex items-center justify-center gap-2 mb-8 hover:gap-3 transition-all">
                        <ArrowLeft size={14} /> Back to Dashboard
                    </Link>

                    <div className="w-20 h-20 bg-elf-gold/10 flex items-center justify-center text-elf-gold mx-auto mb-8 rounded-full border border-elf-gold/20">
                        <Settings size={40} className="animate-spin-slow" />
                    </div>

                    <h1 className="font-playfair text-4xl mb-4">System Configurations</h1>
                    <p className="font-inter text-elf-muted text-sm leading-relaxed mb-10">
                        We are currently fine-tuning your administrative engine. Advanced settings for SEO, security, and global styles will be available in the next architectural update.
                    </p>

                    <div className="p-8 border-2 border-dashed border-elf-border bg-white flex flex-col items-center gap-4">
                        <Construction size={24} className="text-elf-gold/40" />
                        <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-elf-muted">Architectural Milestone: 90% Complete</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
