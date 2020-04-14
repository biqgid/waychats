<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 23.03.2019
 * Time: 15:26
 */

return [
    'hosts' => explode(',', env('ELASTICSEARCH_HOSTS')),
    'retries' => 1,
];
