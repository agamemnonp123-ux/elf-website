import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, Camera, MessageSquare } from 'lucide-react';

export default async function ClientDashboard() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // Fetch event details associated with this client
    const { data: event } = await supabase
        .from('events')
        .select('*')
        .eq('client_id', user.id)
        .single();

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            <section className="pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <span className="section-label">Client Dashboard</span>
                            <h1 className="font-playfair text-4xl md:text-5xl font-medium text-elf-charcoal mt-2">
                                Hello, {user.email?.split('@')[0]}
                            </h1>
                        </div>
                        {event && (
                            <div className="bg-elf-gold/10 border border-elf-gold/20 px-6 py-4 flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-inter text-[10px] tracking-widest uppercase text-elf-gold">Countdown</div>
                                    <div className="font-playfair text-2xl text-elf-charcoal font-medium">92 Days To Go</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {!event ? (
                        <div className="bg-white border border-elf-border p-16 text-center">
                            <h2 className="font-playfair text-2xl text-elf-charcoal mb-4">No Active Project Found</h2>
                            <p className="font-inter text-elf-muted max-w-md mx-auto">
                                We haven't linked an event to your account yet. Please contact your event planner at elf Events to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Event Overview */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white border border-elf-border p-8">
                                    <h2 className="font-playfair text-2xl text-elf-charcoal mb-6">{event.title}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-elf-cream flex items-center justify-center text-elf-gold">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <div className="font-inter text-[10px] tracking-widest uppercase text-elf-muted">Date</div>
                                                <div className="font-inter text-sm text-elf-charcoal">{event.event_date}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-elf-cream flex items-center justify-center text-elf-gold">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <div className="font-inter text-[10px] tracking-widest uppercase text-elf-muted">Venue</div>
                                                <div className="font-inter text-sm text-elf-charcoal">{event.venue}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="bg-white border border-elf-border p-8 hover:border-elf-gold transition-colors duration-300">
                                        <Camera className="text-elf-gold mb-4" size={24} />
                                        <h3 className="font-playfair text-xl text-elf-charcoal mb-2">Photo Gallery</h3>
                                        <p className="font-inter text-sm text-elf-muted mb-6">Access and download your event's professional photographs.</p>
                                        <button className="text-elf-gold font-inter text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all duration-300">
                                            View Gallery <Clock size={14} />
                                        </button>
                                    </div>
                                    <div className="bg-white border border-elf-border p-8 hover:border-elf-gold transition-colors duration-300">
                                        <MessageSquare className="text-elf-gold mb-4" size={24} />
                                        <h3 className="font-playfair text-xl text-elf-charcoal mb-2">Direct Messaging</h3>
                                        <p className="font-inter text-sm text-elf-muted mb-6">Chat directly with your lead planner and coordinating team.</p>
                                        <button className="text-elf-gold font-inter text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all duration-300">
                                            Open Chat <Clock size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <div className="bg-elf-charcoal p-8 text-white">
                                    <h3 className="font-playfair text-xl mb-6">Quick Links</h3>
                                    <ul className="space-y-4">
                                        {['Contracts & Invoices', 'Project Timeline', 'Vendor Contacts', 'Design Board'].map(item => (
                                            <li key={item} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                                                <a href="#" className="font-inter text-sm text-white/70 hover:text-elf-gold transition-colors duration-300 flex justify-between items-center">
                                                    {item}
                                                    <ArrowRight size={14} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ArrowRight({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    );
}
