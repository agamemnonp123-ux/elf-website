'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Loader2, Mail, Phone, Calendar, Trash2, CheckCircle, Clock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    event_type: string;
    event_date: string;
    guest_count: string;
    budget: string;
    services: string[];
    venue: string;
    vision: string;
    referral: string;
    status: string;
    priority: 'low' | 'medium' | 'high';
    internal_notes: string;
    created_at: string;
}

export default function LeadsManagement() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
        const { error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', id);

        if (error) {
            alert('Error updating lead: ' + error.message);
        } else {
            setLeads(leads.map(l => l.id === id ? { ...l, ...updates } : l));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return;

        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting lead: ' + error.message);
        } else {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            <section className="pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <Link href="/admin/dashboard" className="text-elf-gold text-xs tracking-widest uppercase flex items-center gap-2 mb-4 hover:gap-3 transition-all">
                            <ArrowLeft size={14} /> Back to Dashboard
                        </Link>
                        <h1 className="font-playfair text-4xl font-medium">Inquiry Management</h1>
                        <p className="text-elf-muted text-sm mt-2">Review and respond to potential clients.</p>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-elf-gold">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="font-inter tracking-widest uppercase text-xs text-elf-muted">Loading Inquiries...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center text-red-500 bg-white border border-elf-border">
                            {error}
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="p-24 text-center bg-white border border-elf-border">
                            <Mail size={48} className="text-elf-border mx-auto mb-6" />
                            <h3 className="font-playfair text-xl mb-2">No Inquiries Yet</h3>
                            <p className="text-elf-muted">When clients fill out your contact form, they will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {leads.map((lead) => (
                                <div key={lead.id} className="bg-white border border-elf-border overflow-hidden p-8 hover:shadow-lg transition-all">
                                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h3 className="font-playfair text-2xl">{lead.name}</h3>
                                                <span className={`text-[10px] tracking-widest uppercase px-3 py-1 font-semibold ${lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                                                    lead.status === 'contacted' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-green-50 text-green-600'
                                                    }`}>
                                                    {lead.status}
                                                </span>
                                                <select
                                                    value={lead.priority || 'medium'}
                                                    onChange={(e) => handleUpdateLead(lead.id, { priority: e.target.value as any })}
                                                    className={`text-[9px] tracking-widest uppercase font-bold border-none bg-transparent cursor-pointer focus:ring-0 ${lead.priority === 'high' ? 'text-red-500' : lead.priority === 'low' ? 'text-blue-400' : 'text-elf-gold'
                                                        }`}
                                                >
                                                    <option value="low">Low Priority</option>
                                                    <option value="medium">Medium Priority</option>
                                                    <option value="high">High Priority</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-inter text-elf-muted mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={14} className="text-elf-gold" /> {lead.email}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-elf-gold" /> {lead.phone || 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-elf-gold" /> {lead.event_type} • {lead.event_date || 'TBD'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className="text-elf-gold" /> Received {new Date(lead.created_at).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="bg-elf-cream p-6 border border-elf-border mb-6">
                                                <div className="text-[10px] tracking-widest uppercase text-elf-gold mb-2 font-semibold">Client Vision</div>
                                                <p className="text-sm italic text-elf-charcoal leading-relaxed">"{lead.vision}"</p>

                                                <div className="mt-8 pt-6 border-t border-elf-border/50">
                                                    <div className="text-[10px] tracking-widest uppercase text-elf-charcoal mb-3 font-bold flex items-center gap-2">
                                                        <ShieldAlert size={10} /> Internal Backstage Notes
                                                    </div>
                                                    <textarea
                                                        value={lead.internal_notes || ''}
                                                        onChange={(e) => setLeads(leads.map(l => l.id === lead.id ? { ...l, internal_notes: e.target.value } : l))}
                                                        onBlur={(e) => handleUpdateLead(lead.id, { internal_notes: e.target.value })}
                                                        placeholder="Add private office notes only you can see..."
                                                        className="w-full bg-white border border-elf-border p-4 text-xs font-inter focus:outline-none focus:border-elf-gold resize-none h-24"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:w-64 flex lg:flex-col justify-end gap-3">
                                            {lead.status !== 'contacted' && (
                                                <button
                                                    onClick={() => handleUpdateLead(lead.id, { status: 'contacted' })}
                                                    className="flex-1 py-3 border border-elf-border text-[10px] tracking-widest uppercase hover:bg-elf-warm transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Clock size={12} /> Mark Contacted
                                                </button>
                                            )}
                                            {lead.status !== 'converted' && (
                                                <button
                                                    onClick={() => handleUpdateLead(lead.id, { status: 'converted' })}
                                                    className="flex-1 py-3 bg-elf-gold text-white text-[10px] tracking-widest uppercase hover:bg-elf-gold-light transition-colors flex items-center justify-center gap-2 shadow-sm"
                                                >
                                                    <CheckCircle size={12} /> Mark Booked
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(lead.id)}
                                                className="w-12 py-3 border border-elf-border text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
