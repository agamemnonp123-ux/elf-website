'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, X, Upload } from 'lucide-react';
import Link from 'next/link';

interface ProjectForm {
    title: string;
    category: string;
    style: string;
    location: string;
    image_url: string;
}

const CATEGORIES = ['Wedding', 'Corporate', 'Destination', 'Social'];

export default function ProjectEditor({ id }: { id?: string }) {
    const router = useRouter();
    const supabase = createClient();
    const isEditing = !!id;

    const [form, setForm] = useState<ProjectForm>({
        title: '',
        category: 'Wedding',
        style: '',
        location: '',
        image_url: '',
    });

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            setError(error.message);
        } else {
            setForm(data);
        }
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading image: ' + uploadError.message);
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filePath);

            setForm({ ...form, image_url: publicUrl });
        }
        setUploading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const { error: saveError } = isEditing
            ? await supabase.from('projects').update(form).eq('id', id)
            : await supabase.from('projects').insert([form]);

        if (saveError) {
            setError(saveError.message);
            setSaving(false);
        } else {
            router.push('/admin/projects');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-elf-cream flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-elf-gold" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-elf-cream">
            <Navbar />

            <section className="pt-40 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <Link href="/admin/projects" className="text-elf-gold text-xs tracking-widest uppercase flex items-center gap-2 mb-8 hover:gap-3 transition-all">
                        <ArrowLeft size={14} /> Back to Projects
                    </Link>

                    <h1 className="font-playfair text-4xl font-medium mb-12">
                        {isEditing ? 'Edit Story' : 'New Story'}
                    </h1>

                    <form onSubmit={handleSave} className="space-y-8 bg-white border border-elf-border p-10 shadow-sm transition-all duration-300 hover:shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="form-label">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="form-input"
                                    placeholder="e.g., Meron & Dawit"
                                />
                            </div>

                            <div>
                                <label className="form-label">Category</label>
                                <select
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                    className="form-input"
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="form-label">Style</label>
                                <input
                                    required
                                    type="text"
                                    value={form.style}
                                    onChange={e => setForm({ ...form, style: e.target.value })}
                                    className="form-input"
                                    placeholder="e.g., Modern Luxe"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="form-label">Location</label>
                                <input
                                    required
                                    type="text"
                                    value={form.location}
                                    onChange={e => setForm({ ...form, location: e.target.value })}
                                    className="form-input"
                                    placeholder="e.g., Sheraton Addis"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="form-label">Featured Image</label>
                                {form.image_url ? (
                                    <div className="relative group rounded-lg overflow-hidden border border-elf-border">
                                        <img src={form.image_url} alt="Preview" className="w-full h-64 object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <label className="cursor-pointer bg-white text-elf-charcoal px-4 py-2 rounded-full text-xs font-semibold hover:bg-elf-gold hover:text-white transition-all flex items-center gap-2">
                                                <Upload size={14} /> Change
                                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, image_url: '' })}
                                                className="bg-white text-red-500 px-4 py-2 rounded-full text-xs font-semibold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                                            >
                                                <X size={14} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-elf-border bg-elf-cream rounded-lg cursor-pointer hover:border-elf-gold transition-all group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {uploading ? (
                                                <Loader2 size={32} className="text-elf-gold animate-spin mb-4" />
                                            ) : (
                                                <ImageIcon size={32} className="text-elf-muted group-hover:text-elf-gold mb-4 transition-colors" />
                                            )}
                                            <p className="mb-2 text-sm text-elf-muted font-inter">
                                                <span className="font-semibold text-elf-charcoal group-hover:text-elf-gold transition-colors">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-elf-muted uppercase tracking-widest font-medium">PNG, JPG or WEBP (MAX. 5MB)</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-inter">
                                {error}
                            </div>
                        )}

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={saving || uploading}
                                className="w-full btn-gold py-5 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:transform-none"
                            >
                                {saving ? (
                                    <>Saving Changes... <Loader2 size={18} className="animate-spin" /></>
                                ) : (
                                    <>Save {isEditing ? 'Project' : 'New Project'} <Save size={18} /></>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <style jsx>{`
                .form-label {
                    @apply font-inter text-xs tracking-widest uppercase text-elf-muted block mb-3 font-semibold;
                }
                .form-input {
                    @apply w-full border border-elf-border bg-elf-cream px-5 py-4 font-inter text-sm text-elf-charcoal focus:outline-none focus:border-elf-gold transition-all;
                }
                select.form-input {
                    @apply appearance-none;
                }
            `}</style>

            <Footer />
        </main>
    );
}
