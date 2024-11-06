<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskNotFoundException;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\GetAllTasksRequest;
use App\Repositories\Interfaces\TaskRepositoryInterface;
use Illuminate\Http\Response;

/**
 * TaskController will manage the API operations for tasks using the Laravel resource controller.
 */
class TaskController extends Controller
{
    public function __construct(private TaskRepositoryInterface $taskRepository) {}

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(GetAllTasksRequest $request): Response
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
     * Store a newly created resource in storage.
     *
     * @param CreateTaskRequest $request
     * @return Response
     */
    public function store(CreateTaskRequest $request): Response
    {
        $requestData = $request->only(['title', 'description', 'status']);
        $task = $this->taskRepository->createTask($requestData);
        $response = [
            'message'   => 'Task has been successfully saved.',
            'data'      => $task,
        ];

        return response(
            $response,
            Response::HTTP_CREATED,
            ['Content-Type' => 'application/json'],
        );
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     * @return Response
     */
    public function show(string $id): Response
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
            return response(
                ['message' => $e->getMessage()],
                Response::HTTP_NOT_FOUND,
                ['Content-Type' => 'application/json'],
            );
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CreateTaskRequest $request
     * @param string $id
     * @return Response
     */
    public function update(CreateTaskRequest $request, string $id): Response
    {
        try {
            $requestData = $request->only(['title', 'description', 'status']);
            $task = $this->taskRepository->updateTask($requestData, $id);
            $response = [
                'message'   => 'Task has been successfully updated.',
                'data'      => $task,
            ];

            return response(
                $response,
                Response::HTTP_OK,
                ['Content-Type' => 'application/json'],
            );
        } catch (TaskNotFoundException $e) {
            return response(
                ['message' => $e->getMessage()],
                Response::HTTP_NOT_FOUND,
                ['Content-Type' => 'application/json'],
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return Response
     */
    public function destroy(string $id): Response
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
            return response(
                ['message' => $e->getMessage()],
                Response::HTTP_NOT_FOUND,
                ['Content-Type' => 'application/json'],
            );
        }
    }
}
