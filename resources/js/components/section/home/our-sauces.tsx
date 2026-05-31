import Pagination from "@/components/ui/pagination";
import SaucesCard from "@/components/ui/sauces-card";

interface Props {
    products?: {
        data?: any[];
        links?: any[];
    };
}

export default function OurSauces({ products }: Props) {
    const items = products?.data ?? [];

    return (
        <div id="our-sauces" className="mt-12 sm:mt-28">
            <div className="container mx-auto px-4">

                <h2 className="font-bebas-neue text-center text-3xl sm:text-[56px] mb-8">
                    Our Sauces
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((product) => (
                        <SaucesCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination products={products} />

            </div>
        </div>
    );
}