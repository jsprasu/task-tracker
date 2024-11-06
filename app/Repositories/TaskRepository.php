<?php

namespace App\Repositories;

use App\Exceptions\TaskNotFoundException;
use App\Models\Tasks;
use App\Repositories\Interfaces\TaskRepositoryInterface;

class TaskRepository implements TaskRepositoryInterface
{
    public function getAllTasks(): array
    {
        return Tasks::orderBy('id', 'desc')->get()->toArray();
    }

    public function getTask(string $id): Tasks
    {
        $task = Tasks::findOr($id, function() {
            throw new TaskNotFoundException('Task not found for the given id.');
        });

        return $task;
    }

    public function createTask(array $data): Tasks
    {
        return Tasks::create($data);
    }

    public function updateTask(array $data, string $id): Tasks
    {
        Tasks::findOr($id, function() {
            throw new TaskNotFoundException('Task not found for the given id.');
        });

        Tasks::where('id', $id)->update($data);

        return Tasks::find($id);
    }

    public function deleteTask(string $id): void
    {
        Tasks::findOr($id, function() {
            throw new TaskNotFoundException('Task not found for the given id.');
        });

        Tasks::where('id', $id)->delete();
    }
}
