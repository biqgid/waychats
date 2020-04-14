<?php

namespace App\Console\Commands\Search;

use Elasticsearch\Client;
use Elasticsearch\Common\Exceptions\Missing404Exception;
use Illuminate\Console\Command;

class InitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'search:init';

    private $client;

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
    public function __construct(Client $client)
    {
        parent::__construct();
        $this->client = $client;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): bool
    {
        try {
            /**
             * Удоляем индекс если он существует
             * для пересоздания
             */
            $this->client->indices()->delete([
                'index' => 'app',
            ]);
        } catch (Missing404Exception $error) {}


        /**
         * Создаем новый индекс
         */
        $this->client->indices()->create([

            /**
             * Передаем название индекса
             */
            'index' => 'messages',

            /**
             * Передаем поля для индекса
             */
            'body' => [

                /**
                 * Mapping - это процесс определения того,
                 * как документ и содержащиеся в нем поля хранятся и индексируются.
                 * Например, используйте сопоставления для определения:
                 * ---------------------------------------------------------------------------------------
                 * 1) какие строковые поля следует рассматривать как полнотекстовые поля.
                 * 2) какие поля содержат числа, даты или геолокации.
                 * 3) формат значения даты.
                 * 4) пользовательские правила для управления отображением динамически добавляемых полей .
                 */
                'mappings' => [
                    'messages' => [

                        /**
                         * Указываем что при обращении к этой таблице
                         * данные должны авиоматически возвращаться
                         */
                        '_source' => [
                            'enabled' => true
                        ],

                        /**
                         * Здесь мы указываем какие поля
                         * в каком типе должны возращаться
                         */
                        'properties' => [
                            'id' => [
                                'type' => 'integer'
                            ],
                            'messages' => [
                                'type' => 'text'
                            ],
                            'file' => [
                                'type' => 'text'
                            ],
                        ],
                    ],
                ],
                'settings' => [
                    'analysis' => [
                        'char_filter' => [
                            'replace' => [
                                'type' => 'mapping',
                                'mappings' => [
                                    '&=> and '
                                ],
                            ],
                        ],
                        'filter' => [
                            'word_delimiter' => [
                                'type' => 'word_delimiter',
                                'split_on_numerics' => false,
                                'split_on_case_change' => true,
                                'generate_word_parts' => true,
                                'generate_number_parts' => true,
                                'catenate_all' => true,
                                'preserve_original' => true,
                                'catenate_numbers' => true,
                            ],
                            'trigrams' => [
                                'type' => 'ngram',
                                'min_gram' => 4,
                                'max_gram' => 6,
                            ],
                        ],
                        'analyzer' => [
                            'default' => [
                                'type' => 'custom',
                                'char_filter' => [
                                    'html_strip',
                                    'replace',
                                ],
                                'tokenizer' => 'whitespace',
                                'filter' => [
                                    'lowercase',
                                    'word_delimiter',
                                    'trigrams',
                                ],
                            ],
                        ],
                    ],
                ],

            ],
        ]);

        return true;
    }
}
