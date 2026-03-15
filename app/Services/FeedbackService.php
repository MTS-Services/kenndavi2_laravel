<?php

namespace App\Services;

use App\Models\Feedback;

class FeedbackService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected Feedback $feedback)
    {}
    
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
        return $this->feedback->all();
    }

public function getUserFeedbacks($userId)
{
    return $this->feedback
        ->where('user_id', $userId)
        ->get(['product_id','order_id']);
}

}
