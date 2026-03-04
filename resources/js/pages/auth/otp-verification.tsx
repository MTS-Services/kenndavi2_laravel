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
import { Checkbox } from '@/components/ui/checkbox';
import FrontendLayout from '@/layouts/frontend-layout';
import { SharedData } from '@/types';
import { ArrowRightIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const userType = new URLSearchParams(window.location.search).get('type');
interface LoginProps {
    userType: string;
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;

}

export default function OtpVerification({ status, userType }: LoginProps) {
    const { features } = usePage<SharedData>().props;
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (index: number, value: string) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        
        const newValues = [...otpValues];
        newValues[index] = numericValue;
        setOtpValues(newValues);

        // Auto-focus next input
        if (numericValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        
        const newValues = ['', '', '', '', '', ''];
        for (let i = 0; i < pastedData.length; i++) {
            newValues[i] = pastedData[i];
        }
        setOtpValues(newValues);
        
        // Focus the next empty input or the last one
        const nextEmptyIndex = newValues.findIndex(val => val === '');
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    const isOtpComplete = otpValues.every(value => value !== '');

    return (
        <FrontendLayout>
            <Head title="OTP Verification" />
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-lg border border-text-gray-300 p-8">
                    <div className="text-center">
                        <h2 className="mb-5 font-bebas-neue text-xl font-normal text-text-title">
                           OTP Verification
                        </h2>
                        <p className="text-sm text-text-body font-aktiv-grotesk font-normal">
                            Enter the verification code we just sent to your email address
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
                                            htmlFor="otp"
                                            className="mb-4 block text-center font-aktiv-grotesk text-sm font-normal text-text-title"
                                        >
                                            OTP Code
                                        </Label>
                                        
                                        {/* OTP Input Boxes */}
                                        <div className="flex justify-center gap-2">
                                            {otpValues.map((value, index) => (
                                                <Input
                                                    key={index}
                                                    ref={(el) => {
                                                        inputRefs.current[index] = el;
                                                    }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]"
                                                    maxLength={1}
                                                    value={value}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    onPaste={index === 0 ? handlePaste : undefined}
                                                    className="w-12 h-12 text-center text-lg font-semibold border border-text-gray-300 rounded-lg focus:border-text-buy-now focus:ring-2 focus:ring-text-buy-now/20 outline-none transition-all"
                                                    style={{ fontFamily: 'monospace' }}
                                                />
                                            ))}
                                        </div>
                                        
                                        <InputError message={errors.password} className="text-center mt-2" />
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
                                            'Verify OTP'
                                        )}
                                    </Button>
                                </div>

                                <div className="">
                                    <span className="font-aktiv-grotesk text-sm font-normal text-text-title">
                                       Didn’t receive a code?  
                                    </span>
                                    <TextLink
                                        href={route('register')}
                                        className="font-aktiv-grotesk text-sm font-medium text-bg-button hover:text-bg-button/80"
                                    >
                                        Resend
                                    </TextLink>
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
