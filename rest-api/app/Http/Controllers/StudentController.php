<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();
        return response()->json([
            'message' => "Successfully fetched students.",
            'data' => $students
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required|string',
            "username" => 'required|string|unique:students,username',
            "email" => 'required|string|email:rfc,dns|unique:students,email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Failed creating a new student.",
                'errors' => $validator->errors(),
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $validated = $validator->validated();
        $validated['password'] = Hash::make($validated['password']);

        try {
            $createdStudent = Student::create($validated);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed creating a new student.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Successfully created a new student.',
            'data' => $createdStudent
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return response()->json([
            'message' => 'Successfully fetched a student.',
            'data' => $student
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'string',
            "username" => 'string|unique:students,username',
            "email" => 'string|email:rfc,dns|unique:students,email',
            'password' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Failed updating a student.",
                'errors' => $validator->errors(),
            ], Response::HTTP_NOT_ACCEPTABLE);
        }

        $validated = $validator->validated();
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        try {
            $student = Student::findOrFail($student->id);
            $student->update($validated);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed updating a student.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'message' => 'Successfully updated a student.',
            'data' => $student
        ], Response::HTTP_CREATED);
        // Response::HTTP_NO_CONTENT
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json([
            'message' => "Successfully deleted a student with id {$student->id}.",
        ], Response::HTTP_CREATED);
    }
}
