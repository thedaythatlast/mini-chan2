<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function conversation($uuid)
    {
        $message = DB::table('messages')->where('_uuid', $uuid)->first();

        if (!$message) {
            return redirect('/');
        }

        $username = auth()->user()?->name;

        if ($message->username !== $username) {
            return redirect('/');
        }

        $history = session('history') 
            ?? json_decode($message->_message, true);

        return Inertia::render('conversation', [
            'history' => $history,
        ]);
    }
    
}
