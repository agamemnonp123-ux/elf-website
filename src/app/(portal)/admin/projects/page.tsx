'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { deleteFileByUrl } from '@/utils/storage';
import { Plus, Edit2, Trash2, Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    category: string;
    style: string;
    location: string;
    image_url: string;
    created_at: string;
}

export default function ProjectsManagement() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (project: Project) => {
        if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

        // 1. Delete record from database
        const { error: dbError } = await supabase
            .from('projects')
            .delete()
            .eq('id', project.id);

        if (dbError) {
            alert('Error deleting project: ' + dbError.message);
            return;
        }

        // 2. Cleanup physical file from storage (Silent failure is okay here)
        if (project.image_url) {
            await deleteFileByUrl(project.image_url);
        }

        setProjects(projects.filter(p => p.id !== project.id));
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
                            <h1 className="font-playfair text-4xl font-medium">Portfolio Management</h1>
                            <p className="text-elf-muted text-sm mt-2">Manage your showcased projects and stories.</p>
                        </div>
                        <Link href="/admin/projects/new" className="btn-gold flex items-center gap-2">
                            <Plus size={18} /> New Project
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 text-elf-muted">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="font-inter tracking-widest uppercase text-xs">Loading Projects...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-100 p-8 text-center text-red-600">
                            <p>{error}</p>
                            <button onClick={fetchProjects} className="mt-4 text-elf-gold underline">Try Again</button>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="bg-white border border-elf-border p-16 text-center">
                            <ImageIcon size={48} className="text-elf-border mx-auto mb-6" />
                            <h3 className="font-playfair text-xl mb-2">No Projects Found</h3>
                            <p className="text-elf-muted mb-8 max-w-sm mx-auto">Start by adding your first project to showcase in your portfolio.</p>
                            <Link href="/admin/projects/new" className="btn-gold">Create Your First Project</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white border border-elf-border overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <div className="relative h-48 bg-elf-warm overflow-hidden">
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-elf-muted/30">
                                                <ImageIcon size={40} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="text-[10px] tracking-widest uppercase bg-white/90 text-elf-charcoal px-3 py-1 font-semibold">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-playfair text-xl mb-1">{project.title}</h3>
                                        <div className="text-xs text-elf-muted tracking-widest uppercase mb-6">{project.style} • {project.location}</div>

                                        <div className="flex gap-3 pt-4 border-t border-elf-border">
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 border border-elf-border text-xs tracking-widest uppercase hover:bg-elf- warm hover:border-elf-gold transition-colors"
                                            >
                                                <Edit2 size={12} /> Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project)}
                                                className="w-12 flex items-center justify-center border border-elf-border text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
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
