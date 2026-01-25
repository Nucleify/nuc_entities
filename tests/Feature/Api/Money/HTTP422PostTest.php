<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-api-422');
uses()->group('money-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function (): void {
    apiTestArray([
        // USER ID TESTS
        'user_id > empty' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['user_id' => '']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field is required.']]],
        ],
        'user_id > string' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['user_id' => 'user_id']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['user_id' => false]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['user_id' => []]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field is required.']]],
        ],

        // COUNT TESTS
        'count > empty' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['count' => '']),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field is required.']]],
        ],
        'count > string' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['count' => 'count']),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field must be an integer.']]],
        ],
        'count > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['count' => false]),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field must be an integer.']]],
        ],
        'count > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['count' => []]),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field is required.']]],
        ],

        // SENDER TESTS
        'sender > empty' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['sender' => '']),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field is required.']]],
        ],
        'sender > integer' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['sender' => 1]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field must be a string.']]],
        ],
        'sender > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['sender' => false]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field must be a string.']]],
        ],
        'sender > true' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['sender' => true]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field must be a string.']]],
        ],
        'sender > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['sender' => []]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field is required.']]],
        ],

        // RECEIVER TESTS
        'receiver > empty' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['receiver' => '']),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field is required.']]],
        ],
        'receiver > integer' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['receiver' => 1]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field must be a string.']]],
        ],
        'receiver > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['receiver' => false]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field must be a string.']]],
        ],
        'receiver > true' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['receiver' => true]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field must be a string.']]],
        ],
        'receiver > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['receiver' => []]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field is required.']]],
        ],

        // TITLE TESTS
        'title > empty' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['title' => '']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],
        'title > integer' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['title' => 1]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > too short' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['title' => 'ti']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be at least 3 characters.']]],
        ],
        'title > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['title' => false]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > true' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['title' => true]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['title' => []]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],

        // DESCRIPTION TESTS
        'description > integer' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['description' => 1]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > too short' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['description' => 't']),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be at least 3 characters.']]],
        ],
        'description > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['description' => false]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > true' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['description' => true]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['description' => []]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'POST',
            'route' => 'money.store',
            'data' => array_merge(moneyData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field is required.']]],
        ],
    ]);
});
