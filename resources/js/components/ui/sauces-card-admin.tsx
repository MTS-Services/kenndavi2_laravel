import { Link } from "@inertiajs/react";
import { EditIcon,  Trash2 } from "lucide-react";

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

export default function SaucesCardAdmin({ sauce }: Props) {
    return (
        <div className="rounded-md bg-bg-card shadow-md">
            <div className="relative">
                <img
                    src={sauce.image}
                    alt={sauce.name}
                    className="w-full h-64 object-cover rounded-t-md"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-bg-white px-3 py-1 font-inter text-sm font-medium text-text-title">
                    {sauce.category}
                </span>
                <span className="absolute left-0 bottom-0 bg-text-green px-3 py-1 font-inter text-xs font-medium text-text-white">
                    Available 20
                </span>
            </div>
            <div className="p-6">   
                <h3 className="mb-2 font-bebas-neue text-3xl font-normal text-text-title">
                    {sauce.name}
                </h3>
                <p className="mb-4 font-aktiv-grotesk text-base font-normal text-text-body">
                   {sauce.description}
                </p>
                <div className="flex items-center justify-between">
                    <Link href="#" className="flex items-center gap-3.5 font-inter text-base font-medium text-text-green border border-text-green px-8 py-2.5 rounded-md bg-bg-our-story">
                        <EditIcon /> Edit
                    </Link>
                    <Link 
                        href="#"
                        className="flex items-center gap-3.5 font-inter text-base font-medium text-text-buy-now border border-text-buy-now px-8 py-2.5 rounded-md bg-text-buy-now/5"
                    >
                      <Trash2 />  Delete
                    </Link>
                </div>
            </div>
        </div>
    );
}