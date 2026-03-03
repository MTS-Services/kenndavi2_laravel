import AdminLayout from '@/layouts/admin-layout';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function TermsCondition() {
    const [introduction, setIntroduction] = useState('Welcome to Northside. By accessing or purchasing from our website, you agree to be bound by these Terms & Conditions.');
    const [products, setProducts] = useState('We sell packaged sauces and related food products. All products are subject to availability. We reserve the right to discontinue or modify products at any time.');
    const [informationUsage, setInformationUsage] = useState('In this agreement, unless the context clearly indicates otherwise, the following terms shall have these meanings:\n\nWe use the information we collect to process and fulfill your orders, including confirming purchases, arranging shipping, and providing delivery updates. Your details help us communicate important information such as order confirmations, customer support responses, and service-related announcements. We may also use your information to improve our website functionality, analyze customer preferences, enhance product offerings, and personalize your shopping experience. With your consent, we may send promotional emails, special offers, new product announcements, or marketing communications that may be relevant to you. Additionally, we use collected data to prevent fraud, ensure website security, comply with legal obligations, and maintain accurate internal records. We only use your information for legitimate business purposes and in accordance with applicable data protection laws.');

    return (
        <AdminLayout activeSlug={'terms-conditions'}>
            <div>
                <div className="flex items-center justify-between">
                    <div className="">
                        <h2 className="font-poppins text-2xl font-semibold text-text-title sm:text-3xl md:text-[40px]">
                            Terms & Condition
                        </h2>
                        <p className="font-poppins text-base font-normal text-text-body">
                            Manage your terms settings and preferences
                        </p>
                    </div>
                    <div className="">
                        <button
                            className="flex cursor-pointer items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <div className="bg-bg-white p-6 rounded-xl mt-6 sm:mt-9">
                    <form action="">
                        <div className="space-y-6">
                        <div>
                            <h2 className="font-poppins text-2xl font-semibold text-text-title">
                                Terms & Condition
                            </h2>
                            
                        </div>
                        
                        <div>
                            <label className="mb-4 font-poppins text-base font-normal text-text-title">
                                Title
                            </label>
                            <input type="text"
                                value={products}
                                onChange={(e) => setProducts(e.target.value)}
                                className="w-full p-4 border text-text-title rounded-lg font-bebas-neue text-xl font-normal"
                            />
                        </div>
                        
                        <div>
                             <label className="mb-4 font-poppins text-base font-normal text-text-title">
                                Description
                            </label>
                            <textarea
                                value={informationUsage}
                                onChange={(e) => setInformationUsage(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-lg font-aktiv-grotesk text-base font-normal"
                                rows={8}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <button
                            className="flex cursor-pointer items-center gap-2 font-poppins text-base font-semibold text-bg-button transition-opacity hover:opacity-90"
                        >
                          <PlusIcon className="h-5 w-5" /> Add Another terms section
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
