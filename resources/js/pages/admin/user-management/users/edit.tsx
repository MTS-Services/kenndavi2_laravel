import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { update, index } from '@/actions/App/Http/Controllers/Admin/UserManagement/UserController';
import FileUpload from '@/components/file-upload';
import { toast } from 'sonner';
import { User } from '@/types';
import { PasswordInput } from '@/components/ui/password-input';
import InputError from '@/components/input-error';
import password from '@/routes/password';

interface Props {
    user: User;
}

export default function EditUser({ user }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name ?? '',
        id: user.id ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        image: null as File | null,
        password: '',
        password_confirmation: '',
        _method: 'PUT',
    });
    const [existingFiles, setExistingFiles] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            

            // Update existing files whenever information changes
            if (user.image) {
                setExistingFiles([{
                    id: user.id,
                    url: `${user.image_url}`,
                    name: user.image.split('/').pop(),
                    mime_type: 'image/*',
                    path: user.image,
                }]);
            } else {
                setExistingFiles([]);
            }
        }
    }, [user]);

    const handleRemoveExisting = () => {
        if (confirm('Are you sure you want to remove this file? You must upload a new file to save the changes.')) {
            setExistingFiles([]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // @ts-ignore - Inertia will handle FormData correctly
        post(route('admin.um.user.update', user.id), {
            forceFormData: true,
            onSuccess: () => {
                // Clear the "New Files" preview after successful upload
                setData('image', null);
                reset('image');
                setExistingFiles([]);
                toast.success('User updated successfully.');
            },
            onError: () => {
                toast.error('Failed to update user.');
            }
        });
    };

    return (
        <AdminLayout activeSlug="user-management">
            <Head title={`Edit User: ${user.name}`} />

            <CardHeader className="flex items-center flex-row justify-between">
                <h1 className="text-2xl font-bold">Edit User</h1>
                <Link href={index.url()} className="ml-auto">
                    <Button>Back to Users</Button>
                </Link>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-4 grid md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image</Label>
                            <FileUpload
                                value={data.image}
                                onChange={(file) => setData('image', file as File | null)}
                                existingFiles={existingFiles}
                                onRemoveExisting={handleRemoveExisting}
                                accept="image/*"
                                maxSize={10}
                            />
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
                                    placeholder=""
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
                                    placeholder=""
                                    className="h-11 border-gray-200 bg-white/50 px-4! py-3!"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update User'}
                        </Button>
                        <Link href={index.url()}>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </CardContent>
        </AdminLayout>
    );
}
