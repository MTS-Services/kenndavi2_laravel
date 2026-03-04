import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
// import { request } from '@/routes/password';
import { store } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { Checkbox } from '@headlessui/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { SharedData } from '@/types';
import { ArrowRightIcon } from 'lucide-react';

const userType = new URLSearchParams(window.location.search).get('type');
interface LoginProps {
    userType: string;
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, userType }: LoginProps) {
    const { features } = usePage<SharedData>().props;

    return (
        <FrontendLayout>
            <Head title="Log in" />
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg border border-text-gray-300 p-8">
                    <div className="text-center">
                        <h2 className="mb-5 font-bebas-neue text-xl font-normal text-text-title">
                            Login to your account
                        </h2>
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
                                            htmlFor="email"
                                            className="mb-2 font-aktiv-grotesk text-sm font-normal text-text-title focus:border-text-gray-300!"
                                        >
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            placeholder="Email Address"
                                            className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

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
                                            placeholder="Password"
                                            className="block w-full appearance-none rounded-md border border-text-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm"
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            className="group relative h-5 w-5 rounded border border-text-gray-300 bg-white focus:ring-2 focus:ring-bg-button/20 data-[checked]:border-bg-button data-[checked]:bg-bg-button"
                                        >
                                            <svg
                                                className="pointer-events-none absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity group-data-[checked]:opacity-100"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Checkbox>
                                        <Label
                                            htmlFor="remember"
                                            className="ml-2 block font-aktiv-grotesk font-normal text-sm text-text-gray-300"
                                        >
                                            Keep me logged in
                                        </Label>
                                    </div>

                                    <div className="text-sm">
                                        <TextLink
                                            href={route('forgot-password')}
                                            className="font-aktiv-grotesk text-sm font-normal text-text-buy-now"
                                        >
                                            Forgot password?
                                        </TextLink>
                                    </div>
                                </div>

                                <div>
                                    <Button
                                        type="submit"
                                        className="flex w-full items-center justify-center rounded-sm bg-bg-button px-4 py-4 font-poppins text-base font-medium text-text-white shadow-sm hover:bg-bg-button/80"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <Spinner className="h-4 w-4" />
                                        ) : (
                                            'Log In'
                                        )}
                                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="">
                                    <span className="font-aktiv-grotesk text-sm font-normal text-text-title">
                                        Don't have an account?{' '}
                                    </span>
                                    <TextLink
                                        href={route('register')}
                                        className="font-aktiv-grotesk text-sm font-medium text-bg-button hover:text-bg-button/80"
                                    >
                                        Sign In
                                    </TextLink>
                                </div>

                                <div className="flex items-center justify-center">
                                    <div className="w-full border border-text-gray-300" />
                                    <div className="w-full text-sm">
                                        <p className="text-center font-aktiv-grotesk text-sm font-normal text-text-title">
                                            or continue with
                                        </p>
                                    </div>
                                    <div className="w-full border border-text-gray-300" />
                                </div>

                                <div>
                                    <Link className="flex w-fit items-center justify-center">
                                        <svg
                                            className="mr-2 h-12 w-12"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                    </Link>
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
