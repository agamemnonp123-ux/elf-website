'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, FileText, Layout, TrendingUp, ArrowRight, Loader2, Mail, Calendar, LogOut } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

interface Lead {
    id: string;
    name: string;
    email: string;
    event_type: string;
    created_at: string;
    budget: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState([
        { label: 'Total Leads', value: '...', icon: Users, color: 'bg-blue-50 text-blue-600' },
        { label: 'Active Projects', value: '...', icon: Layout, color: 'bg-purple-50 text-purple-600' },
        { label: 'Inquiries', value: '...', icon: FileText, color: 'bg-elf-gold/10 text-elf-gold' },
        { label: 'Total Users', value: '...', icon: Users, color: 'bg-green-50 text-green-600' },
    ]);
    const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        // Fetch Leads
        const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });

        // Fetch Projects
        const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });

        // Fetch Recent Leads
        const { data: leads } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        // Fetch Profiles (Users)
        const { count: profilesCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

        setStats([
            { label: 'Total Leads', value: (leadsCount || 0).toString(), icon: Users, color: 'bg-blue-50 text-blue-600' },
            { label: 'Projects', value: (projectsCount || 0).toString(), icon: Layout, color: 'bg-purple-50 text-purple-600' },
            { label: 'Support Inquiries', value: '0', icon: Mail, color: 'bg-elf-gold/10 text-elf-gold' },
            { label: 'Registered Clients', value: (profilesCount || 0).toString(), icon: Users, color: 'bg-green-50 text-green-600' },
        ]);

        setRecentLeads(leads || []);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-elf-cream text-elf-charcoal">
            <Navbar />

            <section className="pt-40 pb-24 px-6 font-inter">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <span className="text-xs tracking-[0.2em] uppercase text-elf-gold font-semibold text-animate">Administrator</span>
                            <h1 className="font-playfair text-4xl font-medium mt-2">Executive Overview</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin/projects/new" className="btn-gold">Create New Project</Link>
                            <div className="w-px h-6 bg-elf-border hidden md:block" />
                            <LogoutButton className="text-[10px] font-inter font-medium tracking-widest uppercase text-elf-muted hover:text-red-400 transition-colors" />
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white border border-elf-border p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.color} flex items-center justify-center`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <span className="text-xs text-green-600 font-medium">Live</span>
                                </div>
                                <div className="text-2xl font-playfair font-medium mb-1">
                                    {loading ? <Loader2 className="animate-spin text-elf-gold" size={20} /> : stat.value}
                                </div>
                                <div className="text-xs tracking-widest uppercase text-elf-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Recent Inquiries */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white border border-elf-border overflow-hidden">
                                <div className="p-6 border-b border-elf-border bg-elf-charcoal text-white flex justify-between items-center">
                                    <h3 className="font-playfair text-lg">Recent Inquiries</h3>
                                    <Link href="/admin/leads" className="text-xs tracking-widest uppercase text-elf-gold hover:text-white transition-colors">View All</Link>
                                </div>
                                <div className="divide-y divide-elf-border">
                                    {loading ? (
                                        <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-elf-gold" /></div>
                                    ) : recentLeads.length === 0 ? (
                                        <div className="p-12 text-center text-elf-muted italic">No inquiries yet.</div>
                                    ) : (
                                        recentLeads.map((lead) => (
                                            <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="p-6 flex items-center justify-between hover:bg-elf-cream transition-colors group cursor-pointer">
                                                <div>
                                                    <div className="font-medium text-elf-charcoal">{lead.name}</div>
                                                    <div className="text-xs text-elf-muted flex gap-3 mt-1">
                                                        <span>{lead.event_type}</span>
                                                        <span className="opacity-50">•</span>
                                                        <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium text-elf-charcoal">{lead.budget}</div>
                                                    <div className="text-[10px] tracking-widest uppercase text-elf-gold flex items-center gap-1 justify-end group-hover:gap-2 transition-all">
                                                        View Details <ArrowRight size={10} />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CMS Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-white border border-elf-border p-8">
                                <h3 className="font-playfair text-xl mb-6">CMS Controls</h3>
                                <nav className="space-y-2">
                                    {[
                                        { label: 'Manage Portfolio', href: '/admin/projects' },
                                        { label: 'Service Architecture', href: '/admin/services' },
                                        { label: 'Client Inquiries', href: '/admin/leads' },
                                        { label: 'System Settings', href: '/admin/settings' },
                                        { label: 'Client Database', href: '/admin/users' },
                                    ].map(link => (
                                        <Link key={link.label} href={link.href} className="flex items-center justify-between p-4 border border-elf-border hover:border-elf-gold hover:bg-elf-warm transition-all text-sm group">
                                            {link.label}
                                            <ArrowRight size={14} className="text-elf-gold group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
