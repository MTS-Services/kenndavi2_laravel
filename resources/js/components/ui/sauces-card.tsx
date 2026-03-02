import { Link } from "@inertiajs/react";

interface SauceData {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
    href: string;
}

interface Props {
    sauce: SauceData;
}

export default function SaucesCard({ sauce }: Props) {
    return (
        <div className="rounded-md bg-bg-card shadow-md px-4 py-3">
            <div className="relative">
              <Link href={sauce.href}>
                <img
                    src={sauce.image}
                    alt={sauce.name}
                    className="w-full h-64 object-cover rounded-t-md"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-bg-white px-3 py-1 font-inter text-sm font-medium text-text-title">
                    {sauce.category}
                </span>
                </Link>
            </div>
            <div className="mt-3">   
               <Link href={sauce.href}>
                <h3 className="mb-2 font-bebas-neue text-3xl font-normal text-text-title">
                    {sauce.name}
                </h3>
                </Link>
               <Link href={sauce.href}>
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body">
                   {sauce.description}
                </p>
               </Link>
                <div className="flex items-center justify-between">
                    <span className="font-aktiv-grotesk text-2xl font-normal text-text-title">
                        Price {sauce.price}
                    </span>
                    <Link 
                        href={sauce.href}
                        className="rounded-md bg-bg-button  px-3 sm:px-6 py-1.5 sm:py-3 font-inter text-base font-medium text-text-white"
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
}