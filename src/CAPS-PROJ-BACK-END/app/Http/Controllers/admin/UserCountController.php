<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserCountController extends Controller
{
    public function count()
    {
        $userCount = User::count();

        return response()->json([
            'user_count' => $userCount
        ]);
    }
}
