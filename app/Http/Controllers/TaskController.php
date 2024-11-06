<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskNotFoundException;
use App\Http\Requests\CreateTaskRequest;
use App\Models\Tasks;
use App\Repositories\Interfaces\TaskRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    public function __construct(private TaskRepositoryInterface $taskRepository) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = $this->taskRepository->getAllTasks();
        $response = [
            'data' => $tasks,
        ];

        return response(
            $response,
            Response::HTTP_OK,
            ['Content-Type' => 'application/json'],
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTaskRequest $request): Response
    {
        $requestData = $request->only(['title', 'description', 'status']);
        $task = $this->taskRepository->createTask($requestData);
        $response = [
            'message' => 'Task has been successfully saved.',
            'data' => $task,
        ];

        return response(
            $response,
            Response::HTTP_CREATED,
            ['Content-Type' => 'application/json'],
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $task = $this->taskRepository->getTask($id);
            $response = [
                'data' => $task,
            ];

            return response(
                $response,
                Response::HTTP_OK,
                ['Content-Type' => 'application/json'],
            );
        } catch (TaskNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateTaskRequest $request, string $id)
    {
        try {
            $requestData = $request->only(['title', 'description', 'status']);
            $task = $this->taskRepository->updateTask($requestData, $id);
            $response = [
                'message' => 'Task has been successfully updated.',
                'data' => $task,
            ];

            return response(
                $response,
                Response::HTTP_OK,
                ['Content-Type' => 'application/json'],
            );
        } catch (TaskNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->taskRepository->deleteTask($id);
            $response = [
                'message' => 'Task has been successfully deleted.',
            ];

            return response(
                $response,
                Response::HTTP_NO_CONTENT,
                ['Content-Type' => 'application/json'],
            );
        } catch (TaskNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
