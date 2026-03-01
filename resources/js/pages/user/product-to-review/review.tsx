import { Textarea } from '@/components/ui/textarea';
import FrontendLayout from '@/layouts/frontend-layout';
import { Star } from 'lucide-react';

export default function Review() {
    return (
        <FrontendLayout>
            <div>
                <div className="container mx-auto px-4 py-10 lg:py-16">
                    <div className="rounded-sm bg-bg-our-story p-6">
                        <div className="mb-8">
                            <h2 className="font-bebas-neue text-2xl font-normal text-text-title uppercase">
                                How was your experience?
                            </h2>
                            <p className="font-aktiv-grotesk text-base font-normal text-text-body">
                                Your review helps other customers{' '}
                            </p>
                        </div>
                        <div>
                            <h2 className="mb-2 font-bebas-neue text-xl font-normal text-text-title">
                                Your review helps other customers{' '}
                            </h2>
                            <Star />
                        </div>
                        <div className="mt-8">
                            <h2 className="mb-2 font-bebas-neue text-xl font-normal text-text-title">
                                Review
                            </h2>
                            <Textarea className="w-full rounded-md border bg-bg-white p-2 placeholder:text-text-body">Write here</Textarea>
                        </div>
                        <div className="mt-8">
                            <button className="w-full rounded-md bg-text-buy-now text-text-white py-3 font-poppins text-base font-medium">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
