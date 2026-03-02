import ProductCardAdmin from '@/components/ui/product-card-admin';
import AdminLayout from '@/layouts/admin-layout';
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
        image: '/assets/images/recpie/Rectangle 25.png',
        href: route('frontend.details'),
    },
    {
        id: '2',
        name: 'Honey BBQ Glaze',
        description:
            'Sweet honey combined with tangy BBQ flavors creates the perfect glaze for ribs, chicken, and pork. Great for grilling and baking.',
        price: '$35.00',
        image: '/assets/images/recpie/Rectangle 22.png',

        href: route('frontend.details'),
    },
    {
        id: '3',
        name: 'Spicy Texas Heat',
        description:
            'Bold and spicy with authentic Texas flavors. Perfect for those who like their BBQ with a kick of heat and smoky goodness.',
        price: '$42.00',
        image: '/assets/images/recpie/Rectangle 23.png',
        href: route('frontend.details'),
    },
    {
        id: '4',
        name: 'Spicy Texas Heat',
        description:
            'Bold and spicy with authentic Texas flavors. Perfect for those who like their BBQ with a kick of heat and smoky goodness.',
        price: '$42.00',
        image: '/assets/images/recpie/Rectangle 24.png',
        href: route('frontend.details'),
    },
    {
        id: '5',
        name: 'Spicy Texas Heat',
        description:
            'Bold and spicy with authentic Texas flavors. Perfect for those who like their BBQ with a kick of heat and smoky goodness.',
        price: '$42.00',
        image: '/assets/images/recpie/Rectangle 25.png',
        href: route('frontend.details'),
    },
    {
        id: '6',
        name: 'Spicy Texas Heat',
        description:
            'Bold and spicy with authentic Texas flavors. Perfect for those who like their BBQ with a kick of heat and smoky goodness.',
        price: '$42.00',
        image: '/assets/images/recpie/Rectangle 26.png',
        href: route('frontend.details'),
    },
];

export default function Index() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [photos, setPhotos] = useState<(File | null)[]>([
        null,
        null,
        null,
        null,
        null,
    ]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Sweet');
    const [stockLevel, setStockLevel] = useState<number>(10);
    const [price, setPrice] = useState('');
    const [dragOver, setDragOver] = useState<number | null>(null);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
        // Reset form
        setPhotos([null, null, null, null, null]);
        setTitle('');
        setDescription('');
        setCategory('Sweet');
        setStockLevel(10);
        setPrice('');
    };

    return (
        <AdminLayout activeSlug={'recipe-management'}>
            <div className="flex items-center justify-between">
                <h2 className="font-poppins text-4xl font-medium text-text-title">
                    Manage your Recipes
                </h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="rounded-xl bg-bg-button px-6 py-4 font-inter text-xl font-medium text-text-white transition-opacity hover:opacity-90"
                >
                    Add a new Recipe
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {saucesData.map((sauce) => (
                    <ProductCardAdmin key={sauce.id} product={sauce} />
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
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-bg-white px-10 py-5 shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="mb-8 font-poppins text-3xl font-medium text-text-title">
                                    Add new Product
                                </h3>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-card text-text-gray-300 transition-colors hover:bg-bg-card"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="">
                            <div className="flex flex-col gap-6">
                                {/* Photo Upload */}
                                <div>
                                    <div className="h-auto w-full">
                                        <div
                                            onClick={() =>
                                                fileInputRefs.current[0]?.click()
                                            }
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                setDragOver(0);
                                            }}
                                            onDragLeave={() =>
                                                setDragOver(null)
                                            }
                                            onDrop={(e) => handleDrop(e, 0)}
                                            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-bg-card font-inter text-xl font-medium text-text-body"
                                            style={{
                                                borderColor:
                                                    dragOver === 0
                                                        ? '#9b1c1c'
                                                        : undefined,
                                                background: photos[0]
                                                    ? 'transparent'
                                                    : undefined,
                                            }}
                                        >
                                            {photos[0] ? (
                                                <img
                                                    src={URL.createObjectURL(
                                                        photos[0],
                                                    )}
                                                    alt="Recipe Photo"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <>
                                                    <span className="text-xs text-text-gray-300">
                                                        Add Photo
                                                    </span>
                                                </>
                                            )}
                                            <input
                                                ref={(el) => {
                                                    fileInputRefs.current[0] =
                                                        el;
                                                }}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        0,
                                                        e.target.files?.[0] ??
                                                            null,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="block sm:flex gap-4 ">
                                    <div className="w-full flex flex-col gap-1.5">
                                        <label className="font-inter text-base font-medium text-text-title">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-text-gray-300 bg-bg-card px-4 py-2.5 text-text-title"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-1.5 mt-4 sm:mt-0">
                                        <label className="font-inter text-base font-medium text-text-title">
                                            Sauces Used
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter sauces used"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            className="w-full rounded-lg border border-text-gray-300 bg-bg-card px-4 py-2.5 text-text-title"
                                        />
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-inter text-base font-medium text-text-title">
                                        Ingredients
                                    </label>
                                    <textarea
                                        placeholder="Enter Ingredients"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        rows={4}
                                        className="w-full resize-none rounded-lg border border-text-gray-300 bg-bg-card px-4 py-2.5 text-text-title"
                                    />
                                </div>
                                {/* Step */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-inter text-base font-medium text-text-title">
                                        Step
                                    </label>
                                    <textarea
                                        placeholder="Enter recipe step"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        rows={4}
                                        className="w-full resize-none rounded-lg border border-text-gray-300 bg-bg-card px-4 py-2.5 text-text-title"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="rounded-sm bg-bg-button px-6 py-2.5 font-inter text-base font-medium text-text-white transition-opacity hover:opacity-90"
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
