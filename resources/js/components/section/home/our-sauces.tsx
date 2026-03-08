import SaucesCard from "@/components/ui/sauces-card";
 
 
 
interface Props {
    products?: {
        data?: any[];
    };
}
 
export default function OurSauces({ products }: Props) {
    const items = products?.data ?? [];

    return (
        <div id="our-sauces" className="mt-12 sm:mt-28">
            <div className="container mx-auto px-4">
                <h2 className="font-bebas-neue text-center text-text-title text-3xl sm:text-[56px] font-normal mb-8">
                    Our Sauces
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.slice(0, 3).map((product) => (
                        <SaucesCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
