import { Link, useForm } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { useState, useRef } from 'react';

interface LoginProps {
    status?: string;
}

export default function OtpVerification({ status }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        otp: '',
    });
    
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (index: number, value: string) => {
        // Only allow numbers
        const numericValue = value.replace(/[^0-9]/g, '');
        
        const newValues = [...otpValues];
        newValues[index] = numericValue;
        setOtpValues(newValues);

        // Update form data
        const fullOtp = newValues.join('');
        setData('otp', fullOtp);

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
        
        // Update form data
        const fullOtp = newValues.join('');
        setData('otp', fullOtp);
        
        // Focus the next empty input or the last one
        const nextEmptyIndex = newValues.findIndex(val => val === '');
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullOtp = otpValues.join('');
        setData('otp', fullOtp);
        post(route('admin.otp-verification.post'));
    };

    return (
        <AuthLayout title="OTP Verification" description="Enter the verification code we just sent to your email address">
            <div className="">
                <h2 className=""></h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex justify-center gap-2 items-center">
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
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className="h-12 w-12 rounded-lg border border-text-gray-300 text-center text-lg font-semibold transition-all outline-none focus:border-text-buy-now focus:ring-2 focus:ring-text-buy-now/20"
                                style={{ fontFamily: 'monospace' }}
                            />
                        ))}
                    </div>
                </div>

                <InputError message={errors.otp} className="text-center" />

                <button
                    type="submit"
                    disabled={processing}
                    className="y w-full cursor-pointer rounded-md bg-bg-button px-4 py-3 font-inter text-base font-normal text-text-white"
                >
                    {processing ? 'Verifying...' : 'Verify'}{' '}
                </button>

                <div className="text-sm">
                    <p className="mb-2 font-inter text-base font-normal text-text-body">
                        Didn't receive a code?{' '}
                        <Link
                            href={route('admin.forgot-password')}
                            className="font-inter text-base font-normal text-text-body underline"
                        >
                            Resend
                        </Link>
                    </p>
                </div>
            </form>

            {status && (
                <div className="mt-4 rounded-md bg-green-50 p-4">
                    <div className="text-sm text-green-800">
                        {status}
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
