'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            setError(loginError.message);
            setLoading(false);
            return;
        }

        router.push('/client/dashboard');
    };

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            <section className="pt-40 pb-24 px-6 flex items-center justify-center">
                <div className="w-full max-w-md bg-white border border-elf-border p-10 shadow-sm">
                    <div className="text-center mb-10">
                        <span className="section-label">Welcome Back</span>
                        <h1 className="font-playfair text-4xl font-medium text-elf-charcoal mt-4">Client Portal</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-elf-muted" size={16} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-elf-border bg-elf-cream pl-12 pr-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-inter text-xs tracking-widest uppercase text-elf-muted block mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-elf-muted" size={16} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-elf-border bg-elf-cream pl-12 pr-4 py-3 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-inter">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-gold py-4 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Logging in... <Loader2 size={16} className="animate-spin" /></>
                            ) : (
                                <>Access Portal <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="font-inter text-sm text-elf-muted">
                            Don't have an account? Contact your planner to get invited.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
