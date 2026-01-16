'<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with('instructor');

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->has('sort_by')) {
            $sortBy = $request->get('sort_by');
            $sortOrder = $request->get('sort_order', 'asc');
            $query->orderBy($sortBy, $sortOrder);
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:planned,active,completed',
            'difficulty' => 'required|in:beginner,intermediate,advanced',
            'instructor_id' => 'required|exists:instructors,id',
        ]);

        $course = Course::create($validated);

        return response()->json($course->load('instructor'), 201);
    }

    public function show($id)
    {
        return Course::with('instructor')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'status' => 'in:planned,active,completed',
            'difficulty' => 'in:beginner,intermediate,advanced',
            'instructor_id' => 'exists:instructors,id',
        ]);

        $course->update($validated);

        return response()->json($course->load('instructor'));
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json(null, 204);
    }
}';
