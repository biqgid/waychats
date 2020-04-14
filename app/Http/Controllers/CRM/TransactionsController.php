<?php

namespace App\Http\Controllers\CRM;

use App\Http\Resources\CRM\TransactionCollection;
use App\Http\Resources\CRM\TransactionResource;
use App\Model\CRM\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = auth()->user()->transactions()->get();
        return response()->json(TransactionResource::collection($data));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $stages = $request->user()->stages()->first();

        if ($stages) {
            $data = $stages->transactions()->create($request->all());
            return response()->json(new TransactionResource($data));
        }else {
            $stage = $request->user()->stages()->create([
                'name' => 'Первичный этап',
                'color' => '#099bc7'
            ]);

            $data = $stage->transactions()->create($request->all());

            return response()->json(new TransactionResource($data));
        }
    }

    public function stageUpdate(Request $request)
    {
        $items = Transaction::find($request->transaction_id);
        $items->stage_id = $request->stage_id;
        $items->save();
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
        $items = Transaction::findOrFail($id);
        $items->delete();

        return response()->json('Заявка успешно удолена', 204);
    }
}
