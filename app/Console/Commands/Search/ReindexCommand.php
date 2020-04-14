<?php

namespace App\Console\Commands\Search;

use App\Model\Message\Message;
/*use App\Services\Search\MessageIndexer;*/
use Illuminate\Console\Command;

class ReindexCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'search:reindex';

    private $messages;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    /*public function __construct(MessageIndexer $message)
    {
        parent::__construct();
        $this->messages = $message;
    }*/

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): bool
    {
        $this->messages->clear();

        foreach (Message::orderBy('id')->cursor() as $message) {
            $this->messages->index($message);
        }

        return true;
    }
}
