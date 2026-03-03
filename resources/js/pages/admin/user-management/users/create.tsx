import React, { useEffect } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { store, index } from '@/actions/App/Http/Controllers/Admin/UserManagement/UserController';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FileUpload from '@/components/file-upload';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PasswordInput } from '@/components/ui/password-input';
import InputError from '@/components/input-error';

interface FormData {
    files: File | File[] | null;
    name: string;
    email: string;
    phone: string;
    image: null | File | null,
    password: string;
    password_confirmation: string;
}

export default function CreateUser() {
    
    const { data, setData, post, processing, errors } = useForm<FormData>({
        files: null,

        name: '',
        email: '',
        phone: '',
        image: null,
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // post(store.url(), {
        //     onSuccess: () => router.visit(index.url()),
        // });

        post(route('admin.um.user.store'), {
            onSuccess: () => router.visit(route('admin.um.users.index')),
        });
    }

    return (
        <AdminLayout activeSlug="admin-users">
            <Head title="Create User" />

            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle className='text-2xl'>Create New User</CardTitle>
                    <Link href={index.url()} className="ml-auto">
                        <Button>Back to Users</Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4 grid md:grid-cols-2 gap-6">
                            {/* Image */}
                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <FileUpload
                                    value={data.image}
                                    onChange={(file) => setData('image', file as File | null)}
                                    accept="image/*"
                                    maxSize={10}
                                />
                                <InputError message={errors.image} />
                            </div>
                            <div></div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}

                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    placeholder="********"
                                    className="h-11 border-gray-200 bg-white/50 px-4! py-3!"
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    placeholder="********"
                                    className="h-11 border-gray-200 bg-white/50 px-4! py-3!"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create User'}
                            </Button>
                            <Link href={index.url()}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
