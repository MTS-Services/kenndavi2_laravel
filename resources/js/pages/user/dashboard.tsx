import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <UserDashboardLayout>
            <div className="">
                <div className="w-full rounded-lg p-8">
                    <h2 className="mb-1.5 font-aktiv-grotesk text-base font-normal text-text-title">
                        Hello John (not John?{' '}
                        <span className="cursor-pointer font-normal text-text-buy-now">
                            Log out
                        </span>
                        )
                    </h2>
                    <p className="mb-6 font-aktiv-grotesk text-xs font-normal text-text-title">
                        From your account dashboard you can view your{' '}
                        <span className="cursor-pointer font-normal text-text-buy-now"> 
                            recent orders
                        </span>{' '}
                        and manage your{' '}
                        <span className="cursor-pointer font-normal text-text-buy-now">
                            account
                        </span>
                        .
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link href="#">
                        <div className="flex w-full flex-col items-center rounded-sm border border-text-gray-300 px-4 py-8 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-36 text-center">
                            <img
                                src="/assets/images/user-dashboard/material-symbols.png"
                                alt=""
                                className=""
                            />
                            <p className="mt-4 sm:mt-6 text-center font-aktiv-grotesk text-sm sm:text-base font-normal text-text-title">
                                orders
                            </p>
                        </div>
                    </Link>
                    <Link href="#">
                        <div className="flex w-full flex-col items-center rounded-sm border border-text-gray-300 px-4 py-8 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-36 text-center">
                            <img
                                src="/assets/images/user-dashboard/carbon_star-review.png"
                                alt=""
                                className=""
                            />
                            <p className="mt-4 sm:mt-6 text-center font-aktiv-grotesk text-sm sm:text-base font-normal text-text-title">
                                orders
                            </p>
                        </div>
                    </Link>

                    <Link href="#">
                        <div className="flex w-full flex-col items-center rounded-sm border border-text-gray-300 px-4 py-8 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-36 text-center">
                            <img
                                src="/assets/images/user-dashboard/line-md_account.png"
                                alt=""
                                className=""
                            />
                            <p className="mt-4 sm:mt-6 text-center font-aktiv-grotesk text-sm sm:text-base font-normal text-text-title">
                                orders
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </UserDashboardLayout>
    );
}
