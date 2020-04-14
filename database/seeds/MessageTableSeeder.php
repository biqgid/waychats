<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MessageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('messages')->insert([
            'messages' => Str::random(10),
            'file' => Str::random(10).'@gmail.com',
            'user_id' => rand(1,50),
        ]);
    }
}
