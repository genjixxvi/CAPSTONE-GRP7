<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
                'message' => 'Validation failed',
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->setAttribute('welcome_message', "Hello {$user->name}, and welcome aboard! You've successfully created your account. Let’s get started—explore our features and make the most of your new account.");

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('bookHub')->plainTextToken,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found.'], 404);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid password, please try again.'], 401);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_picture' => $user->profile_picture ? url('uploads/' . $user->profile_picture) : null,
                'welcome_message' => "Welcome back, {$user->name}! We're so glad to have you with us again. Feel free to explore the latest updates and pick up right where you left off."
            ],
            'token' => $user->createToken('bookHub')->plainTextToken,
        ]);
    }
}
