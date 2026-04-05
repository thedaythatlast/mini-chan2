<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
//use Illuminate\Support\Facades\Auth;

class PastHistoryController extends Controller
{
    public function past_history()
    {
        $username = auth()->user()?->name;
        
        $uuids = DB::table('messages')
        ->where('username', $username)
        ->orderBy('_createat', 'desc')
        ->select('_uuid', 'title')
        ->get()
        ->toArray();

        return response()->json($uuids);
    }
}
