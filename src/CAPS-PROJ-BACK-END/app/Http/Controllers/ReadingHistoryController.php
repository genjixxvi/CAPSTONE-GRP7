<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReadingHistory;
use Illuminate\Support\Facades\Auth;

class ReadingHistoryController extends Controller
{
    public function store(Request $request) 
    {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'bookId' => 'required|integer',
            'title' => 'required|string',
            'author' => 'nullable|string',
            'cover' => 'nullable|string',
            'downloadCount' => 'nullable|integer',
            'readFormat' => 'nullable|string',
            'downloadFormat' => 'nullable|string',
        ]);

        $history = ReadingHistory::updateOrCreate(
            ['user_id' => $request->userId, 'book_id' => $request->bookId],
            [
                'title' => $request->title,
                'author' => $request->author,
                'cover' => $request->cover,
                'download_count' => $request->downloadCount,
                'read_format' => $request->readFormat,
                'download_format' => $request->downloadFormat,
                'updated_at' => now(),
            ]
        );
        $history->touch();

        return response()->json(['message' => 'Reading history updated', 'history' => $history], 200);
    }

    public function getUserHistory($userId)
    {
        $history = ReadingHistory::where('user_id', $userId)->orderBy('updated_at', 'desc')->get();
        return response()->json($history);
    }

    public function removeHistory($userId, $bookId)
    {
        $history = ReadingHistory::where('user_id', $userId)->where('book_id', $bookId)->first();

        if (!$history) {
            return response()->json(['message' => 'Book not found in history list'], 404);
        }

        $history->delete();

        return response()->json(['message' => 'Reading History removed successfully']);
    }
}
