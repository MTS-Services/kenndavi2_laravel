import Logout from '@/components/logout';
import UserDashboardLayout from '@/layouts/user-dashboard-layout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ user }: { user: { name: string } }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const confirmLogout = () => {
        router.post(route('user.logout'));
    };
    return (
        <UserDashboardLayout>
            <div className="">
                <div className="w-full rounded-lg p-8">
                    <h2 className="mb-1.5 font-aktiv-grotesk text-xl font-normal text-text-title">
                        Hello {user.name} (not {user.name}?{' '}
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="cursor-pointer font-normal text-text-buy-now"
                        >
                            Log out
                        </button>
                        )
                    </h2>
                    <p className="mb-6 font-aktiv-grotesk text-sm font-normal text-text-title">
                        From your account dashboard you can view your{' '}
                        <Link href={route('user.orders')} className="cursor-pointer font-normal text-text-buy-now">
                            recent orders
                        </Link>{' '}
                        and manage your{' '}
                        <Link href={route('user.account-settings')} className="cursor-pointer font-normal text-text-buy-now">
                            account
                        </Link>
                        .
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link href={route('user.orders')}>
                        <div className="flex w-full flex-col items-center rounded-sm border border-text-gray-300 px-4 py-8 text-center sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-36">
                            <img
                                src="/assets/images/user-dashboard/material-symbols.png"
                                alt=""
                                className=""
                            />
                            <p className="mt-4 text-center font-aktiv-grotesk text-sm font-normal text-text-title sm:mt-6 sm:text-base">
                                orders
                            </p>
                        </div>
                    </Link>
                    <Link href={route('user.product-to-review')}>
                        <div className="flex w-full flex-col items-center rounded-sm border border-text-gray-300 px-4 py-8 text-center sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-36">
                            <img
                                src="/assets/images/user-dashboard/carbon_star-review.png"
                                alt=""
                                className=""
                            />
                            <p className="mt-4 text-center font-aktiv-grotesk text-sm font-normal text-text-title sm:mt-6 sm:text-base">
                                Product to review
                            </p>
                        </div>
                    </Link>

                    <Link href={route('user.account-settings')}>
                        <div className="flex w-full flex-col items-center rounded-sm border border-text-gray-300 px-4 py-8 text-center sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-36">
                            <img
                                src="/assets/images/user-dashboard/line-md_account.png"
                                alt=""
                                className=""
                            />
                            <p className="mt-4 text-center font-aktiv-grotesk text-sm font-normal text-text-title sm:mt-6 sm:text-base">
                                Account
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Logout Modal */}
                {showLogoutModal && (
                    <Logout
                        show={showLogoutModal}
                        onClose={() => setShowLogoutModal(false)}
                        onConfirm={confirmLogout}
                    />
                )}
            </div>
        </UserDashboardLayout>
    );
}
