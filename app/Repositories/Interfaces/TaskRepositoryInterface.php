<?php

namespace App\Repositories\Interfaces;

use App\Models\Tasks;

/**
 * TaskRepositoryInterface contains all methods that are used for Task API operations.
 */
interface TaskRepositoryInterface
{
    /**
     * Get all tasks.
     *
     * @return array
     */
    public function getAllTasks(): array;

    /**
     * Create a task.
     *
     * @param array $data
     * @return Tasks
     */
    public function createTask(array $data): Tasks;

    /**
     * Get a task by id.
     *
     * @param string $id
     * @return Tasks
     * @throws TaskNotFoundException
     */
    public function getTask(string $id): Tasks;

    /**
     * Update a task by id.
     *
     * @param array $data
     * @param string $id
     * @return Tasks
     * @throws TaskNotFoundException
     */
    public function updateTask(array $data, string $id): Tasks;

    /**
     * Delete a task by id.
     *
     * @param string $id
     * @return void
     * @throws TaskNotFoundException
     */
    public function deleteTask(string $id): void;
}
