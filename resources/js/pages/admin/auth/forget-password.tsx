import AuthLayout from '@/layouts/auth-layout';
import { forgotPassword } from '@/routes/admin';
import { Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function ForgetPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Send data to Laravel login route
        post(forgotPassword.url()); // Laravel route URL
    };

    return (
        <AuthLayout
            title="Forget Password"
            description="Enter the email address or mobile phone number associated with your Clicon account."
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
                        className="lock w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                        placeholder="you@example.com"   
                        required
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md y px-4 py-3 font-inter text-base font-normal text-text-white bg-bg-button cursor-pointer uppercase"
                >
                    {processing ? 'Sending...' : 'Send Code'} <ArrowRight className="inline ml-1" />
                </button>
            </form>
        </AuthLayout>
    );
}
