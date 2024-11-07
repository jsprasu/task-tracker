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
        $size = (request()->has('size') && !empty(request()->query('size'))) ? request()->query('size') : 20;

        return Tasks::select(['id', 'title', 'status'])->orderBy('id', 'desc')->paginate($size)->toArray();
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
        $task = $this->getTask($id);
        $task->update($data);

        return $task;
    }

    /**
     * @inheritDoc
     */
    public function deleteTask(string $id): void
    {
        $task = $this->getTask($id);
        $task->delete();
    }
}
