import TiptapEditor from '@/components/tiptap-editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin-layout';
import { PlusIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';

type TermsAndCondition = {
    id?: number;
    title?: string;
    content?: string;
};

type PageProps = {
    termsAndCondition?: TermsAndCondition | null;
};

export default function TermsCondition() {
    const { termsAndCondition } = usePage<PageProps>().props;
    const [isEditMode, setIsEditMode] = useState(false);
    
    const { data, setData, post, put, processing, errors } = useForm({
        title: termsAndCondition?.title || '',
        content: termsAndCondition?.content || '',
    });

    const handleEditClick = () => {
        setIsEditMode(true);
        // Reset form data with current values
        setData({
            title: termsAndCondition?.title || '',
            content: termsAndCondition?.content || '',
        });
    };

    const handleCancel = () => {
        setIsEditMode(false);
        // Reset form data to original values
        setData({
            title: termsAndCondition?.title || '',
            content: termsAndCondition?.content || '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (termsAndCondition?.id) {
            put(route('admin.tac.update', termsAndCondition.id), {
                onSuccess: () => {
                    setIsEditMode(false);
                }
            });
        } else {
            post(route('admin.tac.store'), {
                onSuccess: () => {
                    setIsEditMode(false);
                }
            });
        }
    };

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
                        {!termsAndCondition?.id && !isEditMode ? (
                            <button 
                                onClick={() => setIsEditMode(true)}
                                className="flex cursor-pointer items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90"
                            >
                                Create
                            </button>
                        ) : termsAndCondition?.id && !isEditMode ? (
                            <button 
                                onClick={handleEditClick}
                                className="flex cursor-pointer items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90"
                            >
                                Edit
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="mt-6 rounded-xl bg-bg-white p-6 sm:mt-9">
                    {!isEditMode ? (
                        // View Mode
                        <div className="space-y-6">
                            <div>
                                <h2 className="font-poppins text-2xl font-semibold text-text-title">
                                    Terms & Condition
                                </h2>
                            </div>

                            {termsAndCondition ? (
                                <>
                                    <div>
                                        <Label className="mb-4 font-poppins text-base font-normal text-text-title">
                                            Title
                                        </Label>
                                        <div className="w-full rounded-lg border p-4 font-bebas-neue text-base font-normal text-text-title bg-gray-50">
                                            {termsAndCondition.title || 'No title set'}
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="mb-4 font-poppins text-base font-normal text-text-title">
                                            Description
                                        </Label>
                                        <div 
                                            className="w-full rounded-lg border p-4 font-aktiv-grotesk text-base font-normal text-text-body bg-gray-50 min-h-[200px]"
                                            dangerouslySetInnerHTML={{ __html: termsAndCondition.content || 'No content set' }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No Terms & Conditions created yet.</p>
                                    <p className="text-gray-400 mt-2">Click the "Create" button to get started.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Edit Mode
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-poppins text-2xl font-semibold text-text-title">
                                        {termsAndCondition?.id ? 'Edit' : 'Create'} Terms & Condition
                                    </h2>
                                </div>

                                <div>
                                    <Label className="mb-4 font-poppins text-base font-normal text-text-title">
                                        Title
                                    </Label>
                                    <Input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded-lg border p-4 font-bebas-neue text-base font-normal text-text-title"
                                        placeholder="Enter terms title"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="mb-4 font-poppins text-base font-normal text-text-title">
                                        Description
                                    </Label>
                                    <TiptapEditor
                                        value={data.content}
                                        onChange={(value) => setData('content', value)}
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex cursor-pointer items-center gap-2 rounded-sm bg-bg-button px-6 py-3 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : (termsAndCondition?.id ? 'Update' : 'Save')}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex cursor-pointer items-center gap-2 rounded-sm border border-gray-300 px-6 py-3 font-inter text-base font-medium text-text-title transition-opacity hover:opacity-90"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
