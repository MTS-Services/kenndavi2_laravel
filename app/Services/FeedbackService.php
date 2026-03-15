<?php

namespace App\Services;

use App\Models\Feedback;

class FeedbackService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected Feedback $feedback) {}

    public function create(array $data)
    {
        return $this->feedback->create($data);
    }

    public function update($id, array $data)
    {
        return $this->feedback->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return $this->feedback->where('id', $id)->delete();
    }

    public function find($id)
    {
        return $this->feedback->where('id', $id)->first();
    }

    public function all()
    {
        return $this->feedback->orderBy('created_at', 'desc')->get();
    }

    public function getUserFeedbacks($userId)
    {
        return $this->feedback
            ->where('user_id', $userId)
            ->get(['product_id', 'order_id']);
    }
    public function getFeedbacksByProductId($productId)
    {
        $feedbacks = $this->feedback
            ->where('product_id', $productId)
            ->with('user')
            ->get();

        // Calculate rating breakdown
        $ratingCounts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, index 4 = 5 stars
        $totalFeedbacks = $feedbacks->count();

        foreach ($feedbacks as $feedback) {
            if ($feedback->rating >= 1 && $feedback->rating <= 5) {
                $ratingCounts[$feedback->rating - 1]++;
            }
        }

        $ratingBreakdown = [];
        for ($i = 4; $i >= 0; $i--) { // Show 5 stars first
            $ratingBreakdown[] = [
                'stars' => $i + 1,
                'percentage' => $totalFeedbacks > 0 ? round(($ratingCounts[$i] / $totalFeedbacks) * 100) : 0,
                'count' => $ratingCounts[$i]
            ];
        }

        // Calculate average rating
        $averageRating = 0;
        if ($totalFeedbacks > 0) {
            $totalRating = $feedbacks->sum('rating');
            $averageRating = floor(($totalRating / $totalFeedbacks) * 10) / 10;
        }

        // Transform feedback data for frontend
        $transformedFeedbacks = $feedbacks->map(function ($feedback) {
            return [
                'id' => $feedback->id,
                'name' => $feedback->user->name ?? 'Anonymous User',
                'time' => $feedback->created_at->format('M j, Y'),
                'rating' => $feedback->rating,
                'comment' => $feedback->message,
                'image' => $feedback->user->image_url ?? null
            ];
        });

        return [
            'feedbacks' => $transformedFeedbacks,
            'rating_breakdown' => $ratingBreakdown,
            'average_rating' => $averageRating,
            'total_reviews' => $totalFeedbacks
        ];
    }
}
