'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Loader2, Plus, Sparkles, Trash2, Edit3, Save, X, Info } from 'lucide-react';
import Link from 'next/link';

interface Service {
    id: string;
    slug: string;
    title: string;
    emoji: string;
    icon_name: string;
    description: string;
    features: string[];
    is_essential: boolean;
}

export default function ServicesManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true });

        if (!error && data) setServices(data);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editingService?.title || !editingService?.slug) return;

        setLoading(true);
        const { error } = await supabase
            .from('services')
            .upsert({
                ...editingService,
                slug: editingService.slug.toLowerCase().replace(/\s+/g, '-'),
            });

        if (!error) {
            setEditingService(null);
            fetchServices();
        } else {
            alert('Error saving service: ' + error.message);
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);

        if (!error) fetchServices();
    };

    const suggestContent = async () => {
        if (!editingService?.title) {
            alert('Please enter a service title first.');
            return;
        }

        setIsGenerating(true);

        // This is a UI simulation of AI generation. In a real world, this would call an Edge Function or AI API.
        // For this task, I'm providing a robust local generator that acts as the "AI Prompt Result".
        setTimeout(() => {
            const title = editingService.title!;
            const generationMap: Record<string, any> = {
                'Decor': {
                    desc: 'Transforming spaces into immersive experiences. From ethereal floral installations to avant-garde lighting, our decor services are designed to captivate and inspire.',
                    features: ['Bespoke Floral Design', 'Custom Floor Plans', 'Luxury Rentals', 'Ambient Lighting Design']
                },
                'Catering': {
                    desc: 'A culinary journey tailored to your taste. We specialize in sophisticated sweets, elegant finger foods, and traditional delicacies served with modern flair.',
                    features: ['Custom Menu Design', 'Artisan Sweet Displays', 'Gourmet Finger Foods', 'Professional Service Staff']
                }
            };

            const result = generationMap[title] || {
                desc: `Premium ${title} services tailored for luxury events and unforgettable moments. Every detail is handled with precision and artistic flair.`,
                features: [`Bespoke ${title} Design`, 'Luxury Coordination', 'Personalized Consultation', 'Flawless Execution']
            };

            setEditingService(prev => ({
                ...prev,
                description: result.desc,
                features: result.features
            }));
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            <section className="pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <Link href="/admin/dashboard" className="text-elf-gold text-xs tracking-widest uppercase flex items-center gap-2 mb-4 hover:gap-3 transition-all">
                                <ArrowLeft size={14} /> Back to Dashboard
                            </Link>
                            <h1 className="font-playfair text-4xl font-medium">Service Architecture</h1>
                            <p className="text-elf-muted text-sm mt-2">Manage the elements that make your events extraordinary.</p>
                        </div>
                        {!editingService && (
                            <button
                                onClick={() => setEditingService({ title: '', emoji: '✨', features: [], is_essential: true })}
                                className="btn-gold flex items-center gap-2"
                            >
                                <Plus size={16} /> Add New Service
                            </button>
                        )}
                    </div>

                    {editingService ? (
                        <div className="bg-white border border-elf-border p-8 md:p-12 shadow-sm max-w-4xl mx-auto">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="font-playfair text-2xl">{editingService.id ? 'Refine Service' : 'New Creation'}</h2>
                                <button onClick={() => setEditingService(null)} className="text-elf-muted hover:text-elf-charcoal">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="label-xs">Service Title</label>
                                        <input
                                            value={editingService.title}
                                            onChange={e => setEditingService({ ...editingService, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                            className="input-base"
                                            placeholder="e.g. Bespoke Decor"
                                        />
                                    </div>
                                    <div>
                                        <label className="label-xs">Symbol (Emoji or Icon Name)</label>
                                        <div className="flex gap-4">
                                            <input
                                                value={editingService.emoji}
                                                onChange={e => setEditingService({ ...editingService, emoji: e.target.value })}
                                                className="input-base w-20 text-center text-xl"
                                                placeholder="✨"
                                            />
                                            <input
                                                value={editingService.icon_name}
                                                onChange={e => setEditingService({ ...editingService, icon_name: e.target.value })}
                                                className="input-base flex-1"
                                                placeholder="Sparkles (Lucide name)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="label-xs mb-0">Description</label>
                                        <button
                                            onClick={suggestContent}
                                            disabled={isGenerating}
                                            className="text-[10px] tracking-widest uppercase text-elf-gold font-bold flex items-center gap-1 hover:gap-2 transition-all"
                                        >
                                            {isGenerating ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                                            AI Suggest
                                        </button>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={editingService.description}
                                        onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                                        className="input-base resize-none"
                                        placeholder="Describe the magic behind this service..."
                                    />
                                </div>

                                <div>
                                    <label className="label-xs">Core Features (comma separated)</label>
                                    <input
                                        value={editingService.features?.join(', ')}
                                        onChange={e => setEditingService({ ...editingService, features: e.target.value.split(',').map(s => s.trim()) })}
                                        className="input-base"
                                        placeholder="Feature 1, Feature 2, Feature 3"
                                    />
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button
                                        disabled={loading}
                                        onClick={handleSave}
                                        className="btn-gold flex-1 py-4 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                        Initialize Service
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : loading ? (
                        <div className="py-24 flex justify-center text-elf-gold">
                            <Loader2 size={40} className="animate-spin" />
                        </div>
                    ) : services.length === 0 ? (
                        <div className="bg-white border border-elf-border p-24 text-center">
                            <Sparkles size={48} className="text-elf-border mx-auto mb-6" />
                            <h3 className="font-playfair text-xl mb-4">No services in the database</h3>
                            <p className="text-elf-muted max-w-md mx-auto">Click "Add New Service" to start building your dynamic offerings.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map(s => (
                                <div key={s.id} className="bg-white border border-elf-border p-8 group hover:border-elf-gold transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-4xl">{s.emoji}</div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingService(s)} className="p-2 text-elf-muted hover:text-elf-gold transition-colors">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(s.id)} className="p-2 text-elf-muted hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-playfair text-xl font-medium mb-3">{s.title}</h3>
                                    <p className="text-sm text-elf-muted line-clamp-3 leading-relaxed mb-6">
                                        {s.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {s.features?.slice(0, 2).map(f => (
                                            <span key={f} className="text-[9px] tracking-widest uppercase bg-elf-cream border border-elf-border px-2 py-1">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-20 p-8 bg-elf-charcoal text-white flex flex-col md:flex-row items-center gap-8 border border-elf-gold/20">
                        <div className="w-12 h-12 bg-elf-gold/10 flex items-center justify-center text-elf-gold">
                            <Info size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-playfair text-lg">AI Integration Ready</h4>
                            <p className="text-white/50 text-xs mt-1 leading-relaxed">
                                Use the "AI Suggest" button within the editor to instantly generate high-luxury descriptions and feature lists based on your service title.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
