<?php

namespace App\Http\Controllers;

use App\Model\Recording;
use FFMpeg\FFMpeg;
use FFMpeg\Format\Audio\Aac;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecordingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*$file = $request->file('recording');
        $filename = hash('md5', uniqid(mt_rand(), true), false) . '.ogg';

        $path = hash( 'sha256', time());

        if(Storage::disk('uploads')->put($path.'/'.$filename,  File::get($file))) {
            $input['filename'] = $filename;
            $input['mime'] = $file->getClientMimeType();
            $input['path'] = $path;
            $input['size'] = $file->getClientSize();
            $file = FileEntry::create($input);

            return response()->json([
                'success' => true,
                'id' => $file->id
            ], 200);
        }
        return response()->json([
            'success' => false
        ], 500);*/


        /*// Get the POSTed file
        $file = $request->file('recording');


        // Create a random file name
        $fileName = hash('md5', uniqid(mt_rand(), true), false) . '.ogg';


        // Move the file to the storage directory
        $file->move(storage_path(), $fileName);


        // Initialize FFMpeg
        $ffmpeg = FFMpeg::create([
            'ffmpeg.binaries'   => 'D:/ffmpeg/bin/ffmpeg.exe',
            'ffprobe.binaries'  => 'D:/ffmpeg/bin/ffprobe.exe',
            'timeout'           => 3600,
            'ffmpeg.threads'    => 12,
        ]);



        // Open our OGG file
        $oggAudio = $ffmpeg->open(storage_path() . '/' . $fileName);


        // Set our AAC format
        $format = new Aac();
        $format->setAudioCodec('aac')
            ->setAudioKiloBitrate(96)
            ->setAudioChannels(1);


        // Create a new random file name
        $fileName = hash('md5', uniqid(mt_rand(), true), false) . '.aac';
        $newFilePath = storage_path() . '/' . $fileName;


        // Save our file as AAC on the new file path
        $oggAudio->save($format, $newFilePath);


        // Save our recording
        $recording = Recording::create([
            'filename'      => $fileName,
            'path'          => storage_path(),
            'mime_type'     => $file->getClientMimeType(),
            'content_size'  => $file->getClientSize(),
        ]);


        // Return success
        return response()->json($recording, 201);*/
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
}
