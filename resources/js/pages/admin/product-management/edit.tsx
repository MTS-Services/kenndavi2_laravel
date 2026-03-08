import AdminLayout from '@/layouts/admin-layout';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface ProductTag {
    id: number;
    name: string;
}

interface ProductFormData {
    title: string;
    description: string;
    tag_id: number;
    price: string;
    discount: string;
    discount_type: string;
    stock_level: number;
    images: File[];
}

export default function Edit() {
    const { props } = usePage<{ product: any; productTags: ProductTag[] }>();
    const { product, productTags } = props;

    const [photos, setPhotos] = useState<(File | null)[]>([
        null,
        null,
        null,
        null,
        null,
    ]);

    const { data, setData, post, processing, errors } =
        useForm<ProductFormData>({
            title: product?.title || '',
            description: product?.description || '',
            tag_id: product?.tag_id || productTags?.[0]?.id || 1,
            price: product?.price || '',
            discount: product?.discount || '',
            discount_type: product?.discount_type || 'percentage',
            stock_level: product?.stock_level || 10,
            images: [],
        });

    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleFileChange = (index: number, file: File | null) => {
        if (!file) return;
        const updated = [...photos];
        updated[index] = file;
        setPhotos(updated);
        const validPhotos = updated.filter((p): p is File => p !== null);
        setData('images', validPhotos);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.pm.update', product.id), {
            forceFormData: true,
            onSuccess: () => {
                // Redirect happens automatically via Inertia
            },
        });
    };

    const removePhoto = (index: number) => {
        const updated = [...photos];
        updated[index] = null;
        setPhotos(updated);
        const validPhotos = updated.filter((p): p is File => p !== null);
        setData('images', validPhotos);
    };

    return (
        <AdminLayout activeSlug="product-management">
            <div className="mx-auto max-w-4xl">
                {/* Edit Form */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Product
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the product details below.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        {/* Photo Upload Row */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Add New Photos
                            </label>
                            <div className="flex gap-3">
                                {photos.map((photo, i) => {
                                    // Check if there's an existing image at this position
                                    const existingImage = product?.images?.[i];
                                    const previewUrl = photo
                                        ? URL.createObjectURL(photo)
                                        : existingImage
                                          ? `/storage/${existingImage.image}`
                                          : null;
                                    return (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                fileInputRefs.current[
                                                    i
                                                ]?.click()
                                            }
                                            className="relative"
                                            style={{
                                                flex: 1,
                                                aspectRatio: '1',
                                                borderRadius: '12px',
                                                border: '2px dashed #d9d0cc',
                                                background: previewUrl
                                                    ? 'transparent'
                                                    : '#f5f1ef',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                overflow: 'hidden',
                                                transition:
                                                    'border-color 0.2s, background 0.2s',
                                            }}
                                        >
                                            {previewUrl ? (
                                                <>
                                                    <img src={previewUrl} alt={`Photo ${i + 1}`} style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                    }} />
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removePhoto(i);
                                                        }}
                                                        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-800 text-xs text-white hover:bg-red-900"
                                                    >
                                                        ×
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 5, opacity: 0.4 }}>
                                                        <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#6b7280" strokeWidth="1.5" />
                                                    </svg>
                                                    <span style={{ fontSize: '0.68rem', color: '#9ca3af', fontFamily: 'sans-serif' }}>
                                                        Add Photo
                                                    </span>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                ref={(el) => {
                                                    fileInputRefs.current[i] =
                                                        el;
                                                }}
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        i,
                                                        e.target.files?.[0] ||
                                                            null,
                                                    )
                                                }
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.images && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.images}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                placeholder="Enter product title"
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
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={4}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                placeholder="Enter product description"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Tag */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Tag
                            </label>
                            <select
                                value={data.tag_id}
                                onChange={(e) =>
                                    setData('tag_id', parseInt(e.target.value))
                                }
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                            >
                                {productTags?.map((tag: ProductTag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </option>
                                ))}
                            </select>
                            {errors.tag_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.tag_id}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Price
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Discount and Discount Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-800">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.discount}
                                    onChange={(e) =>
                                        setData('discount', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                    placeholder="0.00"
                                />
                                {errors.discount && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.discount}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-800">
                                    Discount Type
                                </label>
                                <select
                                    value={data.discount_type}
                                    onChange={(e) =>
                                        setData('discount_type', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                >
                                    <option value="percentage">
                                        Percentage
                                    </option>
                                    <option value="fixed">Fixed Amount</option>
                                </select>
                                {errors.discount_type && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.discount_type}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Stock Level */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                Stock Level
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.stock_level}
                                onChange={(e) =>
                                    setData(
                                        'stock_level',
                                        parseInt(e.target.value) || 0,
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-red-800 focus:ring-1 focus:ring-red-800 focus:outline-none"
                                placeholder="0"
                            />
                            {errors.stock_level && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.stock_level}
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
                                {processing ? 'Updating...' : 'Update Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
