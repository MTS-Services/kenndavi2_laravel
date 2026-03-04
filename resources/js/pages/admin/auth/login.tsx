import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes/admin';
import { Link, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send data to Laravel login route
        post(login.url()); // Laravel route URL
    };

    return (
        <AuthLayout
            title="Northside Admin Log IN"
            description="Please fill in your unique admin login details below"
        >
            <div className="">
                <h2 className=""></h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <Label
                        htmlFor="email"
                        className="mb-2 font-inter text-base font-normal text-text-title"
                    >
                        Email address
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        placeholder="you@example.com"
                        required
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

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
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="text-sm">
                    <Link
                        href={route('admin.forgot-password')}
                        className="mb-2 font-inter text-base font-normal text-text-body"
                    >
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md y px-4 py-3 font-inter text-base font-normal text-text-white bg-bg-button cursor-pointer"
                >
                    {processing ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </AuthLayout>
    );
}
