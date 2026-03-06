import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, FileText, Layout, TrendingUp, ArrowRight } from 'lucide-react';

export default async function AdminDashboard() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // Verify admin role (simplified check for now)
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    // If not admin, redirect to client portal
    if (profile?.role !== 'admin' && user.email !== 'admin@elfevents.et') {
        // return redirect('/client/dashboard');
    }

    const stats = [
        { label: 'Total Leads', value: '24', icon: Users, color: 'bg-blue-50 text-blue-600' },
        { label: 'Active Projects', value: '12', icon: Layout, color: 'bg-purple-50 text-purple-600' },
        { label: 'Pending Bookings', value: '5', icon: FileText, color: 'bg-elf-gold/10 text-elf-gold' },
        { label: 'Monthly Revenue', value: '$45k', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    ];

    return (
        <main className="min-h-screen bg-elf-cream text-elf-charcoal">
            <Navbar />

            <section className="pt-40 pb-24 px-6 font-inter">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <span className="text-xs tracking-[0.2em] uppercase text-elf-gold font-semibold">Administrator</span>
                            <h1 className="font-playfair text-4xl font-medium mt-2">Executive Overview</h1>
                        </div>
                        <button className="btn-gold">Create New Project</button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white border border-elf-border p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${stat.color} flex items-center justify-center`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <span className="text-xs text-green-600 font-medium">+12%</span>
                                </div>
                                <div className="text-2xl font-playfair font-medium mb-1">{stat.value}</div>
                                <div className="text-xs tracking-widest uppercase text-elf-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Quick Management */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white border border-elf-border overflow-hidden">
                                <div className="p-6 border-b border-elf-border bg-elf-charcoal text-white flex justify-between items-center">
                                    <h3 className="font-playfair text-lg">Recent Inquiries</h3>
                                    <button className="text-xs tracking-widest uppercase text-elf-gold hover:text-white transition-colors">View All</button>
                                </div>
                                <div className="divide-y divide-elf-border">
                                    {[
                                        { name: 'Sarah Montgomery', date: 'Oct 12, 2024', type: 'Wedding', budget: '$50k+' },
                                        { name: 'Global Tech Corp', date: 'Dec 05, 2024', type: 'Corporate', budget: '$100k' },
                                        { name: 'David & Emily', date: 'Nov 20, 2024', type: 'Wedding', budget: '$25k' },
                                    ].map((lead, i) => (
                                        <div key={i} className="p-6 flex items-center justify-between hover:bg-elf-cream transition-colors group cursor-pointer">
                                            <div>
                                                <div className="font-medium text-elf-charcoal">{lead.name}</div>
                                                <div className="text-xs text-elf-muted flex gap-3 mt-1">
                                                    <span>{lead.type}</span>
                                                    <span className="opacity-50">•</span>
                                                    <span>{lead.date}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-elf-charcoal">{lead.budget}</div>
                                                <div className="text-[10px] tracking-widest uppercase text-elf-gold flex items-center gap-1 justify-end group-hover:gap-2 transition-all">
                                                    Review <ArrowRight size={10} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                        { label: 'Upload Photos', href: '/admin/photos' },
                                        { label: 'Lead Settings', href: '/admin/settings' },
                                        { label: 'Client Accounts', href: '/admin/users' },
                                    ].map(link => (
                                        <a key={link.label} href={link.href} className="flex items-center justify-between p-4 border border-elf-border hover:border-elf-gold hover:bg-elf-warm transition-all text-sm group">
                                            {link.label}
                                            <ArrowRight size={14} className="text-elf-gold group-hover:translate-x-1 transition-transform" />
                                        </a>
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
