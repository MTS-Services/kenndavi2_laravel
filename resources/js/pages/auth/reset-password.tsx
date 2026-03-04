import { Head, useForm } from '@inertiajs/react';
import { ArrowRightIcon, LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import FrontendLayout from '@/layouts/frontend-layout';

interface ResetPasswordProps {
    email: string;
}

export default function ResetPassword({ email }: ResetPasswordProps) {
    const { post, data, setData, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('reset-password.post'));
    };

    return (
        <FrontendLayout>
            <Head title="Reset Password" />

            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg border border-text-gray-300 p-8">
                    <div className="text-center">
                        <h2 className="mb-5 font-bebas-neue text-xl font-normal text-text-title">
                            Reset Password
                        </h2>
                        <p className="mb-8 font-aktiv-grotesk text-sm font-normal text-text-body">
                            Set your new password for{' '}
                            <span className="font-medium text-text-title">{email}</span>.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="password"
                                    className="mb-2 font-aktiv-grotesk text-sm font-normal text-text-title"
                                >
                                    New Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="8+ characters"
                                    className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label
                                    htmlFor="password_confirmation"
                                    className="mb-2 font-aktiv-grotesk text-sm font-normal text-text-title"
                                >
                                    Confirm Password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Confirm your new password"
                                    className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="flex w-full items-center justify-center bg-bg-button px-4 py-4 font-poppins text-base font-medium text-text-white shadow-sm hover:bg-bg-button/80"
                            disabled={processing}
                        >
                            {processing ? (
                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                            ) : null}
                            Reset Password
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </FrontendLayout>
    );
}