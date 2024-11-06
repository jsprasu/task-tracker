<?php

use App\Http\Controllers\TaskController;
use App\Http\Middleware\XssSanitization;
use Illuminate\Support\Facades\Route;

/**
 * Tasks resource APIs.
 */
Route::resource('tasks', TaskController::class)
    ->middleware(XssSanitization::class);
