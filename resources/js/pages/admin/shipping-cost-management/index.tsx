import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { usePage, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type ShippingCost = {
    id?: number;
    cost?: number;
    description?: string;
};

type PageProps = {
    shippingCost?: ShippingCost | null;
    flash?: {
        success?: string;
    };
};

export default function ShippingCostManagement() {
    const { shippingCost, flash } = usePage<PageProps>().props;
    
    const { data, setData, put, processing, errors } = useForm({
        cost: shippingCost?.cost || '',
        description: shippingCost?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Always update existing shipping cost (no create option)
        if (shippingCost?.id) {
            put(route('admin.scm.update', shippingCost.id), {
                onSuccess: () => {
                    toast.success('Shipping cost updated successfully');
                },
                onError: (errors) => {
                    toast.error('Failed to update shipping cost');
                }
            });
        }
    };

    return (
        <AdminLayout activeSlug={'shipping-cost-management'}>
            <div>
                {/* Toast Notification */}
                {flash?.success && (
                    <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {flash.success}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex items-center justify-between">
                    <div className="">
                        <h2 className="font-poppins text-xl font-medium text-text-title sm:text-4xl">
                            Shipping Cost Management
                        </h2>
                    </div>
                </div>
                <div className="mt-6 rounded-xl bg-bg-white p-6 sm:mt-9">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">

                            <div>
                                <Label className="mb-4 font-poppins text-base font-normal text-text-title">
                                    Shipping Cost Fee ($)
                                </Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={data.cost}
                                    onChange={(e) => setData('cost', e.target.value)}
                                    className="w-full rounded-lg border p-4 text-base font-normal text-text-title"
                                    placeholder="Enter shipping cost"
                                />
                                {errors.cost && (
                                    <p className="mt-1 text-sm text-red-600">{errors.cost}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex cursor-pointer items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
