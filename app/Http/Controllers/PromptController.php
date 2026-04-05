<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
//use SQLite3;

class PromptController extends Controller
{
    public function send_prompts(Request $request)
    {
        // Getting data sent from frontend 
        $uuid = $request->input('uuid') ?? uniqid('', true);
        $username = auth()->user()?->name;        
        $messages = $request->input('history'); // + Read conversation history + new user prompt into $messages
        $title = $request->input('title');

        // fetch request to get llm's response
        $llm_response = Http::withoutVerifying()->withHeaders([
        'Authorization' => 'Bearer ' . config('services.groq.key'),
        'Content-Type'  => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', 
        [
            'messages' => $messages, 
            'model' => 'llama-3.1-8b-instant',
        ]);

        // append llm's message (role + content)
        $messages[] = $llm_response->json('choices.0.message');

        // store conversation history to the db
        DB::table('messages')->updateOrInsert(
            ['_uuid'     => $uuid],
            ['username'  => $username,
            '_message'  => json_encode($messages),
            'title'    => $request->input('title'),
            '_createat' => now()],
        );

        // Delay 5 seconds for frontend loading testing
        // sleep(5);

        // redirect to chat page with the updated conversation history
        return redirect('/chat/' . $uuid)
        ->with('history', $messages);
    }
}
