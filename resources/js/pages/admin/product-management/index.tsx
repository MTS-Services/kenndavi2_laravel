import ProductCardAdmin, { productData } from '@/components/ui/product-card-admin';
import AdminLayout from '@/layouts/admin-layout';
import { Link, usePage } from '@inertiajs/react';

interface PageProps {
    [key: string]: any;
    products: {
        data: productData[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
    };
}

export default function Index() {
    const { props } = usePage<PageProps>();
    const products = props.products;

    return (
        <AdminLayout activeSlug={'product-management'}>
            <div className="flex items-center justify-between">
                <h2 className="font-poppins xl sm:text-4xl font-medium text-text-title">
                    Manage your products
                </h2>
                <Link href={route('admin.pm.create')}
                    className="rounded-xl bg-bg-button px-3 sm:px-6 py-2 sm:py-4 font-inter text-base sm:text-xl font-medium text-text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                    Add a new product
                </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
                {products.data.map((product) => (
                    <ProductCardAdmin key={product.id} product={product} />
                ))}
            </div>
            <div className="flex items-center justify-between py-4">
                <span className="font-poppins text-sm font-medium text-text-green">
                    Showing {products.from || 0} to {products.to || 0} of {products.total} results
                </span>

                <div className="flex gap-2">
                    <button 
                        disabled={products.current_page <= 1}
                        className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    <button 
                        disabled={products.current_page >= products.last_page}
                        className="rounded-lg border border-text-green px-4 py-1.5 text-sm font-medium text-text-green transition-colors hover:bg-bg-light-green disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
