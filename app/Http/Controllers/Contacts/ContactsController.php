<?php

namespace App\Http\Controllers\Contacts;

use App\Http\Resources\Contacts\ContactCollection;
use App\Http\Resources\Contacts\ContactResource;
use App\Model\Users\Contact;
use App\Model\Users\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contacts = Contact::where('user_id', Auth::user()->id)->with('user')->get();
        return response()->json(new ContactCollection($contacts));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->user()->contacts()->create($request->all());
        return response()->json(new ContactResource($data));
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
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

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = $request['query'];
        $users = User::where('phone', 'like', '%' . $query . '%')->get();
        return response()->json($users);
    }

    /*public function search (Request $request, ContactsRepository $repository) {
        dump($repository->search($request['q']));
    }*/
}
