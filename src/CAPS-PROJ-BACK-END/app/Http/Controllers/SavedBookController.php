<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedBook;
use Illuminate\Support\Facades\Auth;

class SavedBookController extends Controller
{
    public function saveBook(Request $request)
    {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'bookId' => 'required',
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'cover' => 'nullable|url',
            'downloadCount' => 'required|integer',
            'readFormat' => 'nullable|string|max:255',
            'downloadFormat' => 'nullable|string|max:255',
        ]);

        $book = SavedBook::updateOrCreate(
            ['user_id' => $request->userId, 'book_id' => $request->bookId],
            [
                'title' => $request->title,
                'author' => $request->author,
                'cover' => $request->cover,
                'download_count' => $request->downloadCount,
                'read_format' => $request->readFormat,
                'download_format' => $request->downloadFormat,
            ]
        );

        return response()->json(['message' => 'Book saved successfully!', 'book' => $book], 200);
    }

    public function getUserSavedBooks($userId) 
    {
        if (!is_numeric($userId)) {
            return response()->json(['error' => 'Invalid user ID'], 400);
        }

        $books = SavedBook::where('user_id', $userId)->get();

        return response()->json(['books' => $books], 200);
    }

    public function removeBook($userId, $bookId)
    {
        $savedBook = SavedBook::where('user_id', $userId)->where('book_id', $bookId)->first();

        if (!$savedBook) {
            return response()->json(['message' => 'Book not found in saved list'], 404);
        }

        $savedBook->delete();

        return response()->json(['message' => 'Book removed successfully']);
    }
}
