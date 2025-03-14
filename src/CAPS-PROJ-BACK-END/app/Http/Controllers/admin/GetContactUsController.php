<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactUs;

class GetContactUsController extends Controller
{
    public function index()
    {
        $contacts = ContactUs::all();

        return response()->json($contacts);
    }
    public function destroy($id)
    {
        $contact = ContactUs::find($id);
        
        if ($contact) {
            $contact->delete();
            return response()->json(['message' => 'Message deleted successfully']);
        } else {
            return response()->json(['message' => 'Message not found'], 404);
        }
    }
    public function contactCount()
    {
        $contactCount = ContactUs::count();

        return response()->json($contactCount);
    }
}
