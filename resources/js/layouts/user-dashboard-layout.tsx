import FrontendLayout from './frontend-layout';
import Sidebar from './partials/user/sidebar';

interface UserDashboardLayoutProps {
    children: React.ReactNode;
}
export default function UserDashboardLayout({
    children,
}: UserDashboardLayoutProps) {
    return (
        <div>
            <FrontendLayout>
            
                <div className="container px-4 mx-auto my-20">
                    <div className="block md:flex gap-10">
                        <Sidebar />

                        <div className="flex w-full flex-col">
                            <main className="mt-6">{children}</main>
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </div>
    );
}
