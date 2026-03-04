import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import FrontendLayout from '@/layouts/frontend-layout';
import { store } from '@/routes/admin';
import { ArrowRightIcon } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <FrontendLayout>
            <Head title="Reset password" />

            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg border border-text-gray-300 p-8">
                    <div className="text-center">
                        <h2 className="mb-5 font-bebas-neue text-xl font-normal text-text-title">
                            Reset Password
                        </h2>
                        <p className="mb-8 font-aktiv-grotesk text-sm font-normal text-text-body">
                            Set your new password, new beginning here.
                        </p>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="mt-8 space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                
                                    <div>
                                        <Label
                                            htmlFor="password"
                                            className="mb-2 font-aktiv-grotesk text-sm font-normal text-text-title focus:border-text-gray-300!"
                                        >
                                            Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            placeholder="8+ Password"
                                            className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="password"
                                            className="mb-2 font-aktiv-grotesk text-sm font-normal text-text-title focus:border-text-gray-300!"
                                        >
                                            Confirm Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            placeholder="Confirm Password"
                                            className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                </div>

                               

                                <div>
                                    <Button
                                        type="submit"
                                        className="flex w-full items-center justify-center bg-bg-button px-4 py-4 font-poppins text-base font-medium text-text-white shadow-sm hover:bg-bg-button/80"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <Spinner className="h-4 w-4" />
                                        ) : (
                                            'Reset Password'
                                        )}
                                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </Button>
                                </div> 
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="mt-4 rounded-md bg-green-50 p-4">
                            <div className="text-sm text-green-800">
                                {status}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}
