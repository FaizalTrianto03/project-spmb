<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPasswordNotification extends ResetPassword
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Password Reset Token')
            ->line('Use the token below to reset your password:')
            ->line('Token: ' . $this->token)
            ->line('This token will expire in 60 minutes.')
            ->line('If you did not request a password reset, no further action is required.');
    }
}
