import React from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { DataTable } from '@/components/ui/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { PaginationData, ColumnConfig, ActionConfig } from '@/types/data-table.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductTag extends Record<string, unknown> {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  tags: {
    data: ProductTag[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number | null;
    to?: number | null;
  };
  pagination: PaginationData;
  offset: number;
  filters: Record<string, string | number>;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function index({
  tags,
  pagination,
  offset,
  filters,
  search,
  sortBy,
  sortOrder,
}: Props) {
  const {
    isLoading,
    handleSearch,
    handleFilterChange,
    handleSort,
    handlePerPageChange,
    handlePageChange,
  } = useDataTable();

  const columns: ColumnConfig<ProductTag>[] = [
    {
      key: 'name',
      label: 'Tag Name',
      sortable: true,
      render: (tag) => (
        <div className="font-medium text-text-title">
          {tag.name}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (tag) => (
        <Badge 
          className={
            tag.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }
        >
          {tag.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'Created Date',
      sortable: true,
      render: (tag) => (
        <div className="text-text-body">
          {new Date(tag.created_at).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'updated_at',
      label: 'Updated Date',
      sortable: true,
      render: (tag) => (
        <div className="text-text-body">
          {new Date(tag.updated_at).toLocaleDateString()}
        </div>
      ),
    },
  ];

  const actions: ActionConfig<ProductTag>[] = [
    // {
    //   label: 'View',
    //   icon: <Eye className="h-4 w-4" />,
    //   onClick: (tag) => {
    //     router.visit(route('admin.tm.show', tag?.id));
    //   },
    // },
    {
      label: 'Edit',
      icon: <Pencil className="h-4 w-4" />,
      onClick: (tag) => {
        router.visit(route('admin.tm.edit', tag?.id));
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (tag) => {
        if (confirm(`Are you sure you want to delete ${tag.name}?`)) {
          router.visit(route('admin.tm.delete', tag?.id));
        }
      },
      variant: 'destructive',
    },
  ];

  return (
    <AdminLayout activeSlug="tag-management">
      <Head title="Tag Management" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Tag Management
        </h2>
        <Link href={route('admin.tm.create')}>
          <Button className="flex items-center gap-2">
            Create Tag
          </Button>
        </Link>
      </div>

      <div className="mx-auto">
        <DataTable
          data={tags?.data || []}
          columns={columns}
          pagination={tags as any}
          offset={offset}
          showNumbering={true}
          actions={actions}
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ],
            },
          ]}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSort={handleSort}
          onPerPageChange={handlePerPageChange}
          onPageChange={handlePageChange}
          searchValue={search}
          filterValues={filters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          isLoading={isLoading}
          emptyMessage="No tags found"
          searchPlaceholder="Search tags by name..."
        />
      </div>
    </AdminLayout>
  );
}
