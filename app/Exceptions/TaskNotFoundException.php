<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * TaskNotFoundException will be thrown when a task is not found.
 */
class TaskNotFoundException extends Exception
{
    /**
     * Render the exception details.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'error'     => true,
            'message'   => $this->getMessage(),
        ]);
    }
}
