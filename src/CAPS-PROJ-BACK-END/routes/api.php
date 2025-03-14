<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SavedBookController;
use App\Http\Controllers\ReadingHistoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\UserCountController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\admin\UserDeleteController;
use App\Http\Controllers\admin\GetContactUsController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\MonthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('save-book', [SavedBookController::class, 'saveBook']);
Route::get('saved-books/{userId}', [SavedBookController::class, 'getUserSavedBooks']);
Route::delete('/remove-book/{userId}/{bookId}', [SavedBookController::class, 'removeBook']);

Route::post('/read-history', [ReadingHistoryController::class, 'store']);
Route::get('/reading-history/{userId}', [ReadingHistoryController::class, 'getUserHistory']);
Route::delete('/remove-history/{userId}/{bookId}', [ReadingHistoryController::class, 'removeHistory']);

Route::middleware('auth:sanctum')->post('/update-profile', [ProfileController::class, 'updateProfile']);
Route::middleware('auth:sanctum')->post('/change-password', [ProfileController::class, 'changePassword']);

Route::post('/forgot-password', [ForgotPasswordController::class, 'checkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

Route::post('/contact-us', [ContactUsController::class, 'store']);
Route::post('/feedback', [FeedbackController::class, 'store']);

//ADMIN

Route::get('/users', [UserController::class, 'index']);
Route::get('/user-count', [UserCountController::class, 'count']);
Route::delete('/user/delete/{id}', [UserDeleteController::class, 'destroy']);

Route::get('/contact-us', [GetContactUsController::class, 'index']);
Route::delete('/contact-us/delete/{id}', [GetContactUsController::class, 'destroy']);
Route::get('/contact-count', [GetContactUsController::class, 'contactCount']);

Route::get('/feedback', [FeedbackController::class, 'index']);
Route::delete('/user/feedback/{id}', [FeedbackController::class, 'destroy']);

Route::get('/users-by-month', [MonthController::class, 'getUsersByMonth']);