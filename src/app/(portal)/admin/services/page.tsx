'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    ArrowLeft, Loader2, Plus, Sparkles, Trash2, Edit3, Save,
    X, Info, Image as ImageIcon, Users, ExternalLink, Camera, Video
} from 'lucide-react';
import Link from 'next/link';
import { deleteFileByUrl } from '@/utils/storage';

interface Vendor {
    id: string;
    name: string;
    description: string;
    contact_info: string;
}

interface Asset {
    id: string;
    image_url: string;
    reference_type: string;
    reference_id: string;
    asset_type: string;
}

interface Service {
    id: string;
    slug: string;
    title: string;
    emoji: string;
    icon_name: string;
    description: string;
    features: string[];
    is_essential: boolean;
    status: 'draft' | 'published';
}

export default function ServicesManagement() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [videoUrlInput, setVideoUrlInput] = useState('');

    // Vendor form state
    const [newVendor, setNewVendor] = useState<Partial<Vendor>>({ name: '', description: '' });

    const supabase = createClient();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchDetailData = async (serviceId: string) => {
        // Fetch vendors via join table
        const { data: vData } = await supabase
            .from('vendor_services')
            .select(`
                vendors (
                    id,
                    name,
                    description,
                    contact_info
                )
            `)
            .eq('service_id', serviceId);

        const { data: aData } = await supabase
            .from('assets')
            .select('*')
            .eq('reference_id', serviceId)
            .eq('reference_type', 'service');

        if (vData) setVendors(vData.map((d: any) => d.vendors));
        if (aData) setAssets(aData);
    };

    useEffect(() => {
        if (editingService?.id) {
            fetchDetailData(editingService.id);
        } else {
            setVendors([]);
            setAssets([]);
        }
    }, [editingService?.id]);

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
        // Sanitize features: trim and filter empty
        const sanitizedFeatures = editingService.features?.map(f => f.trim()).filter(f => f !== '') || [];

        const { data, error } = await supabase
            .from('services')
            .upsert({
                ...editingService,
                features: sanitizedFeatures,
                slug: editingService.slug.toLowerCase().replace(/\s+/g, '-'),
            })
            .select()
            .single();

        if (!error && data) {
            setEditingService(data);
            fetchServices();
            alert('Service saved successfully!');
        } else if (error) {
            alert('Error saving service: ' + error.message);
        }
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingService?.id || !e.target.files?.[0]) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `services/${editingService.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (uploadError) {
            alert('Error uploading to storage: ' + uploadError.message);
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filePath);

            const { error: insertError } = await supabase.from('assets').insert({
                reference_type: 'service',
                reference_id: editingService.id,
                image_url: publicUrl,
                asset_type: 'image'
            });

            if (insertError) {
                alert('Error recording asset: ' + insertError.message);
            } else {
                fetchDetailData(editingService.id);
            }
        }
        setUploading(false);
    };

    const handleAddVideoAsset = async () => {
        if (!editingService?.id || !videoUrlInput) return;

        await supabase.from('assets').insert({
            reference_type: 'service',
            reference_id: editingService.id,
            image_url: videoUrlInput,
            asset_type: 'video'
        });

        setVideoUrlInput('');
        fetchDetailData(editingService.id);
    };

    const handleAddVendor = async () => {
        if (!editingService?.id || !newVendor.name) return;

        // 1. Create vendor if it doesn't exist or just create a new one for this service
        const { data: vendor, error: vError } = await supabase
            .from('vendors')
            .insert(newVendor)
            .select()
            .single();

        if (!vError && vendor) {
            // 2. Link to service via join table
            const { error: linkError } = await supabase.from('vendor_services').insert({
                vendor_id: vendor.id,
                service_id: editingService.id
            });

            if (linkError) {
                alert('Error linking vendor: ' + linkError.message);
            } else {
                setNewVendor({ name: '', description: '' });
                fetchDetailData(editingService.id);
            }
        } else if (vError) {
            alert('Error adding vendor profile: ' + vError.message);
        }
    };

    const handleDeleteVendor = async (vendorId: string) => {
        if (!editingService?.id) return;

        // Remove just the link in M2M
        const { error } = await supabase
            .from('vendor_services')
            .delete()
            .eq('vendor_id', vendorId)
            .eq('service_id', editingService.id);

        if (!error) {
            fetchDetailData(editingService.id);
        } else {
            alert('Error removing partner link: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service category? This will also remove all its vendors and galleries.')) return;

        // 1. Fetch assets for cleanup
        const { data: assets } = await supabase.from('assets').select('image_url').eq('reference_id', id).eq('reference_type', 'service');

        // 2. Delete from DB
        const { error } = await supabase.from('services').delete().eq('id', id);

        if (!error) {
            // 3. Cleanup files
            if (assets) {
                for (const asset of assets) {
                    await deleteFileByUrl(asset.image_url);
                }
            }
            fetchServices();
        } else {
            alert('Error deleting service: ' + error.message);
        }
    };

    const handleDeleteAsset = async (asset: Asset) => {
        const { error } = await supabase.from('assets').delete().eq('id', asset.id);
        if (!error) {
            await deleteFileByUrl(asset.image_url);
            if (editingService?.id) fetchDetailData(editingService.id);
        }
    };

    const suggestContent = async () => {
        if (!editingService?.title) return;
        setIsGenerating(true);
        // Simulation as before
        setTimeout(() => {
            setEditingService(prev => ({
                ...prev,
                description: `Premium ${editingService.title} services tailored for luxury events. We coordinate with the finest partners to ensure every detail radiates excellence and artistic flair.`,
                features: [`Bespoke ${editingService.title} Design`, 'Partner Coordination', 'Luxury Logistics', 'Flawless Execution']
            }));
            setIsGenerating(false);
        }, 1000);
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
                            <p className="text-elf-muted text-sm mt-2">Manage categories, trusted vendors, and beautiful galleries.</p>
                        </div>
                        {!editingService && (
                            <button
                                onClick={() => setEditingService({ title: '', emoji: '✨', features: [], is_essential: true, status: 'draft' })}
                                className="btn-gold flex items-center gap-2"
                            >
                                <Plus size={16} /> Add New Service
                            </button>
                        )}
                    </div>

                    {editingService ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Details */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white border border-elf-border p-8 md:p-12 shadow-sm">
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
                                                <label className="label-xs">Symbol & Icon</label>
                                                <div className="flex gap-4">
                                                    <input value={editingService.emoji} onChange={e => setEditingService({ ...editingService, emoji: e.target.value })} className="input-base w-20 text-center text-xl" />
                                                    <input value={editingService.icon_name} onChange={e => setEditingService({ ...editingService, icon_name: e.target.value })} className="input-base flex-1" placeholder="Lucide Icon Name" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 bg-elf-cream border border-elf-border">
                                            <div className="flex-1">
                                                <label className="label-xs mb-1">Publication Status</label>
                                                <p className="text-[10px] text-elf-muted">Drafts are hidden from the public website.</p>
                                            </div>
                                            <select
                                                value={editingService.status || 'published'}
                                                onChange={e => setEditingService({ ...editingService, status: e.target.value as any })}
                                                className="bg-white border border-elf-border p-2 text-xs uppercase tracking-widest font-bold focus:outline-none focus:border-elf-gold"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </select>
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <label className="label-xs mb-0">Description</label>
                                                <button onClick={suggestContent} disabled={isGenerating} className="text-[10px] tracking-widest uppercase text-elf-gold font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                                    <Sparkles size={10} /> AI Suggest
                                                </button>
                                            </div>
                                            <textarea rows={4} value={editingService.description} onChange={e => setEditingService({ ...editingService, description: e.target.value })} className="input-base resize-none" />
                                        </div>

                                        <div>
                                            <label className="label-xs">Core Features (comma separated)</label>
                                            <input value={editingService.features?.join(', ')} onChange={e => setEditingService({ ...editingService, features: e.target.value.split(',').map(s => s.trim()) })} className="input-base" />
                                        </div>

                                        <button onClick={handleSave} disabled={loading} className="btn-gold w-full py-4 flex items-center justify-center gap-2">
                                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                            {editingService.id ? 'Update Service' : 'Initialize Service'}
                                        </button>
                                    </div>
                                </div>

                                {/* Gallery Section */}
                                {editingService.id && (
                                    <div className="bg-white border border-elf-border p-8 md:p-12 shadow-sm">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="font-playfair text-xl">Service Gallery</h3>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        value={videoUrlInput}
                                                        onChange={e => setVideoUrlInput(e.target.value)}
                                                        placeholder="YouTube/Vimeo Link"
                                                        className="text-[10px] bg-elf-warm border border-elf-border px-3 py-1.5 focus:outline-none focus:border-elf-gold w-32"
                                                    />
                                                    <button onClick={handleAddVideoAsset} className="text-elf-gold hover:text-elf-charcoal transition-colors">
                                                        <Video size={16} />
                                                    </button>
                                                </div>
                                                <label className="cursor-pointer text-elf-gold hover:text-elf-charcoal transition-colors">
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                                                    {uploading ? <Loader2 size={20} className="animate-spin" /> : <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold"><Camera size={16} /> Add Photo</span>}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {assets.map(asset => (
                                                <div key={asset.id} className="relative group aspect-square bg-elf-warm border border-elf-border overflow-hidden">
                                                    {asset.asset_type === 'video' ? (
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-elf-charcoal text-white gap-2">
                                                            <Video size={24} className="text-elf-gold" />
                                                            <span className="text-[8px] uppercase tracking-widest opacity-50">Video Link</span>
                                                        </div>
                                                    ) : (
                                                        <img src={asset.image_url} alt="Gallery" className="w-full h-full object-cover" />
                                                    )}
                                                    <button onClick={() => handleDeleteAsset(asset)} className="absolute top-2 right-2 p-1 bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {assets.length === 0 && <div className="col-span-full py-8 text-center text-elf-muted text-sm italic">No images in this gallery yet.</div>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar: Vendors */}
                            <div className="space-y-8">
                                {editingService.id ? (
                                    <div className="bg-white border border-elf-border p-8 shadow-sm">
                                        <h3 className="font-playfair text-xl mb-6 flex items-center gap-2"><Users size={20} className="text-elf-gold" /> Partner Vendors</h3>

                                        <div className="mb-8 p-6 bg-elf-cream border border-elf-border space-y-4">
                                            <input value={newVendor.name} onChange={e => setNewVendor({ ...newVendor, name: e.target.value })} placeholder="Vendor Name" className="text-xs w-full bg-white border border-elf-border p-3 focus:outline-none focus:border-elf-gold" />
                                            <textarea value={newVendor.description} onChange={e => setNewVendor({ ...newVendor, description: e.target.value })} placeholder="Short Description" className="text-xs w-full bg-white border border-elf-border p-3 focus:outline-none focus:border-elf-gold h-20 resize-none" />
                                            <button onClick={handleAddVendor} className="w-full text-[10px] tracking-widest uppercase bg-elf-charcoal text-white py-3 hover:bg-elf-gold transition-colors">Add Partner</button>
                                        </div>

                                        <div className="space-y-4">
                                            {vendors.map(v => (
                                                <div key={v.id} className="p-4 border border-elf-border flex justify-between items-start group">
                                                    <div>
                                                        <h4 className="font-playfair text-sm mb-1">{v.name}</h4>
                                                        <p className="text-[10px] text-elf-muted line-clamp-2">{v.description}</p>
                                                    </div>
                                                    <button onClick={() => handleDeleteVendor(v.id)} className="text-elf-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {vendors.length === 0 && <p className="text-xs text-elf-muted italic text-center py-4">No partners listed for this category.</p>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white border border-elf-border p-12 text-center">
                                        <ImageIcon size={32} className="text-elf-border mx-auto mb-4" />
                                        <p className="text-xs text-elf-muted leading-relaxed">Save the service details first to enable character and gallery management.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : loading ? (
                        <div className="py-24 flex justify-center text-elf-gold">
                            <Loader2 size={40} className="animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map(s => (
                                <div key={s.id} className="bg-white border border-elf-border p-8 group hover:border-elf-gold transition-all relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-4xl">{s.emoji}</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditingService(s)} className="p-2 text-elf-muted hover:text-elf-gold transition-colors">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(s.id)} className="p-2 text-elf-muted hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-playfair text-xl font-medium mb-3">{s.title}</h3>
                                    <p className="text-sm text-elf-muted line-clamp-2 leading-relaxed mb-6">{s.description}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-elf-border">
                                        <span className={`text-[9px] tracking-widest uppercase font-bold ${s.status === 'draft' ? 'text-amber-500' : 'text-elf-gold'}`}>
                                            {s.status === 'draft' ? 'Draft' : 'Published'}
                                        </span>
                                        <span className="text-[9px] tracking-widest uppercase text-elf-muted">{s.slug}</span>
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
