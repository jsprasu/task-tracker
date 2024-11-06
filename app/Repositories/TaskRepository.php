<?php

namespace App\Repositories;

use App\Exceptions\TaskNotFoundException;
use App\Models\Tasks;
use App\Repositories\Interfaces\TaskRepositoryInterface;

/**
 * @inheritDoc
 */
class TaskRepository implements TaskRepositoryInterface
{
    /**
     * @inheritDoc
     */
    public function getAllTasks(): array
    {
        return Tasks::orderBy('id', 'desc')->get()->toArray();
    }

    /**
     * @inheritDoc
     */
    public function getTask(string $id): Tasks
    {
        $task = Tasks::findOr($id, function() {
            throw new TaskNotFoundException('Task not found for the given id.');
        });

        return $task;
    }

    /**
     * @inheritDoc
     */
    public function createTask(array $data): Tasks
    {
        return Tasks::create($data);
    }

    /**
     * @inheritDoc
     */
    public function updateTask(array $data, string $id): Tasks
    {
        Tasks::findOr($id, function() {
            throw new TaskNotFoundException('Task not found for the given id.');
        });

        Tasks::where('id', $id)->update($data);

        return Tasks::find($id);
    }

    /**
     * @inheritDoc
     */
    public function deleteTask(string $id): void
    {
        Tasks::findOr($id, function() {
            throw new TaskNotFoundException('Task not found for the given id.');
        });

        Tasks::where('id', $id)->delete();
    }
}
