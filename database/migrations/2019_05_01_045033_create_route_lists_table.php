<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRouteListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_lists', function (Blueprint $table) {
            $table->increments('id');
            $table->string('location', '255');
            $table->json('intermediate')->nullable();
            $table->string('destination', '255')->nullable();
            $table->integer('distance')->nullable();
            $table->integer('price');
            $table->string('currency')->nullable();
            $table->json('payment_method')->nullable();
            $table->text('description');
            $table->date('loading_data')->nullable();
            $table->date('unloading_data')->nullable();
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('route_lists');
    }
}
