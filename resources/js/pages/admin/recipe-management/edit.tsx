import TiptapEditor from '@/components/tiptap-editor';
import AdminLayout from '@/layouts/admin-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface RecipeFormData {
    title: string;
    image: File | null;
    prep_time: string;
    cook_time: string;
    description: string;
    related_products: number[];
}

interface Product {
    id: number;
    title: string;
    price: string;
}

interface Recipe {
    id: number;
    title: string;
    description: string;
    prep_time: string;
    cook_time: string;
    image?: string;
    related_products: { id: number; title: string; price: string }[];
}

export default function Edit() {
    const { props } = usePage<{ recipe: Recipe; products: Product[] }>();
    const { recipe, products } = props;
    const [photos, setPhotos] = useState<(File | null)[]>([null]);
    const [dragOver, setDragOver] = useState<number | null>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { data, setData, post, processing, errors } = useForm<RecipeFormData>(
        {
            title: recipe.title || '',
            image: null,
            prep_time: recipe.prep_time || '',
            cook_time: recipe.cook_time || '',
            description: recipe.description || '',
            related_products: recipe.related_products?.map((p) => p.id) || [],
        },
    );

    const handleFileChange = (index: number, file: File | null) => {
        if (!file) return;
        const updated = [...photos];
        updated[index] = file;
        setPhotos(updated);
        setData('image', file);
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOver(null);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileChange(index, file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.rm.update', recipe.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Recipe updated successfully.');
            },
            onError: () => {
                toast.error('Failed to update recipe.');
            },
        });
    };

    const removePhoto = (index: number) => {
        const updated = [...photos];
        updated[index] = null;
        setPhotos(updated);
        setData('image', null);
    };

    return (
        <AdminLayout activeSlug="recipe-management">
            <div className="mx-auto w-full">
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                    {/* Page Header */}

                    <div className="flex items-center justify-between">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Edit Recipe
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Update the recipe details below.
                            </p>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                             <div className="pt-1">
                            <Link 
                                href={route('admin.rm.index')}
                               
                                className="cursor-pointer rounded-lg bg-red-800 px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-900 active:scale-95 disabled:opacity-60"
                            >
                               Back
                            </Link>
                        </div>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        {/* Recipe Image */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Recipe Image
                            </label>
                            <div className="flex gap-3">
                                {photos.map((photo, i) => {
                                    const previewUrl = photo
                                        ? URL.createObjectURL(photo)
                                        : null;
                                    const displayImage =
                                        previewUrl || recipe.image;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                fileInputRefs.current[
                                                    i
                                                ]?.click()
                                            }
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setDragOver(i);
                                            }}
                                            onDragLeave={() =>
                                                setDragOver(null)
                                            }
                                            onDrop={(e) => handleDrop(e, i)}
                                            className="relative"
                                            style={{
                                                flex: 1,
                                                aspectRatio: '2',
                                                borderRadius: '12px',
                                                border:
                                                    dragOver === i
                                                        ? '2px dashed #9b1c1c'
                                                        : '2px dashed #d9d0cc',
                                                background: previewUrl
                                                    ? 'transparent'
                                                    : '#f5f1ef',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                height: '120px',
                                                maxWidth: '300px',
                                            }}
                                        >
                                            {previewUrl ? (
                                                <>
                                                    <img
                                                        src={previewUrl}
                                                        alt={`Recipe image preview`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removePhoto(i);
                                                        }}
                                                        className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                    >
                                                        <svg
                                                            className="h-3 w-3"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    {recipe.image ? (
                                                        <>
                                                            <img
                                                                src={
                                                                    recipe.image
                                                                }
                                                                alt="Current recipe image"
                                                                className="h-full w-full rounded-lg object-cover"
                                                            />
                                                            <span className="bg-opacity-50 absolute right-2 bottom-2 rounded bg-black px-2 py-1 text-xs text-white">
                                                                Click to change
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg
                                                                className="mb-2 h-8 w-8"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 4v16m8-8H4"
                                                                />
                                                            </svg>
                                                            <span className="text-xs">
                                                                Add Recipe Image
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            <input
                                                ref={(el) =>
                                                    (fileInputRefs.current[i] =
                                                        el)
                                                }
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        i,
                                                        e.target.files?.[0] ||
                                                            null,
                                                    )
                                                }
                                                className="hidden"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Recipe Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                placeholder="Enter recipe title"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Description
                            </label>
                            {/* <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                placeholder="Enter recipe description"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )} */}
                            <TiptapEditor
                                value={data.description}
                                onChange={(value) =>
                                    setData('description', value)
                                }
                            />
                        </div>

                        {/* Prep Time and Cook Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-800">
                                    Prep Time
                                </label>
                                <input
                                    type="text"
                                    value={data.prep_time}
                                    onChange={(e) =>
                                        setData('prep_time', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                    placeholder="e.g., 15 mins"
                                />
                                {errors.prep_time && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.prep_time}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-800">
                                    Cook Time
                                </label>
                                <input
                                    type="text"
                                    value={data.cook_time}
                                    onChange={(e) =>
                                        setData('cook_time', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                    placeholder="e.g., 30 mins"
                                />
                                {errors.cook_time && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.cook_time}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Related Products */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Related Products
                            </label>
                            <div className="space-y-2">
                                <div className="mb-2 text-xs text-gray-500">
                                    Select products that are related to this
                                    recipe
                                </div>
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    {products?.map((product) => (
                                        <label
                                            key={product.id}
                                            className="flex cursor-pointer items-center space-x-2 rounded border p-2 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                value={product.id}
                                                checked={data.related_products.includes(
                                                    product.id,
                                                )}
                                                onChange={(e) => {
                                                    const checked =
                                                        e.target.checked;
                                                    if (checked) {
                                                        setData(
                                                            'related_products',
                                                            [
                                                                ...data.related_products,
                                                                product.id,
                                                            ],
                                                        );
                                                    } else {
                                                        setData(
                                                            'related_products',
                                                            data.related_products.filter(
                                                                (id) =>
                                                                    id !==
                                                                    product.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                                className="rounded text-red-800 focus:ring-red-800"
                                            />
                                            <span className="text-sm">
                                                {product.title} - $
                                                {product.price}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {errors.related_products && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.related_products}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-1">
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer rounded-lg bg-red-800 px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-900 active:scale-95 disabled:opacity-60"
                            >
                                {processing ? 'Updating...' : 'Update Recipe'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
