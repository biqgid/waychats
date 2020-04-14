<?php

namespace App\Http\Controllers\Message;

use App\Events\Messenger\PublicMessages;
use App\Http\Controllers\Controller;
use App\Http\Resources\Messages\PublicMessageCollection;
use App\Model\Message\PublicMessage;
use Illuminate\Http\Request;

class AllMessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(PublicMessage::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $message = $request->user()->public_message()->create([
            'views' => 0,
            'bookmarks' => 0,
            'content' => $request['message'],
        ]);

        broadcast(new PublicMessages($message))->toOthers();

        return response()->json($message, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Message\PublicMessage  $publicMessages
     * @return \Illuminate\Http\Response
     */
    public function destroy(PublicMessage $publicMessages)
    {
        //
    }
}
