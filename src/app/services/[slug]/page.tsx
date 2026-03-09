'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    ArrowLeft, ArrowRight, Sparkles, Utensils, Brush, Camera,
    Music, Cake, Car, Star, Loader2, Heart, Shield, Users, Video
} from 'lucide-react';

const iconMap: Record<string, any> = {
    'Sparkles': Sparkles, 'Utensils': Utensils, 'Brush': Brush, 'Camera': Camera,
    'Music': Music, 'Cake': Cake, 'Car': Car, 'Heart': Heart, 'Shield': Shield,
};

export default function ServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const [data, setData] = useState<any>(null);
    const [vendors, setVendors] = useState<any[]>([]);
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchAll = async () => {
            const { data: service } = await supabase.from('services').select('*').eq('slug', slug).single();
            if (service) {
                setData(service);
                // Fetch vendors via join table
                const { data: vData } = await supabase
                    .from('vendor_services')
                    .select('vendors(*)')
                    .eq('service_id', service.id);

                // Fetch assets
                const { data: aData } = await supabase
                    .from('assets')
                    .select('*')
                    .eq('reference_id', service.id)
                    .eq('reference_type', 'service');

                if (vData) setVendors(vData.map((d: any) => d.vendors));
                if (aData) setAssets(aData);
            }
            setLoading(false);
        };
        fetchAll();
    }, [slug]);

    if (loading) return (
        <main className="min-h-screen bg-elf-cream flex flex-col items-center justify-center p-6 mt-20">
            <Navbar />
            <Loader2 size={40} className="animate-spin text-elf-gold font-bold" />
            <Footer />
        </main>
    );

    if (!data) return (
        <main className="min-h-screen bg-elf-cream flex flex-col items-center justify-center p-6 mt-20 font-inter">
            <Navbar />
            <h1 className="font-playfair text-4xl mb-4">Chapter Missing</h1>
            <Link href="/" className="btn-gold">Return to Haven</Link>
            <Footer />
        </main>
    );

    const HeroIcon = iconMap[data.icon_name] || Sparkles;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-48 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
                <div className="max-w-4xl mx-auto text-center relative">
                    <div className="w-20 h-20 bg-elf-gold/10 border border-elf-gold/30 flex items-center justify-center mx-auto mb-10 text-elf-gold shadow-2xl">
                        <HeroIcon size={40} strokeWidth={1} />
                    </div>
                    <span className="section-label mb-4 block tracking-[0.4em]">Official Selection</span>
                    <h1 className="font-playfair text-6xl md:text-8xl text-white font-medium mb-8 uppercase tracking-wider">{data.title}</h1>
                    <div className="w-24 h-px bg-elf-gold mx-auto mb-10" />
                    <p className="font-inter text-white/40 text-xl leading-relaxed max-w-2xl mx-auto italic">{data.description}</p>
                </div>
            </section>

            {/* Gallery Section */}
            {assets.length > 0 && (
                <section className="py-32 px-6 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-16">
                            <div>
                                <span className="section-label">Aesthetic Capture</span>
                                <h2 className="font-playfair text-4xl mt-2">The Gallery</h2>
                            </div>
                            <Star size={24} className="text-elf-gold/20" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {assets.map((asset, i) => (
                                <div key={asset.id} className={`group relative overflow-hidden bg-elf-cream animate-fade-in ${i % 3 === 1 ? 'md:mt-12' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="aspect-[3/4] overflow-hidden">
                                        {asset.asset_type === 'video' ? (
                                            <iframe
                                                src={asset.image_url.replace('watch?v=', 'embed/')}
                                                className="w-full h-full"
                                                allowFullScreen
                                                title="Gallery Video"
                                            />
                                        ) : (
                                            <img src={asset.image_url} alt="Gallery item" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        )}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-elf-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-between pointer-events-none">
                                        <div className="w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-white">
                                            {asset.asset_type === 'video' ? <Video size={14} /> : <Camera size={14} />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Features & Vendors */}
            <section className="py-32 px-6 bg-elf-warm border-t border-elf-border">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        {/* Features List */}
                        <div className="space-y-16">
                            <div>
                                <span className="section-label mb-2 block">Curation Strategy</span>
                                <h2 className="font-playfair text-4xl mb-8 border-b border-elf-border pb-6">What We Deliver</h2>
                                <p className="font-inter text-elf-muted leading-relaxed text-lg">Every element is selected for its ability to weave a cohesive and luxurious story. Our {data.title} approach focuses on the intersection of technical excellence and artistic vision.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {data.features?.map((f: string) => (
                                    <div key={f} className="flex items-center gap-6 p-6 border-l-4 border-elf-gold bg-white shadow-sm hover:translate-x-2 transition-all duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-elf-gold" />
                                        <span className="font-inter text-sm tracking-[0.15em] text-elf-charcoal uppercase font-semibold">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vendors List */}
                        <div className="bg-white border border-elf-border p-12 relative">
                            <div className="absolute top-0 right-0 p-8">
                                <Users size={40} className="text-elf-gold/10" />
                            </div>
                            <span className="section-label text-elf-gold mb-2 block">Trusted Partners</span>
                            <h2 className="font-playfair text-3xl mb-10">Our Elite Vendors</h2>

                            <div className="space-y-12">
                                {vendors.map(v => (
                                    <div key={v.id} className="group border-b border-elf-border pb-8 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-center mb-3">
                                            <Link href={`/vendors/${v.id}`} className="hover:text-elf-gold transition-colors">
                                                <h4 className="font-playfair text-xl">{v.name}</h4>
                                            </Link>
                                            <Star size={14} className="text-elf-gold fill-elf-gold" />
                                        </div>
                                        <p className="font-inter text-sm text-elf-muted leading-relaxed mb-4">{v.description}</p>
                                        <div className="text-[10px] tracking-[0.3em] uppercase text-elf-gold font-bold">Exclusive Partner</div>
                                    </div>
                                ))}
                                {vendors.length === 0 && <p className="font-inter text-sm text-elf-muted italic py-4">Inquire to see our full list of vetted partner vendors for {data.title}.</p>}
                            </div>

                            <div className="mt-16 pt-10 border-t border-elf-border">
                                <Link href="/contact" className="btn-gold w-full text-center">Inquire for Private Concierge <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
