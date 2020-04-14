<?php

namespace App\Http\Controllers\Message;

use App\Events\Messenger\PrivateMessages;
use App\Model\Message\PrivateMessage;
use App\Model\Users\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PrivateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $contact = Contact::where('id', $request->contact_id)
                   ->where('user_id', $request->user()->id)
                        ->first() ;

        $messages = PrivateMessage::where('from_user_id', $request->user()->id)
                        ->where('to_user_id', $contact->id)->get();

        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        broadcast(new PrivateMessages($request->all()))->toOthers();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
