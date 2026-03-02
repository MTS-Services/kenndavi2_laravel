import { Head, Link } from '@inertiajs/react';
import * as React from 'react';

import AppLogo from '@/components/app-logo';
import { login } from '@/routes';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    showHeader?: boolean;
    showFooter?: boolean;
}

export default function AuthLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('/assets/images/Admin_Login.png')" }}>

            <main className='flex flex-col w-full max-w-2xl shadow-card rounded-[8px] p-6 md:p-7.5 bg-white/90 dark:bg-transparent backdrop-blur-sm relative z-10'>
                <Head title={title} />

                {/* <Link href={login()} className="flex flex-col items-center">
                    <AppLogo className="fill-current text-foreground h-12 w-auto md:h-auto" />
                </Link> */}

                <div className="space-y-2 text-center mt-6">
                    <h1 className="font-inter  font-semibold text-text-title text-2xl md:text-5xl leading-tight md:leading-[130%]">
                        {title}
                    </h1>
                    <p className="font-inter text-xl font-normal text-text-title">  
                        {description }
                    </p>
                </div>

                <div className="mt-8 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}