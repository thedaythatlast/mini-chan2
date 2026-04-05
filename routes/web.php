<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\PromptController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\PastHistoryController;


Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});*/

// Send prompts.
Route::post('/prompt', [PromptController::class, 'send_prompts']); // Send prompts from homepage
// Redirect from homepage to a page with a uuid.
Route::get('/chat/{uuid}', [ConversationController::class, 'conversation']);
// Get past threads
Route::get('/past', [PastHistoryController::class, 'past_history']);


require __DIR__.'/settings.php';
