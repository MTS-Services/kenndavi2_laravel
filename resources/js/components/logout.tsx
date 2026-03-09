import { LogOut } from "lucide-react";

interface LogoutProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function Logout({ show, onClose, onConfirm }: LogoutProps) {

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[92%] max-w-sm rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-4 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                        <LogOut className="h-7 w-7 text-red-600" />
                    </div>

                    <h2 className="text-2xl font-extrabold text-gray-900">
                        Confirm Logout
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to sign out of your account?
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <button
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 cursor-pointer"
                    >
                        Log Out
                    </button>

                </div>
            </div>
        </div>
    );
}