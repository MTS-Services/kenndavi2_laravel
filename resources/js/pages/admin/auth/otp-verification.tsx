import AuthLayout from '@/layouts/auth-layout';
import { forgotPassword } from '@/routes/admin';
import { Link,  useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function OtpVerification() {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send data to Laravel login route
        post(forgotPassword.url()); // Laravel route URL
    };

    return (
        <AuthLayout
            title="OTP Verification"
            description="Enter the verification code we just sent to your email address"
        >
            <div className="">
                <h2 className=""></h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                
                    <input
                        type="text"
                        id="otp"
                        value={data.otp}
                        onChange={(e) => setData('otp', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        placeholder="you@example.com"
                        required
                    />
                    <input
                        type="text"
                        id="otp"
                        value={data.otp}
                        onChange={(e) => setData('otp', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        placeholder="you@example.com"
                        required
                    />
                    <input
                        type="text"
                        id="otp"
                        value={data.otp}
                        onChange={(e) => setData('otp', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        placeholder="you@example.com"
                        required
                    />
                    <input
                        type="text"
                        id="otp"
                        value={data.otp}
                        onChange={(e) => setData('otp', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        placeholder="you@example.com"
                        required
                    />
                    <input
                        type="text"
                        id="otp"
                        value={data.otp}
                        onChange={(e) => setData('otp', e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3"
                        placeholder="you@example.com"
                        required
                    />
                    {errors.otp && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.otp}
                        </p>
                    )}
                </div>


                <button
                    type="submit"
                    disabled={processing}
                    className="y w-full cursor-pointer rounded-md bg-bg-button px-4 py-3 font-inter text-base font-normal text-text-white"
                >
                    {processing ? 'Verifying...' : 'Verify'}{' '}
                </button>

                <div className="text-sm">
                    <p className="mb-2 font-inter text-base font-normal text-text-body">
                        Didn’t receive a code?{' '}
                        <Link
                            href={route('admin.forgot-password')}
                            className="font-inter text-base font-normal text-text-body underline"
                        >
                            Resend
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
