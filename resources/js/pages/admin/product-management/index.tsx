import ProductCardAdmin, { productData } from '@/components/ui/product-card-admin';
import SaucesCardAdmin from '@/components/ui/product-card-admin';
import AdminLayout from '@/layouts/admin-layout';
import { Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface ProductFormData {
    title: string;
    description: string;
    category: string;
    stockLevel: number;
    price: string;
    photos: File[];
}

const CATEGORIES = ['Sweet', 'Savory', 'Beverage', 'Snack', 'Dessert'];

const saucesData = [
    {
        id: '1',
        name: 'Savory Fusion. Smoky Twist.',
        description:
            'A delicious blend of classic teriyaki flavor and smoky BBQ richness. Sweet, savory, and perfect for marinades, stir-fry, and grilled dishes.',
        price: '$40.00',
        image: '/assets/images/home/19534e4b7e7bb9999e7570eceacd260d5cd8696d.png',
        category: 'Sweet',
        href: route('frontend.details'),
        available: 10,
    },
    {
        id: '2',
        name: 'Honey BBQ Glaze',
        description:
            'Sweet honey combined with tangy BBQ flavors creates the perfect glaze for ribs, chicken, and pork. Great for grilling and baking.',
        price: '$35.00',
        image: '/assets/images/home/513f91e933b9cf0b47a9e4627c132b20f4bf15b6.jpg',
        category: 'Honey',
        href: route('frontend.details'),
        available: 5,
    },
    {
        id: '3',
        name: 'Spicy Texas Heat',
        description:
            'Bold and spicy with authentic Texas flavors. Perfect for those who like their BBQ with a kick of heat and smoky goodness.',
        price: '$42.00',
        image: '/assets/images/home/fb87184304aaa733c0da92fab04e9ebd14294505.jpg',
        category: 'Spicy',
        href: route('frontend.details'),
        available: 3,
    },
];

export default function Index() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<productData | null>(null);
    const [photos, setPhotos] = useState<(File | null)[]>([null, null, null, null, null]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Sweet');
    const [stockLevel, setStockLevel] = useState<number>(10);
    const [price, setPrice] = useState('');
    const [dragOver, setDragOver] = useState<number | null>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleEdit = (product: productData) => {
        setEditingProduct(product);
        setTitle(product.name);
        setDescription(product.description);
        setCategory(product.category || 'Sweet');
        setStockLevel(product.available || 10);
        setPrice(product.price.replace('$', ''));
        setShowCreateModal(true);
    };

    const handleFileChange = (index: number, file: File | null) => {
        if (!file) return;
        const updated = [...photos];
        updated[index] = file;
        setPhotos(updated);
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOver(null);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileChange(index, file);
        }
    };

    const handleSubmit = () => {
        const validPhotos = photos.filter((p): p is File => p !== null);
        const data: ProductFormData = {
            title,
            description,
            category,
            stockLevel,
            price,
            photos: validPhotos,
        };
        console.log('Product submitted:', data);
        // TODO: call your API here
        setShowCreateModal(false);
        // Reset form
        setPhotos([null, null, null, null, null]);
        setTitle('');
        setDescription('');
        setCategory('Sweet');
        setStockLevel(10);
        setPrice('');
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setEditingProduct(null);
        // Reset form
        setPhotos([null, null, null, null, null]);
        setTitle('');
        setDescription('');
        setCategory('Sweet');
        setStockLevel(10);
        setPrice('');
    };

    return (
        <AdminLayout activeSlug={'product-management'}>
            <div className="flex items-center justify-between">
                <h2 className="font-poppins xl sm:text-4xl font-medium text-text-title">
                    Manage your products
                </h2>
                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="rounded-xl bg-bg-button px-3 sm:px-6 py-2 sm:py-4 font-inter text-base sm:text-xl font-medium text-text-white hover:opacity-90 transition-opacity"
                >
                    Add a new product
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
                {saucesData.map((sauce) => (
                    <ProductCardAdmin key={sauce.id} product={sauce} onEdit={handleEdit} />
                ))}
            </div>
            <div className="flex items-center justify-between py-4">
                <span className="font-poppins text-sm font-medium text-text-green">
                    Showing 1 to 10 of 50 results
                </span>

                <div className="flex gap-2">
                    <button className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green">
                        Previous
                    </button>

                    <button className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green">
                        Next
                    </button>
                </div>
            </div>

            {/* Create Product Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-white rounded-2xl shadow-2xl px-10 py-5">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-poppins font-medium text-3xl text-text-title mb-8">
                                    {editingProduct ? 'Edit Product' : 'Add new Product'}
                                </h3>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-bg-card hover:bg-bg-card transition-colors text-text-gray-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="">
                            <div className="flex flex-col gap-6">
                                {/* Photo Upload Row */}
                                <div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {photos.map((photo, i) => {
                                            const previewUrl = photo ? URL.createObjectURL(photo) : null;
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => fileInputRefs.current[i]?.click()}
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                        setDragOver(i);
                                                    }}
                                                    onDragLeave={() => setDragOver(null)}
                                                    onDrop={(e) => handleDrop(e, i)}
                                                    className="flex-1 aspect-square rounded-xl bg-bg-card flex flex-col mb-2 items-center justify-center cursor-pointer overflow-hidden font-inter font-medium text-xl text-text-body"
                                                    style={{
                                                        borderColor: dragOver === i ? '#9b1c1c' : undefined,
                                                        background: previewUrl ? 'transparent' : undefined,
                                                    }}
                                                >
                                                    {previewUrl ? (
                                                        <img
                                                            src={previewUrl}
                                                            alt={`Photo ${i + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <>
                                                            
                                                            <span className="text-xs text-text-gray-300">
                                                                Add Photos
                                                            </span>
                                                        </>
                                                    )}
                                                    <input
                                                        ref={(el) => {
                                                            fileInputRefs.current[i] = el;
                                                        }}
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) =>
                                                            handleFileChange(i, e.target.files?.[0] ?? null)
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-inter font-medium text-base text-text-title">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-text-gray-300 bg-bg-card  text-text-title"
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-inter font-medium text-base text-text-title">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2.5 rounded-lg border border-text-gray-300 bg-bg-card  text-text-title resize-none"
                                    />
                                </div>

                                {/* Category / Stock / Price */}
                                <div className="flex gap-4">
                                    {/* Category */}
                                    <div className="flex flex-1 flex-col gap-1.5">
                                        <label className="font-inter font-medium text-base text-text-title">
                                            Category
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-lg border border-text-gray-300 bg-bg-card  text-text-title appearance-none cursor-pointer"
                                            >
                                                {CATEGORIES.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-45"
                                            >
                                                <path
                                                    d="M6 9L12 15L18 9"
                                                    stroke="#1a1a1a"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Stock Level */}
                                    <div className="flex flex-1 flex-col gap-1.5">
                                        <label className="font-inter font-medium text-base text-text-title">
                                            Stock Level
                                        </label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={stockLevel}
                                            onChange={(e) => setStockLevel(Number(e.target.value))}
                                            className="w-full px-4 py-2.5 rounded-lg border border-text-gray-300 bg-bg-card  text-text-title"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-1 flex-col gap-1.5">
                                        <label className="font-inter font-medium text-base text-text-title">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-text-gray-300 bg-bg-card  text-text-title"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className=" pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="px-6 py-2.5 rounded-sm bg-bg-button text-text-white font-inter text-base font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
