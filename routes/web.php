<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortUrlController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;



Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'Dashboard'])->name('dashboard');
    Route::get('/url-short', [ShortUrlController::class, 'url_short'])->name('url-short');
    Route::post('/url-short-insert', [ShortUrlController::class, 'url_short_insert'])->name('url-short-insert');
    Route::post('/url-short-status-update', [ShortUrlController::class, 'url_short_status_update'])->name('url-short-status-update');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Frontend
Route::get('/', [HomeController::class, 'home'])->name('home');
// Route::get('/{short_url}', [HomeController::class, 'redirect_short_url'])->name('redirect_short_url');
Route::fallback([HomeController::class, 'redirect_short_url'])->name('redirect_short_url');

require __DIR__.'/auth.php';
