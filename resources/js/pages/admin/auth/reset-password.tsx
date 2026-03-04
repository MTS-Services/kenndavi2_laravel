import TextLink from '@/components/text-link';
import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes/admin';
import { Link, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { ArrowRightIcon } from 'lucide-react';

export default function ResetPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Send data to Laravel login route
        post(login.url()); // Laravel route URL
    };

    return (
        <AuthLayout
            title="Reset Password"
            description="Two hundred arrows are fired, so many elephants are like sapiens. The frogs are sitting on the ground, the pharingilla is sitting on the ground."
        >
            <div className="">
                <h2 className=""></h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                

                <div>
                    <Label
                        htmlFor="password"
                        className="mb-2 font-inter text-base font-normal text-text-title"
                    >
                        Password
                    </Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 font-inter text-base font-normal text-text-title"
                    >
                        Confirm Password
                    </label>
                    <PasswordInput
                        id="password"
                        name="password_confirmation"
                        required
                        placeholder="••••••••"
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center rounded-md y px-4 py-3 font-inter text-base font-normal text-text-white bg-bg-button cursor-pointer uppercase"
                >
                    {processing ? 'Resetting...' : 'Reset Password'}<ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
            </form>
        </AuthLayout>
    );
}
