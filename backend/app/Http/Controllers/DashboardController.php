<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalCourses = Course::count();
        $activeCourses = Course::where('status', 'active')->count();
        $completedCourses = Course::where('status', 'completed')->count();

        return response()->json([
            'total_courses' => $totalCourses,
            'active_courses' => $activeCourses,
            'completed_courses' => $completedCourses,
        ]);
    }
}