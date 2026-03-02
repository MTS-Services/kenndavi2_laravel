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

export default function Create() {
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
    };

    return (
        <AdminLayout activeSlug="product-management">
            <div className="mx-auto max-w-2xl">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Add new Product
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Fill in the details below to add a new product.
                    </p>
                </div>

                {/* Form Card */}
                <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                    {/* Photo Upload Row */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-800">
                            Photos
                        </label>
                        <div className="flex gap-3">
                            {photos.map((photo, i) => {
                                const previewUrl = photo
                                    ? URL.createObjectURL(photo)
                                    : null;
                                return (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            fileInputRefs.current[i]?.click()
                                        }
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setDragOver(i);
                                        }}
                                        onDragLeave={() => setDragOver(null)}
                                        onDrop={(e) => handleDrop(e, i)}
                                        style={{
                                            flex: 1,
                                            aspectRatio: '1',
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
                                            transition:
                                                'border-color 0.2s, background 0.2s',
                                            position: 'relative',
                                        }}
                                    >
                                        {previewUrl ? (
                                            <img
                                                src={previewUrl}
                                                alt={`Photo ${i + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <svg
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    style={{
                                                        marginBottom: 5,
                                                        opacity: 0.4,
                                                    }}
                                                >
                                                    <path
                                                        d="M12 16V8M12 8L9 11M12 8L15 11"
                                                        stroke="#6b7280"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <rect
                                                        x="3"
                                                        y="3"
                                                        width="18"
                                                        height="18"
                                                        rx="4"
                                                        stroke="#6b7280"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                                <span
                                                    style={{
                                                        fontSize: '0.68rem',
                                                        color: '#9ca3af',
                                                        fontFamily:
                                                            'sans-serif',
                                                    }}
                                                >
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
                                            style={{ display: 'none' }}
                                            onChange={(e) =>
                                                handleFileChange(
                                                    i,
                                                    e.target.files?.[0] ?? null,
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-800">
                            Tittle
                        </label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onFocus={(e) =>
                                (e.currentTarget.style.borderColor = '#9b1c1c')
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.borderColor = '#e5e7eb')
                            }
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1.5px solid #e5e7eb',
                                background: '#f8f6f4',
                                fontSize: '0.9rem',
                                color: '#1a1a1a',
                                fontFamily: 'sans-serif',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-800">
                            Description
                        </label>
                        <textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            onFocus={(e) =>
                                (e.currentTarget.style.borderColor = '#9b1c1c')
                            }
                            onBlur={(e) =>
                                (e.currentTarget.style.borderColor = '#e5e7eb')
                            }
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1.5px solid #e5e7eb',
                                background: '#f8f6f4',
                                fontSize: '0.9rem',
                                color: '#1a1a1a',
                                fontFamily: 'sans-serif',
                                outline: 'none',
                                resize: 'vertical',
                                transition: 'border-color 0.2s',
                            }}
                        />
                    </div>

                    {/* Category / Stock / Price */}
                    <div className="flex gap-4">
                        {/* Category */}
                        <div className="flex flex-1 flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-800">
                                Category
                            </label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    style={{
                                        width: '100%',
                                        padding: '10px 36px 10px 14px',
                                        borderRadius: '10px',
                                        border: '1.5px solid #e5e7eb',
                                        background: '#f8f6f4',
                                        fontSize: '0.9rem',
                                        color: '#1a1a1a',
                                        fontFamily: 'sans-serif',
                                        appearance: 'none',
                                        outline: 'none',
                                        cursor: 'pointer',
                                    }}
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
                                    style={{
                                        position: 'absolute',
                                        right: 12,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        opacity: 0.45,
                                    }}
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
                            <label className="text-sm font-semibold text-gray-800">
                                Stock Level
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={stockLevel}
                                onChange={(e) =>
                                    setStockLevel(Number(e.target.value))
                                }
                                onFocus={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        '#9b1c1c')
                                }
                                onBlur={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        '#e5e7eb')
                                }
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e5e7eb',
                                    background: '#f8f6f4',
                                    fontSize: '0.9rem',
                                    color: '#1a1a1a',
                                    fontFamily: 'sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-1 flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-800">
                                Price
                            </label>
                            <input
                                type="text"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                onFocus={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        '#9b1c1c')
                                }
                                onBlur={(e) =>
                                    (e.currentTarget.style.borderColor =
                                        '#e5e7eb')
                                }
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #e5e7eb',
                                    background: '#f8f6f4',
                                    fontSize: '0.9rem',
                                    color: '#1a1a1a',
                                    fontFamily: 'sans-serif',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                        <button
                            onClick={handleSubmit}
                            onMouseEnter={(e) =>
                                ((
                                    e.currentTarget as HTMLButtonElement
                                ).style.background = '#7f1d1d')
                            }
                            onMouseLeave={(e) =>
                                ((
                                    e.currentTarget as HTMLButtonElement
                                ).style.background = '#9b1c1c')
                            }
                            onMouseDown={(e) =>
                                ((
                                    e.currentTarget as HTMLButtonElement
                                ).style.transform = 'scale(0.97)')
                            }
                            onMouseUp={(e) =>
                                ((
                                    e.currentTarget as HTMLButtonElement
                                ).style.transform = 'scale(1)')
                            }
                            style={{
                                padding: '11px 32px',
                                borderRadius: '10px',
                                background: '#9b1c1c',
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '0.02em',
                                fontFamily: 'sans-serif',
                                transition: 'background 0.2s, transform 0.1s',
                            }}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
