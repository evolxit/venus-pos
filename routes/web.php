<?php

use App\Http\Controllers\PlaygroundController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('shop/index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Example routes

    Route::group(['middleware' => ['role:god']], function () {
        Route::get('secret', function () {
            return Inertia::render('secret');
        })->name('secret');
    });

    Route::get('playground', PlaygroundController::class)->name('playground');

    Route::resource('users', App\Http\Controllers\UserController::class);

    Route::resource('roles', App\Http\Controllers\RoleController::class);

    Route::get('todos/export', [App\Http\Controllers\TodoController::class, 'export'])->name('todos.export');
    Route::resource('todos', App\Http\Controllers\TodoController::class);

    // POS routes

    Route::resource('brands', App\Http\Controllers\BrandController::class);

    Route::resource('categories', App\Http\Controllers\CategoryController::class);

    Route::resource('products', App\Http\Controllers\ProductController::class);

    Route::resource('customers', App\Http\Controllers\CustomerController::class);

    Route::get('invoices/export', [App\Http\Controllers\InvoiceController::class, 'export'])->name('invoices.export');
    Route::resource('invoices', App\Http\Controllers\InvoiceController::class);
});

Route::impersonate();

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
