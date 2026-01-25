<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-api-405');
uses()->group('article-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    apiTestArray([
        'put > index api' => [
            'method' => 'PUT',
            'route' => 'articles.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json > index api' => [
            'method' => 'PUT',
            'route' => 'articles.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete > index api' => [
            'method' => 'DELETE',
            'route' => 'articles.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json > index api' => [
            'method' => 'DELETE',
            'route' => 'articles.index',
            'status' => 405,
            'id' => 1,
        ],
        'post json > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'articles.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
        ],
        'post > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'articles.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > show api' => [
            'method' => 'POST',
            'route' => 'articles.show',
            'status' => 405,
            'id' => 1,
        ],
        'put json > post api' => [
            'method' => 'PUT',
            'route' => 'articles.store',
            'status' => 405,
            'id' => 1,
        ],
        'delete json > post api' => [
            'method' => 'DELETE',
            'route' => 'articles.store',
            'status' => 405,
            'id' => 1,
        ],
        'post json > update api' => [
            'method' => 'POST',
            'route' => 'articles.update',
            'status' => 405,
            'id' => 1,
        ],
        'post > delete api' => [
            'method' => 'POST',
            'route' => 'articles.destroy',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json > delete api' => [
            'method' => 'POST',
            'route' => 'articles.destroy',
            'status' => 405,
            'id' => 1,
        ],
    ]);
});
