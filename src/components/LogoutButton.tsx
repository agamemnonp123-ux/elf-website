'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function LogoutButton({ className }: { className?: string }) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.refresh(); // Refresh to clear server-side state
        router.push('/login');
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className={`flex items-center gap-2 hover:text-elf-gold transition-colors duration-300 ${className}`}
        >
            <LogOut size={16} />
            <span>{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
    );
}
