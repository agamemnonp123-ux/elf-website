'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    ArrowLeft, Loader2, Plus, Trash2, Edit3, Save,
    X, Camera, Users, Video, Globe, Phone, ExternalLink, Check
} from 'lucide-react';
import Link from 'next/link';
import { deleteFileByUrl } from '@/utils/storage';

interface Vendor {
    id: string;
    name: string;
    description: string;
    contact_info: string;
    website_url: string;
    video_url: string;
    services?: { id: string, title: string }[];
}

interface Service {
    id: string;
    title: string;
}

interface Asset {
    id: string;
    image_url: string;
    asset_type: 'image' | 'video';
}

export default function VendorsManagement() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [allServices, setAllServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingVendor, setEditingVendor] = useState<Partial<Vendor> | null>(null);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [uploading, setUploading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        const { data: vData } = await supabase.from('vendors').select('*').order('name');
        const { data: sData } = await supabase.from('services').select('id, title').order('title');

        if (vData) setVendors(vData);
        if (sData) setAllServices(sData);
        setLoading(false);
    };

    const fetchVendorDetails = async (vendorId: string) => {
        // Fetch linked services
        const { data: linkedData } = await supabase
            .from('vendor_services')
            .select('service_id')
            .eq('vendor_id', vendorId);

        if (linkedData) {
            setSelectedServices(linkedData.map(d => d.service_id));
        }

        // Fetch assets
        const { data: aData } = await supabase
            .from('assets')
            .select('*')
            .eq('reference_id', vendorId)
            .eq('reference_type', 'vendor');

        if (aData) setAssets(aData);
    };

    useEffect(() => {
        if (editingVendor?.id) {
            fetchVendorDetails(editingVendor.id);
        } else {
            setSelectedServices([]);
            setAssets([]);
        }
    }, [editingVendor?.id]);

    const handleSave = async () => {
        if (!editingVendor?.name) return;

        setLoading(true);
        // 1. Save vendor profile
        const { data: savedVendor, error: vError } = await supabase
            .from('vendors')
            .upsert(editingVendor)
            .select()
            .single();

        if (vError) {
            alert('Error saving vendor: ' + vError.message);
            setLoading(false);
            return;
        }

        // 2. Sync Many-to-Many relationships
        if (savedVendor) {
            // Remove old links
            await supabase.from('vendor_services').delete().eq('vendor_id', savedVendor.id);
            // Insert new links
            if (selectedServices.length > 0) {
                const links = selectedServices.map(sid => ({
                    vendor_id: savedVendor.id,
                    service_id: sid
                }));
                await supabase.from('vendor_services').insert(links);
            }
        }

        alert('Vendor profile synced successfully!');
        fetchInitialData();
        setEditingVendor(null);
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingVendor?.id || !e.target.files?.[0]) return;

        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `vendors/${editingVendor.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(filePath, file);

        if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filePath);

            await supabase.from('assets').insert({
                reference_type: 'vendor',
                reference_id: editingVendor.id,
                image_url: publicUrl,
                asset_type: 'image'
            });

            fetchVendorDetails(editingVendor.id);
        }
        setUploading(false);
    };

    const handleDeleteAsset = async (asset: Asset) => {
        const { error } = await supabase.from('assets').delete().eq('id', asset.id);
        if (!error && editingVendor?.id) {
            await deleteFileByUrl(asset.image_url);
            fetchVendorDetails(editingVendor.id);
        }
    };

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
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
                            <h1 className="font-playfair text-4xl font-medium">Partner Governance</h1>
                            <p className="text-elf-muted text-sm mt-2">Manage standalone vendor profiles and their service associations.</p>
                        </div>
                        {!editingVendor && (
                            <button
                                onClick={() => setEditingVendor({ name: '', description: '' })}
                                className="btn-gold flex items-center gap-2"
                            >
                                <Plus size={16} /> Add New Partner
                            </button>
                        )}
                    </div>

                    {editingVendor ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Details & Gallery */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white border border-elf-border p-8 md:p-12 shadow-sm">
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="font-playfair text-2xl">{editingVendor.id ? 'Refine Profile' : 'New Partner'}</h2>
                                        <button onClick={() => setEditingVendor(null)} className="text-elf-muted hover:text-elf-charcoal">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="label-xs">Vendor Name</label>
                                            <input
                                                value={editingVendor.name}
                                                onChange={e => setEditingVendor({ ...editingVendor, name: e.target.value })}
                                                className="input-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="label-xs">Description</label>
                                            <textarea rows={4} value={editingVendor.description} onChange={e => setEditingVendor({ ...editingVendor, description: e.target.value })} className="input-base resize-none" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="label-xs flex items-center gap-2"><Phone size={12} /> Contact Info</label>
                                                <input value={editingVendor.contact_info} onChange={e => setEditingVendor({ ...editingVendor, contact_info: e.target.value })} className="input-base" />
                                            </div>
                                            <div>
                                                <label className="label-xs flex items-center gap-2"><Globe size={12} /> Website URL</label>
                                                <input value={editingVendor.website_url} onChange={e => setEditingVendor({ ...editingVendor, website_url: e.target.value })} className="input-base" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="label-xs flex items-center gap-2"><Video size={12} /> Spotlight Video (YouTube/Vimeo Embed)</label>
                                            <input value={editingVendor.video_url} onChange={e => setEditingVendor({ ...editingVendor, video_url: e.target.value })} className="input-base" placeholder="https://..." />
                                        </div>

                                        <button onClick={handleSave} disabled={loading} className="btn-gold w-full py-4 flex items-center justify-center gap-2">
                                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                            Save Profile & Sync Logic
                                        </button>
                                    </div>
                                </div>

                                {editingVendor.id && (
                                    <div className="bg-white border border-elf-border p-8 md:p-12 shadow-sm">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="font-playfair text-xl">Portfolio Gallery</h3>
                                            <label className="cursor-pointer text-elf-gold hover:text-elf-charcoal transition-colors">
                                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                                                {uploading ? <Loader2 size={20} className="animate-spin" /> : <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold"><Camera size={16} /> Add Photo</span>}
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {assets.map(asset => (
                                                <div key={asset.id} className="relative group aspect-square bg-elf-warm border border-elf-border overflow-hidden">
                                                    <img src={asset.image_url} alt="Gallery" className="w-full h-full object-cover" />
                                                    <button onClick={() => handleDeleteAsset(asset)} className="absolute top-2 right-2 p-1 bg-white/90 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {assets.length === 0 && <div className="col-span-full py-8 text-center text-elf-muted text-sm italic">No images in this gallery yet.</div>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar: Categories */}
                            <div className="bg-white border border-elf-border p-8 shadow-sm h-fit">
                                <h3 className="font-playfair text-xl mb-6">Service Categories</h3>
                                <p className="text-xs text-elf-muted mb-6">Select all services this partner provides. This will link them to the respective service pages.</p>
                                <div className="space-y-2">
                                    {allServices.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => toggleService(s.id)}
                                            className={`w-full flex items-center justify-between p-4 border text-sm transition-all ${selectedServices.includes(s.id)
                                                    ? 'bg-elf-gold text-white border-elf-gold'
                                                    : 'border-elf-border hover:border-elf-gold'
                                                }`}
                                        >
                                            {s.title}
                                            {selectedServices.includes(s.id) && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {vendors.map(v => (
                                <div key={v.id} onClick={() => setEditingVendor(v)} className="bg-white border border-elf-border p-8 group hover:border-elf-gold transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-elf-warm flex items-center justify-center text-elf-gold">
                                            <Users size={24} />
                                        </div>
                                        <Edit3 size={16} className="text-elf-muted group-hover:text-elf-gold" />
                                    </div>
                                    <h3 className="font-playfair text-xl font-medium mb-2">{v.name}</h3>
                                    <p className="text-xs text-elf-muted line-clamp-2 mb-6">{v.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[9px] tracking-widest uppercase text-elf-gold font-bold bg-elf-gold/5 px-2 py-1">Featured Partner</span>
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
