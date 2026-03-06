import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const packages = [
    {
        name: 'Full Planning',
        tagline: 'The Complete Journey',
        duration: '12+ months',
        ideal: 'Couples who want a fully curated, stress-free experience from day one.',
        highlights: [
            'Venue scouting & contract review',
            'Full vendor curation & management',
            'Bespoke design concept & mood board',
            'Budget management & tracking',
            'Master timeline creation',
            'RSVP & guest management',
            'Rehearsal coordination',
            'Full day-of execution team',
        ],
        featured: false,
    },
    {
        name: 'Partial Planning',
        tagline: 'The Perfect Partnership',
        duration: '6 months',
        ideal: 'Couples who have a head start and need expert guidance to bring it all together.',
        highlights: [
            'Vendor recommendations & meetings',
            'Design refinement & styling',
            'Timeline & logistics finalization',
            'Month-of coordination',
            'Rehearsal management',
            'Day-of execution support',
            'Budget review & adjustments',
            'Vendor confirmation calls',
        ],
        featured: true,
    },
    {
        name: 'Day-of Coordination',
        tagline: 'Seamless Execution',
        duration: '4 weeks',
        ideal: 'Couples who are fully planned and need a professional to execute flawlessly.',
        highlights: [
            'Vendor confirmation & briefing',
            'Detailed run-of-show creation',
            'Rehearsal coordination',
            'Full day-of lead coordinator',
            'Vendor point of contact',
            'Issue resolution & contingency',
            'Setup supervision',
            'Post-event wrap coordination',
        ],
        featured: false,
    },
    {
        name: 'Design Only',
        tagline: 'Pure Aesthetic Vision',
        duration: 'Custom',
        ideal: 'Couples who have their logistics sorted and need a design visionary.',
        highlights: [
            'Custom mood boards',
            'Color palette development',
            'Décor sourcing & curation',
            'Floral concept design',
            'Stationery direction',
            'Lighting plan',
            'Setup supervision',
            'Style guide document',
        ],
        featured: false,
    },
];

const corporateServices = [
    { icon: '◈', title: 'Product Launches', desc: 'Brand-first events that create lasting impressions and media coverage.' },
    { icon: '◇', title: 'Gala Dinners', desc: 'Sophisticated evenings designed around your brand identity and guests.' },
    { icon: '✦', title: 'Brand Activations', desc: 'Immersive experiences that deepen connection between brand and audience.' },
    { icon: '✿', title: 'Conferences & Retreats', desc: 'Productive, beautifully organized professional gatherings.' },
    { icon: '❋', title: 'Holiday Parties', desc: 'Memorable celebrations that bring teams and clients together.' },
];

const subServices = [
    { name: 'Decor 🎀', icon: '✨' },
    { name: 'Catering (Sweets & Finger Food) 🍪', icon: '🍽️' },
    { name: 'Makeup Artist 💄', icon: '🎨' },
    { name: 'Photo & Video 📸🎥', icon: '🎬' },
    { name: 'Sound System 🔊', icon: '🎵' },
    { name: 'Cake Designer 🎂', icon: '🍰' },
    { name: 'Dress Rental 👗', icon: '⚜️' },
];

export default function ServicesPage() {
    return (
        <main>
            <Navbar />

            {/* Page Header */}
            <section className="pt-40 pb-24 px-6 bg-elf-charcoal relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-elf-gold/5 to-transparent" />
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                <div className="relative text-center max-w-3xl mx-auto">
                    <span className="section-label">Our Services</span>
                    <h1 className="font-playfair text-5xl md:text-7xl font-medium text-white leading-tight">
                        Planning Packages
                        <br />
                        <span className="text-elf-gold italic">Built for You</span>
                    </h1>
                    <div className="w-16 h-px bg-elf-gold mx-auto my-8" />
                    <p className="font-inter text-white/50 text-lg leading-relaxed">
                        Every couple is different. Our packages are designed to meet you where you are and elevate the journey ahead.
                    </p>
                </div>
            </section>

            {/* Wedding Packages */}
            <section className="py-28 px-6 bg-elf-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="section-label">Weddings</span>
                        <h2 className="heading-serif text-4xl md:text-5xl">
                            Choose Your
                            <span className="italic text-elf-gold"> Level of Support</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`relative flex flex-col border p-8 card-hover ${pkg.featured
                                    ? 'bg-elf-charcoal border-elf-gold text-white'
                                    : 'bg-white border-elf-border'
                                    }`}
                            >
                                {pkg.featured && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-elf-gold px-4 py-1 text-white text-xs font-inter tracking-widest uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`text-xs font-inter tracking-[0.3em] uppercase mb-2 ${pkg.featured ? 'text-elf-gold' : 'text-elf-gold'}`}>
                                    {pkg.duration}
                                </div>
                                <h3 className={`font-playfair text-2xl font-medium mb-1 ${pkg.featured ? 'text-white' : 'text-elf-charcoal'}`}>
                                    {pkg.name}
                                </h3>
                                <p className={`font-playfair italic text-base mb-4 ${pkg.featured ? 'text-white/60' : 'text-elf-muted'}`}>
                                    {pkg.tagline}
                                </p>
                                <div className={`w-8 h-px mb-6 ${pkg.featured ? 'bg-elf-gold' : 'bg-elf-border'}`} />
                                <p className={`font-inter text-xs leading-relaxed mb-6 ${pkg.featured ? 'text-white/50' : 'text-elf-muted'}`}>
                                    {pkg.ideal}
                                </p>
                                <ul className="space-y-3 flex-1 mb-8">
                                    {pkg.highlights.map((h) => (
                                        <li key={h} className="flex items-start gap-3">
                                            <Check size={13} className="text-elf-gold mt-0.5 shrink-0" />
                                            <span className={`font-inter text-xs leading-relaxed ${pkg.featured ? 'text-white/70' : 'text-elf-muted'}`}>
                                                {h}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/contact"
                                    className={`flex items-center justify-center gap-2 py-3 px-6 text-xs font-inter tracking-widest uppercase transition-all duration-300 ${pkg.featured
                                        ? 'bg-elf-gold text-white hover:bg-elf-gold-light'
                                        : 'border border-elf-charcoal text-elf-charcoal hover:bg-elf-charcoal hover:text-white'
                                        }`}
                                >
                                    Inquire <ArrowRight size={12} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corporate */}
            <section className="py-28 px-6 bg-elf-charcoal">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <span className="section-label">Corporate & Social</span>
                        <h2 className="font-playfair text-4xl md:text-5xl text-white font-medium leading-tight mb-8">
                            Events That Elevate
                            <br />
                            <span className="text-elf-gold italic">Your Brand</span>
                        </h2>
                        <p className="font-inter text-white/50 leading-relaxed mb-8">
                            From intimate product launches to grand galas, we bring the same white-glove precision to every corporate event. Your brand's story deserves a stage worthy of it.
                        </p>
                        <Link href="/contact" className="btn-gold">
                            Discuss Your Event <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {corporateServices.map((s) => (
                            <div key={s.title} className="flex items-start gap-5 p-6 border border-white/10 hover:border-elf-gold/40 transition-colors duration-300 group">
                                <div className="text-xl text-elf-gold font-playfair w-6 shrink-0">{s.icon}</div>
                                <div>
                                    <h3 className="font-playfair text-lg text-white font-medium mb-1 group-hover:text-elf-gold transition-colors duration-300">{s.title}</h3>
                                    <p className="font-inter text-sm text-white/40 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supplemental Services */}
            <section className="py-28 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="section-label">A la Carte</span>
                        <h2 className="heading-serif text-4xl mb-4">Event Essentials</h2>
                        <p className="font-inter text-elf-muted max-w-xl mx-auto font-medium">
                            Need specific support? Our curated network of partners and in-house expertise covers every detail.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                        {subServices.map((s) => (
                            <div key={s.name} className="flex flex-col items-center text-center p-8 bg-elf-cream border border-elf-border group hover:border-elf-gold transition-colors duration-300">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                                <div className="font-inter text-[10px] tracking-widest uppercase text-elf-charcoal leading-tight font-semibold">
                                    {s.name.replace(/[^\x00-\x7F]/g, '').trim()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Note on pricing */}
            <section className="py-20 px-6 bg-elf-warm border-y border-elf-border">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="section-label">Transparency</span>
                    <h2 className="heading-serif text-3xl md:text-4xl mb-6">Custom Pricing for Every Vision</h2>
                    <p className="font-inter text-elf-muted leading-relaxed mb-10">
                        We don't believe in one-size-fits-all pricing. After your consultation, we'll craft a bespoke proposal that reflects your event's scope, style, and scale — with full transparency at every step.
                    </p>
                    <Link href="/contact" className="btn-gold">
                        Request a Proposal <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
