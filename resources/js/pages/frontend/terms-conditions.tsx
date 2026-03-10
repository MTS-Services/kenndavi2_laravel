import FrontendLayout from '@/layouts/frontend-layout';
import { usePage } from '@inertiajs/react';

interface TermsAndCondition {
    id?: number;
    title?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
}

type PageProps = {
    termsAndCondition?: TermsAndCondition | null;
};

export default function TermsConditions() {
    const { termsAndCondition } = usePage<PageProps>().props;

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/,/g, '');
    };

    return (
        <FrontendLayout>
            <div className="mb-12 sm:mb-28">
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="">
                        <h2 className="mb-2 text-center font-bebas-neue text-5xl font-normal text-text-title uppercase">
                            {termsAndCondition?.title || 'Terms & Conditions'}
                        </h2>
                        <p className="text-center font-aktiv-grotesk text-2xl font-normal text-text-body">
                            Update Time：{formatDate(termsAndCondition?.updated_at)}
                        </p>
                    </div>
                    <div className="mt-12 sm:mt-20">
                        <div className="">
                            <div
                                className="prose prose-sm max-w-none font-aktiv-grotesk text-2xl font-normal text-text-body"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        termsAndCondition?.content ||
                                        'No terms and conditions available.',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
