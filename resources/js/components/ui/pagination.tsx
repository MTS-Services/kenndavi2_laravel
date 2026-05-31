import { Link } from '@inertiajs/react';

interface Props {
    products?: {
        data?: any[];
        links?: any[];
        prev_page_url?: string | null;
        next_page_url?: string | null;
    };
}

export default function Pagination({ products }: Props) {
    const links = products?.links ?? [];

    const hasPagination =
        products &&
        products.data &&
        products.data.length > 0 &&
        links.length > 3;

    if (!hasPagination) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

            {products?.prev_page_url && (
                <Link
                    href={products.prev_page_url}
                    className="px-4 py-2 border rounded hover:bg-gray-200"
                >
                    Previous
                </Link>
            )}

            {links.map((link, index) => {

                if (!link.label || link.label.includes('Previous') || link.label.includes('Next')) {
                    return null;
                }

                return (
                    <Link
                        key={index}
                        href={link.url || ''}
                        className={`px-4 py-2 border rounded transition ${
                            link.active
                                ? 'block w-fit bg-bg-button font-bebas-neue text-xl font-normal text-text-white'
                                : 'bg-white text-black hover:bg-gray-200 font-bebas-neue text-xl'
                        } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}

            {products?.next_page_url && (
                <Link
                    href={products.next_page_url}
                    className="px-4 py-2 border rounded hover:bg-gray-200"
                >
                    Next
                </Link>
            )}

        </div>
    );
}