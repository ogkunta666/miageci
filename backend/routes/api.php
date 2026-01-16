<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;

Route::middleware('api')->group(function () {
    // Dashboard routes
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Course routes
    Route::apiResource('courses', CourseController::class);

    // Student routes
    Route::apiResource('students', StudentController::class);

    // Instructor routes
    Route::apiResource('instructors', InstructorController::class);

    // Contact routes
    Route::get('/contact', [ContactController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store']);
});
