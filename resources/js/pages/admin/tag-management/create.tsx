import React from 'react';
import { Head, useForm, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';

interface TagFormData {
    name: string;
    status: string;
}

export default function CreateTag() {
    const { props } = usePage();
    const statuses = props.statuses as Array<{ value: string; label: string }>;

    const { data, setData, post, processing, errors } = useForm<TagFormData>({
        name: '',
        status: 'active',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('admin.tm.store'), {
            onSuccess: () => router.visit(route('admin.tm.index')),
        });
    }

    return (
        <AdminLayout activeSlug="tag-management">
            <Head title="Create Tag" />

            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle className='text-2xl'>Create New Tag</CardTitle>
                    <Link href={route('admin.tm.index')} className="ml-auto">
                        <Button>Back to Tags</Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4 grid md:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Tag Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter tag name"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses?.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Tag'}
                            </Button>
                            <Link href={route('admin.tm.index')}>
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
