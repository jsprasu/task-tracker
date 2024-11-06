<?php

namespace App\Repositories\Interfaces;

use App\Models\Tasks;

interface TaskRepositoryInterface
{
    public function getAllTasks(): array;

    public function createTask(array $data): Tasks;

    public function getTask(string $id): Tasks;

    public function updateTask(array $data, string $id): Tasks;

    public function deleteTask(string $id): void;
}
