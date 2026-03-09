'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    ArrowLeft, Camera, Video, Star, Users,
    Loader2, ExternalLink, Mail, ShieldCheck, Heart
} from 'lucide-react';

export default function VendorProfilePage() {
    const params = useParams();
    const id = params.id as string;
    const [vendor, setVendor] = useState<any>(null);
    const [assets, setAssets] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchVendorData = async () => {
            // 1. Fetch main vendor info
            const { data: vData } = await supabase
                .from('vendors')
                .select('*')
                .eq('id', id)
                .single();

            if (vData) {
                setVendor(vData);

                // 2. Fetch vendor assets (gallery)
                const { data: aData } = await supabase
                    .from('assets')
                    .select('*')
                    .eq('reference_id', id)
                    .eq('reference_type', 'vendor');
                if (aData) setAssets(aData);

                // 3. Fetch categories this vendor belongs to
                const { data: sData } = await supabase
                    .from('vendor_services')
                    .select('services(*)')
                    .eq('vendor_id', id);
                if (sData) setServices(sData.map((d: any) => d.services));
            }
            setLoading(false);
        };
        fetchVendorData();
    }, [id]);

    if (loading) return (
        <main className="min-h-screen bg-elf-cream flex items-center justify-center pt-20">
            <Navbar />
            <Loader2 size={40} className="animate-spin text-elf-gold" />
            <Footer />
        </main>
    );

    if (!vendor) return (
        <main className="min-h-screen bg-elf-cream flex flex-col items-center justify-center p-6 mt-20">
            <Navbar />
            <h1 className="font-playfair text-4xl mb-4 text-elf-charcoal uppercase tracking-widest">Partner Not Found</h1>
            <Link href="/" className="btn-gold">Return to Haven</Link>
            <Footer />
        </main>
    );

    return (
        <main className="min-h-screen bg-white font-inter">
            <Navbar />

            {/* Hero Header */}
            <section className="pt-48 pb-24 px-6 bg-elf-charcoal relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
                <div className="max-w-4xl mx-auto relative">
                    <div className="flex justify-center mb-10">
                        <div className="w-24 h-24 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center text-elf-gold shadow-2xl rounded-full overflow-hidden">
                            <Users size={40} strokeWidth={1} />
                        </div>
                    </div>
                    <span className="section-label mb-4 block tracking-[0.4em] text-elf-gold">Vetted Elite Partner</span>
                    <h1 className="font-playfair text-5xl md:text-7xl text-white font-medium mb-8 uppercase tracking-tighter">
                        {vendor.name}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {services.map(s => (
                            <Link key={s.id} href={`/services/${s.slug}`} className="text-[10px] tracking-widest uppercase py-1.5 px-4 bg-white/5 border border-white/10 text-white/60 hover:border-elf-gold hover:text-elf-gold transition-all">
                                {s.emoji} {s.title}
                            </Link>
                        ))}
                    </div>
                    <div className="w-16 h-px bg-elf-gold/30 mx-auto" />
                </div>
            </section>

            <section className="py-24 px-6 border-b border-elf-border">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Sidebar: Details */}
                        <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
                            <div>
                                <h2 className="font-playfair text-2xl mb-6">Partner Vision</h2>
                                <p className="text-elf-muted leading-relaxed italic text-lg opacity-80">
                                    "{vendor.description}"
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-elf-cream border border-elf-border">
                                    <h3 className="text-[10px] tracking-widest uppercase text-elf-gold font-bold mb-4">Official Contact</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-elf-charcoal overflow-hidden ">
                                            <Mail size={16} className="text-elf-gold shrink-0" />
                                            <span className="truncate">{vendor.contact_info || 'Exclusive Elf Partner'}</span>
                                        </div>
                                        {vendor.website_url && (
                                            <a href={vendor.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-elf-charcoal hover:text-elf-gold transition-all">
                                                <ExternalLink size={16} className="text-elf-gold shrink-0" />
                                                <span>Visit Official Presence</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 border border-elf-border flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                                            <ShieldCheck size={16} />
                                        </div>
                                        <span className="text-[10px] tracking-widest uppercase font-bold text-elf-charcoal">Verified Quality</span>
                                    </div>
                                    <div className="flex gap-1 text-elf-gold">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link href="/contact" className="btn-gold w-full text-center py-5">
                                    Inquire for {vendor.name} <Heart size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Main Content: Gallery / Video */}
                        <div className="lg:col-span-8 space-y-20 order-1 lg:order-2">
                            {/* Video Section */}
                            {vendor.video_url && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-elf-gold/5 border border-elf-gold/20 flex items-center justify-center text-elf-gold">
                                            <Video size={20} strokeWidth={1} />
                                        </div>
                                        <h3 className="font-playfair text-3xl">Cinematic Presence</h3>
                                    </div>
                                    <div className="aspect-video bg-elf-charcoal border border-elf-border overflow-hidden group relative">
                                        <iframe
                                            src={vendor.video_url.replace('watch?v=', 'embed/')}
                                            className="w-full h-full"
                                            allowFullScreen
                                            title="Vendor Showcase"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Gallery Section */}
                            <div className="space-y-12">
                                <div className="flex justify-between items-end border-b border-elf-border pb-8">
                                    <div>
                                        <h3 className="font-playfair text-3xl">Curated Portfolio</h3>
                                        <p className="text-elf-muted text-xs tracking-widest uppercase mt-2">Visual legacy of exquisite excellence</p>
                                    </div>
                                    <Camera size={24} className="text-elf-gold/30" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {assets.map((asset, i) => (
                                        <div key={asset.id} className={`group relative bg-elf-cream overflow-hidden border border-elf-border ${i % 3 === 1 ? 'md:mt-12' : ''}`}>
                                            {asset.asset_type === 'video' ? (
                                                <div className="aspect-[4/5] bg-elf-charcoal relative">
                                                    <iframe
                                                        src={asset.image_url.replace('watch?v=', 'embed/')}
                                                        className="w-full h-full"
                                                        allowFullScreen
                                                        title="Gallery Video"
                                                    />
                                                    <div className="absolute top-4 right-4 w-8 h-8 bg-elf-gold flex items-center justify-center text-white shadow-lg pointer-events-none">
                                                        <Video size={14} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <img src={asset.image_url} alt="Portfolio item" className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-elf-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    {assets.length === 0 && (
                                        <div className="col-span-full py-24 text-center border-2 border-dashed border-elf-border text-elf-muted italic text-sm">
                                            Private portfolio available upon inquiry.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
