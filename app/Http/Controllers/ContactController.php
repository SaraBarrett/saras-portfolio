<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Throwable;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $key = 'contact:'.hash('sha256', (string) $request->ip());

        // Limita a três tentativas por IP em dez minutos.
        if (RateLimiter::tooManyAttempts($key, 3)) {
          return back()->withErrors([
    'submission' => __('website.errors.send'),
]);
        }

        RateLimiter::hit($key, 600);

        // Campo-armadilha: deve permanecer vazio.
        if ($request->filled('website')) {
            return back()->withErrors([
                'submission' => 'Não foi possível enviar a mensagem.',
            ]);
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required', 'email', 'max:254'],
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
        ], [
           [
            'required' => __('website.errors.required'),
            'string' => __('website.errors.string'),
            'email' => __('website.errors.email'),
            'min' => __('website.errors.min'),
            'max' => __('website.errors.max'),
]
        ]);

        $recipient = config('contact.to');

        if (! is_string($recipient) || trim($recipient) === '') {
          return back()->withErrors([
    'submission' => __('.send'),
]);
        }

        // Evita quebras de linha nos campos usados nos cabeçalhos.
        $name = str_replace(["\r", "\n"], ' ', $data['name']);
        $subject = str_replace(["\r", "\n"], ' ', $data['subject']);

        $body = implode("\n", [
            'Nova mensagem através do portfólio',
            '',
            'Nome: '.$name,
            'Email: '.$data['email'],
            'Assunto: '.$subject,
            '',
            'Mensagem:',
            $data['message'],
        ]);

        try {
            Mail::raw($body, function (Message $mail) use (
                $recipient,
                $data,
                $name,
                $subject
            ) {
                $mail->to($recipient)
                    ->replyTo($data['email'], $name)
                    ->subject('[Portfólio] '.$subject);
            });
        } catch (Throwable $exception) {
            report($exception);

         return back()->withErrors([
    'submission' => __('website.errors.unavailable'),
]);
        }

        return back();
    }
}
