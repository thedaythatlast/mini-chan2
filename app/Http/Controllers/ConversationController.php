<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function conversation($uuid)
    {
        // fetch data from sql if history null (in which case this function is used to fetch conversation history when enter address)
        $history = session('history') 
        ?? json_decode(DB::table('messages')->where('_uuid', $uuid)->value('_message'), true);


        return Inertia::render('conversation', [
            'history'   => $history,
        ]);
    }
    
}
