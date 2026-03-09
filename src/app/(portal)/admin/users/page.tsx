'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Loader2, User, Shield, ShieldAlert, Trash2, Mail, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Profile {
    id: string;
    full_name: string;
    role: string;
    created_at: string;
    email?: string;
}

export default function UsersManagement() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setProfiles(data || []);
        }
        setLoading(false);
    };

    const handleRoleChange = async (id: string, newRole: string) => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', id);

        if (error) {
            alert('Error updating role: ' + error.message);
        } else {
            setProfiles(profiles.map(p => p.id === id ? { ...p, role: newRole } : p));
        }
    };

    const handleDeleteUser = async (profile: Profile) => {
        if (!confirm(`Are you sure you want to remove the profile for "${profile.full_name || 'Anonymous'}"?`)) return;

        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', profile.id);

        if (error) {
            alert('Error deleting profile: ' + error.message);
        } else {
            setProfiles(profiles.filter(p => p.id !== profile.id));
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
                        <h1 className="font-playfair text-4xl font-medium">Client Database</h1>
                        <p className="text-elf-muted text-sm mt-2">Manage registered accounts and permissions.</p>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-elf-gold">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="font-inter tracking-widest uppercase text-xs text-elf-muted">Loading Accounts...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center text-red-500 bg-white border border-elf-border">
                            {error}
                        </div>
                    ) : (
                        <div className="bg-white border border-elf-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-elf-charcoal text-white font-playfair uppercase text-[10px] tracking-widest">
                                            <th className="px-8 py-4">Client</th>
                                            <th className="px-8 py-4">Role</th>
                                            <th className="px-8 py-4">Joined</th>
                                            <th className="px-8 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-elf-border font-inter text-sm">
                                        {profiles.map((profile) => (
                                            <tr key={profile.id} className="hover:bg-elf-cream transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-elf-warm flex items-center justify-center">
                                                            <User size={18} className="text-elf-gold" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-elf-charcoal">{profile.full_name || 'Anonymous Client'}</div>
                                                            <div className="text-xs text-elf-muted">{profile.id.substring(0, 8)}...</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest uppercase font-semibold ${profile.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'
                                                        }`}>
                                                        {profile.role === 'admin' ? <Shield size={10} /> : <User size={10} />}
                                                        {profile.role}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-elf-muted text-xs">
                                                    {new Date(profile.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {profile.role === 'admin' ? (
                                                            <button
                                                                onClick={() => handleRoleChange(profile.id, 'client')}
                                                                className="px-4 py-2 border border-elf-border text-[9px] tracking-widest uppercase hover:bg-elf-warm transition-colors"
                                                            >
                                                                Make Client
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleRoleChange(profile.id, 'admin')}
                                                                className="px-4 py-2 border border-elf-border text-[9px] tracking-widest uppercase hover:text-elf-gold transition-colors"
                                                            >
                                                                Promote to Admin
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteUser(profile)}
                                                            className="p-2 text-red-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
