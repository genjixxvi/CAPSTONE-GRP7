<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        $users = $users->map(function ($user) {
            $user->profile_picture_url = asset('uploads/' . $user->profile_picture); 
            return $user;
        });

        return response()->json($users);
    }
}
