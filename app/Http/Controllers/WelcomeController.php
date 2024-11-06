<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function __invoke(): View
    {
        return view('tasks/task-tracker');
    }
}
