<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'profile_picture' => 'nullable|string',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'feedback' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $feedback = Feedback::create($request->all());

        return response()->json([
            'message' => 'Feedback submitted successfully!',
            'feedback' => $feedback
        ], 201);
    }
    public function index()
    {
        $feedback = Feedback::all();

        $feedback = $feedback->map(function ($feedback) {
            $feedback->profile_picture_url = asset('uploads/' . $feedback->profile_picture); 
            return $feedback;
        });

        return response()->json([
            'feedback' => $feedback,
            'total' => count($feedback),
        ]);
    }
    public function destroy($id)
    {
        $feedback = Feedback::find($id);
        
        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        $feedback->delete();
        return response()->json(['message' => 'Feedback deleted successfully']);
    }
}
