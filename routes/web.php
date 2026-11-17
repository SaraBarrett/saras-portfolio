<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('Home');
});


Route::post('/contacto', [ContactController::class, 'store'])
    ->name('contact.store');

    Route::post('/idioma/{locale}', function (
    Request $request,
    string $locale
) {
    abort_unless(in_array($locale, ['pt', 'en'], true), 404);

    $request->session()->put('locale', $locale);

    return back();
})->name('locale.update');
