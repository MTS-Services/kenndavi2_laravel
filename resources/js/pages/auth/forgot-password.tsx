import { Form, Head } from '@inertiajs/react';
import { ArrowRightIcon, LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FrontendLayout from '@/layouts/frontend-layout';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <FrontendLayout>
            <Head title="Forgot Password" />
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg border border-text-gray-300 p-8">
                    <div className="text-center">
                        <h2 className="mb-5 font-bebas-neue text-xl font-normal text-text-title">
                            Forgot Password
                        </h2>
                        <p className="mb-8 font-aktiv-grotesk text-sm font-normal text-text-body">
                            Enter the email address or mobile phone number
                            associated with your Clicon account.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-lg bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600">
                            {status}
                        </div>
                    )}

                    <Form {...email.form()} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="email"
                                        className="font-aktiv-grotesk text-sm font-normal text-text-title"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoFocus
                                        placeholder="name@company.com"
                                        className="border border-text-gray-300 bg-background/50 focus:border-bg-button focus:ring-bg-button"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <Button
                                    className="w-full bg-bg-button font-poppins text-base font-normal text-text-white hover:bg-bg-button/90"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                                    )}
                                    Send Code{' '}
                                    <ArrowRightIcon className="h-5 w-5" />
                                </Button>

                                {/* divaidetor */}
                                <div className="w-full border border-text-gray-300"></div>
                                <p className="font-aktiv-grotesk text-sm font-normal text-text-title">
                                    You may contact <span className="text-text-buy-now">Customer Service</span> for help
                                    restoring access to your account.
                                </p>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </FrontendLayout>
    );
}
