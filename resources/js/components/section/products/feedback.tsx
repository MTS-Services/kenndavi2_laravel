import { Star, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

type RatingBreakdownRow = {
    stars: number;
    percentage: number;
    count: string;
};

type Feedback = {
    name: string;
    time: string;
    rating: number;
    comment: string;
    image: string | null;
};

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    feedbacks: Feedback[];
    ratingBreakdown: Array<{
        stars: number;
        percentage: number;
        count: number;
    }>;
    averageRating: number;
    totalReviews: number;
}

export default function ProductFeedback({ currentPage, totalPages, onPageChange, feedbacks, ratingBreakdown, averageRating, totalReviews }: Props) {
    
    const paginatedFeedbacks = feedbacks.slice(
        (currentPage - 1) * 4,
        currentPage * 4
    );

    return (
        <div id="customer-feedback" className="my-16">
            <h2 className="mb-8 font-bebas-neue text-[40px] font-normal uppercase text-text-title">Customer Feedback</h2>

            <div className="mb-10 flex flex-col gap-6 md:flex-row">
                <div className="flex min-w-50 flex-col items-center justify-center rounded-sm border bg-[#FBF4CE] px-10 py-8">
                    <span className="font-public-sans text-[56px] font-medium text-base text-text-title">{averageRating}</span>
                    <div className="mt-2"><StarRating rating={averageRating} size="md" /></div>
                    <p className="mt-2 font-public-sans text-sm font-normal text-text-body">
                        Customer Rating{' '}
                        <span className="font-public-sans text-base font-normal text-text-gray-300">({totalReviews})</span>
                    </p>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-2">
                    {ratingBreakdown.map((row: any) => (
                        <div key={row.stars} className="flex items-center gap-3">
                            <div className="flex w-24 shrink-0 items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className={`h-3.5 w-3.5 ${index < row.stars ? 'fill-text-star-rating text-text-star-rating' : 'fill-gray-200 text-gray-200'}`} />
                                ))}
                            </div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full rounded-full bg-text-star-rating" style={{ width: `${row.percentage}%` }} />
                            </div>
                            <div className="flex w-24 shrink-0 items-center gap-1.5">
                                <span className="font-public-sans text-sm font-semibold text-text-title">{row.percentage}%</span>
                                <span className="font-public-sans text-xs font-normal text-text-gray-300">({row.count})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8 w-full border-b border-gray-100" />

            <h3 className="mb-6 font-public-sans text-base font-semibold text-text-title">Customer Feedback</h3>

            <div className="max-w-2xl space-y-7">
                {paginatedFeedbacks.map((feedback) => (
                    <div key={`${feedback.name}-${feedback.time}`}>
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                {feedback.image ? (
                                    <img
                                        src={feedback.image}
                                        alt={feedback.name}
                                        className="h-full w-full object-cover"
                                        onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">No Image</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-public-sans text-sm font-semibold text-text-title">{feedback.name}</span>
                                <span className="text-xs text-text-gray-300">·</span>
                                <span className="font-public-sans text-xs font-normal text-text-gray-300">{feedback.time}</span>
                            </div>
                        </div>
                        <StarRating rating={feedback.rating} size="sm" />
                        <p className="mt-1.5 font-aktiv-grotesk text-sm font-normal text-text-body">{feedback.comment}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}

type StarRatingProps = { rating: number; size?: 'sm' | 'md' };

function StarRating({ rating, size = 'sm' }: StarRatingProps) {
    const iconClass = size === 'md' ? 'h-5 w-5' : 'h-4 w-4';
    return (
        <div className="flex items-center gap-0.5 text-text-star-rating">
            {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className={`${iconClass} ${index < rating ? 'fill-text-star-rating text-text-star-rating' : 'fill-gray-200 text-gray-200'}`} />
            ))}
        </div>
    );
}

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | '...')[] = [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        pages.push(totalPages);

        return pages;
    };

    const btnBase = 'flex h-9 w-9 items-center justify-center font-public-sans text-sm font-medium transition-colors border';
    const activeBtn = 'bg-red-600 text-white border-red-600';
    const inactiveBtn = 'bg-white text-text-title border-gray-200 hover:border-red-400 hover:text-red-600';
    const arrowBtn = 'flex h-9 w-9 items-center justify-center border border-gray-200 bg-white text-text-body transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-text-body';

    return (
        <div className="flex items-center gap-1.5">
            {/* First */}
            <button type="button" onClick={() => onPageChange(1)} disabled={currentPage === 1} className={arrowBtn}>
                <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Prev */}
            <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={arrowBtn}>
                <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="flex h-9 w-9 items-center justify-center font-public-sans text-sm text-text-body">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page as number)}
                        className={`${btnBase} ${currentPage === page ? activeBtn : inactiveBtn}`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={arrowBtn}>
                <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last */}
            <button type="button" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={arrowBtn}>
                <ChevronsRight className="h-4 w-4" />
            </button>
        </div>
    );
}