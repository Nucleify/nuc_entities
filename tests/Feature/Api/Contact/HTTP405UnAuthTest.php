<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-405');
uses()->group('contact-api-405-unauth');
uses()->group('api-405');
uses()->group('api-405-unauth');

describe('405 > Unauthorized', function (): void {
    apiTestArray([
        'put with parameter > index api' => [
            'method' => 'PUT',
            'route' => 'contacts.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'put json with parameter > index api' => [
            'method' => 'PUT',
            'route' => 'contacts.index',
            'status' => 405,
            'id' => 1,
        ],
        'delete with parameter > index api' => [
            'method' => 'DELETE',
            'route' => 'contacts.index',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'delete json with parameter > index api' => [
            'method' => 'DELETE',
            'route' => 'contacts.index',
            'status' => 405,
            'id' => 1,
        ],
        'post json > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'contacts.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
        ],
        'post > countByCreatedLastWeek api' => [
            'method' => 'POST',
            'route' => 'contacts.countByCreatedLastWeek',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json with parameter > show api' => [
            'method' => 'POST',
            'route' => 'contacts.show',
            'status' => 405,
            'id' => 1,
        ],
        'put json with parameter > post api' => [
            'method' => 'PUT',
            'route' => 'contacts.store',
            'status' => 405,
            'id' => 1,
        ],
        'delete json with parameter > post api' => [
            'method' => 'DELETE',
            'route' => 'contacts.store',
            'status' => 405,
            'id' => 1,
        ],
        'post json with parameter > update api' => [
            'method' => 'POST',
            'route' => 'contacts.update',
            'status' => 405,
            'id' => 1,
        ],
        'post with parameter > delete api' => [
            'method' => 'POST',
            'route' => 'contacts.destroy',
            'status' => 405,
            'id' => 1,
            'json' => false,
        ],
        'post json with parameter > delete api' => [
            'method' => 'POST',
            'route' => 'contacts.destroy',
            'status' => 405,
            'id' => 1,
        ],
        'put without parameter > index api' => [
            'method' => 'PUT',
            'route' => 'contacts.index',
            'status' => 405,
            'json' => false,
        ],
        'put json without parameter > index api' => [
            'method' => 'PUT',
            'route' => 'contacts.index',
            'status' => 405,
        ],
        'delete without parameter > index api' => [
            'method' => 'DELETE',
            'route' => 'contacts.index',
            'status' => 405,
            'json' => false,
        ],
        'delete json without parameter > index api' => [
            'method' => 'DELETE',
            'route' => 'contacts.index',
            'status' => 405,
        ],
        'put json without parameter > post api' => [
            'method' => 'PUT',
            'route' => 'contacts.store',
            'status' => 405,
        ],
        'delete json without parameter > post api' => [
            'method' => 'DELETE',
            'route' => 'contacts.store',
            'status' => 405,
        ],
    ]);
});
