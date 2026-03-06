'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Mail, Phone, MapPin, Instagram, Facebook, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const eventTypes = ['Wedding', 'Corporate Event', 'Destination Wedding', 'Social Celebration', 'Other'];
const budgetRanges = ['Under $15K', '$15K – $25K', '$25K – $50K', '$50K – $100K', '$100K+'];
const servicesOptions = ['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Design Only', 'Corporate Events'];

export default function ContactPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '', email: '', phone: '',
        eventType: '', date: '', guests: '', budget: '',
        services: [] as string[],
        venue: '', vision: '', referral: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleService = (s: string) => {
        setForm(prev => ({
            ...prev,
            services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: supabaseError } = await supabase
                .from('leads')
                .insert([
                    {
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        event_type: form.eventType,
                        event_date: form.date,
                        guest_count: form.guests,
                        budget: form.budget,
                        services: form.services,
                        venue: form.venue,
                        vision: form.vision,
                        referral: form.referral,
                    },
                ]);

            if (supabaseError) throw supabaseError;
            setSubmitted(true);
        } catch (err: any) {
            console.error('Submission error:', err);
            setError('Something went wrong. Please try again or contact us directly.');
        } finally {
            setLoading(false);
        }
    };

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
                    <span className="section-label">Get In Touch</span>
                    <h1 className="font-playfair text-5xl md:text-7xl font-medium text-white">
                        Let's Start Your
                        <br />
                        <span className="text-elf-gold italic">Love Story</span>
                    </h1>
                    <div className="w-16 h-px bg-elf-gold mx-auto my-8" />
                    <p className="font-inter text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
                        Fill out the form below and we'll reach out within 24 hours to schedule your complimentary consultation.
                    </p>
                </div>
            </section>

            {/* Form + Info */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Info Panel */}
                    <div>
                        <h2 className="font-playfair text-2xl font-medium text-elf-charcoal mb-8">Contact Information</h2>
                        <ul className="space-y-6 mb-10">
                            <li className="flex items-start gap-4">
                                <div className="w-9 h-9 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center shrink-0">
                                    <Phone size={14} className="text-elf-gold" />
                                </div>
                                <div>
                                    <div className="font-inter text-xs tracking-widest uppercase text-elf-muted mb-1">Phone</div>
                                    <div className="font-inter text-sm text-elf-charcoal">+251 91 234 5678</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-9 h-9 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center shrink-0">
                                    <Mail size={14} className="text-elf-gold" />
                                </div>
                                <div>
                                    <div className="font-inter text-xs tracking-widest uppercase text-elf-muted mb-1">Email</div>
                                    <div className="font-inter text-sm text-elf-charcoal">hello@elfevents.et</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-9 h-9 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center shrink-0">
                                    <MapPin size={14} className="text-elf-gold" />
                                </div>
                                <div>
                                    <div className="font-inter text-xs tracking-widest uppercase text-elf-muted mb-1">Office</div>
                                    <div className="font-inter text-sm text-elf-charcoal">Bole Road, Addis Ababa<br />Ethiopia</div>
                                </div>
                            </li>
                        </ul>

                        <div>
                            <div className="font-inter text-xs tracking-widest uppercase text-elf-muted mb-4">Follow Us</div>
                            <div className="flex gap-3">
                                <a href="#" className="w-9 h-9 border border-elf-border flex items-center justify-center hover:border-elf-gold hover:text-elf-gold transition-colors duration-300 text-elf-muted">
                                    <Instagram size={15} />
                                </a>
                                <a href="#" className="w-9 h-9 border border-elf-border flex items-center justify-center hover:border-elf-gold hover:text-elf-gold transition-colors duration-300 text-elf-muted">
                                    <Facebook size={15} />
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="mt-10 p-6 bg-elf-warm border border-elf-border">
                            <div className="font-inter text-xs tracking-widest uppercase text-elf-gold mb-4">Office Hours</div>
                            <div className="space-y-2">
                                {[['Mon – Fri', '9:00 AM – 6:00 PM'], ['Saturday', '10:00 AM – 2:00 PM'], ['Sunday', 'By Appointment']].map(([day, hrs]) => (
                                    <div key={day} className="flex justify-between font-inter text-sm text-elf-muted">
                                        <span>{day}</span>
                                        <span>{hrs}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div className="lg:col-span-2">
                        {submitted ? (
                            <div className="bg-white border border-elf-border p-16 text-center h-full flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-elf-gold/10 border border-elf-gold flex items-center justify-center mb-6">
                                    <Send size={24} className="text-elf-gold" />
                                </div>
                                <h3 className="font-playfair text-3xl font-medium text-elf-charcoal mb-4">
                                    Thank You, {form.name.split(' ')[0]}!
                                </h3>
                                <p className="font-inter text-elf-muted max-w-sm leading-relaxed">
                                    We've received your inquiry and will reach out within 24 hours to schedule your complimentary consultation.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white border border-elf-border p-10">
                                {/* Step indicators */}
                                <div className="flex items-center gap-4 mb-10">
                                    {[1, 2, 3].map((s) => (
                                        <div key={s} className="flex items-center gap-2">
                                            <div className={`w-7 h-7 flex items-center justify-center text-xs font-inter font-medium transition-colors duration-300 ${step >= s ? 'bg-elf-gold text-white' : 'bg-elf-border text-elf-muted'}`}>
                                                {s}
                                            </div>
                                            <span className="text-xs font-inter tracking-widest uppercase text-elf-muted hidden sm:block">
                                                {s === 1 ? 'You' : s === 2 ? 'Your Event' : 'Your Vision'}
                                            </span>
                                            {s < 3 && <div className="w-8 h-px bg-elf-border" />}
                                        </div>
                                    ))}
                                </div>

                                {/* Step 1: Personal Info */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h3 className="font-playfair text-2xl text-elf-charcoal mb-6">Tell us about yourself</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Full Name *</label>
                                                <input
                                                    required value={form.name}
                                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                                    className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold transition-colors duration-200"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Email *</label>
                                                <input
                                                    required type="email" value={form.email}
                                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                                    className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold transition-colors duration-200"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Phone</label>
                                            <input
                                                value={form.phone}
                                                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                                className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold transition-colors duration-200"
                                                placeholder="+251 9XX XXX XXX"
                                            />
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                disabled={!form.name || !form.email}
                                                className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Continue <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Event Details */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h3 className="font-playfair text-2xl text-elf-charcoal mb-6">About your event</h3>

                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-3">Event Type</label>
                                            <div className="flex flex-wrap gap-2">
                                                {eventTypes.map(t => (
                                                    <button key={t} type="button"
                                                        onClick={() => setForm(p => ({ ...p, eventType: t }))}
                                                        className={`px-4 py-2 text-xs font-inter tracking-widest uppercase border transition-colors duration-200 ${form.eventType === t ? 'bg-elf-charcoal text-white border-elf-charcoal' : 'border-elf-border text-elf-muted hover:border-elf-charcoal'}`}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Event Date</label>
                                                <input
                                                    type="date" value={form.date}
                                                    onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                                                    className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold"
                                                />
                                            </div>
                                            <div>
                                                <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Guest Count</label>
                                                <input
                                                    value={form.guests}
                                                    onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}
                                                    className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold"
                                                    placeholder="Approx. number"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-3">Budget Range</label>
                                            <div className="flex flex-wrap gap-2">
                                                {budgetRanges.map(b => (
                                                    <button key={b} type="button"
                                                        onClick={() => setForm(p => ({ ...p, budget: b }))}
                                                        className={`px-4 py-2 text-xs font-inter tracking-widest uppercase border transition-colors duration-200 ${form.budget === b ? 'bg-elf-gold text-white border-elf-gold' : 'border-elf-border text-elf-muted hover:border-elf-gold/50'}`}>
                                                        {b}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-3">Services Interested In</label>
                                            <div className="flex flex-wrap gap-2">
                                                {servicesOptions.map(s => (
                                                    <button key={s} type="button"
                                                        onClick={() => toggleService(s)}
                                                        className={`px-4 py-2 text-xs font-inter tracking-widest uppercase border transition-colors duration-200 ${form.services.includes(s) ? 'bg-elf-charcoal text-white border-elf-charcoal' : 'border-elf-border text-elf-muted hover:border-elf-charcoal'}`}>
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button type="button" onClick={() => setStep(1)} className="btn-outline">Back</button>
                                            <button type="button" onClick={() => setStep(3)} className="btn-gold">Continue <ArrowRight size={16} /></button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Vision */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h3 className="font-playfair text-2xl text-elf-charcoal mb-6">Share your vision</h3>

                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Venue (if selected)</label>
                                            <input
                                                value={form.venue}
                                                onChange={e => setForm(p => ({ ...p, venue: e.target.value }))}
                                                className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold"
                                                placeholder="Venue name or location preference"
                                            />
                                        </div>

                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Describe Your Vision *</label>
                                            <textarea
                                                required rows={5} value={form.vision}
                                                onChange={e => setForm(p => ({ ...p, vision: e.target.value }))}
                                                className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold resize-none"
                                                placeholder="Tell us about the feeling, aesthetic, or story you want your event to tell..."
                                            />
                                        </div>

                                        <div>
                                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">How did you find us?</label>
                                            <input
                                                value={form.referral}
                                                onChange={e => setForm(p => ({ ...p, referral: e.target.value }))}
                                                className="w-full border border-elf-border bg-elf-cream px-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold"
                                                placeholder="Instagram, referral, Google..."
                                            />
                                        </div>

                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-inter mb-4">
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-4">
                                            <button type="button" onClick={() => setStep(2)} className="btn-outline" disabled={loading}>Back</button>
                                            <button
                                                type="submit"
                                                disabled={!form.vision || loading}
                                                className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed min-w-[160px]"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2">Processing <Loader2 size={16} className="animate-spin" /></span>
                                                ) : (
                                                    <span className="flex items-center gap-2">Send Inquiry <Send size={16} /></span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
