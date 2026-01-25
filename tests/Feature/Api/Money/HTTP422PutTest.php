<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-api-422');
uses()->group('money-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function (): void {
    apiTestArray([
        // USER ID TESTS
        'user_id > empty' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['user_id' => '']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > string' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['user_id' => 'user_id']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['user_id' => false]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['user_id' => []]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],

        // COUNT TESTS
        'count > empty' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['count' => '']),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field is required.']]],
        ],
        'count > string' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['count' => 'count']),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field must be an integer.']]],
        ],
        'count > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['count' => false]),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field must be an integer.']]],
        ],
        'count > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['count' => []]),
            'structure' => ['errors' => ['count']],
            'fragment' => ['errors' => ['count' => ['The count field is required.']]],
        ],

        // SENDER TESTS
        'sender > empty' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['sender' => '']),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field is required.']]],
        ],
        'sender > integer' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['sender' => 1]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field must be a string.']]],
        ],
        'sender > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['sender' => false]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field must be a string.']]],
        ],
        'sender > true' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['sender' => true]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field must be a string.']]],
        ],
        'sender > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['sender' => []]),
            'structure' => ['errors' => ['sender']],
            'fragment' => ['errors' => ['sender' => ['The sender field is required.']]],
        ],

        // RECEIVER TESTS
        'receiver > empty' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['receiver' => '']),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field is required.']]],
        ],
        'receiver > integer' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['receiver' => 1]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field must be a string.']]],
        ],
        'receiver > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['receiver' => false]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field must be a string.']]],
        ],
        'receiver > true' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['receiver' => true]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field must be a string.']]],
        ],
        'receiver > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['receiver' => []]),
            'structure' => ['errors' => ['receiver']],
            'fragment' => ['errors' => ['receiver' => ['The receiver field is required.']]],
        ],

        // TITLE TESTS
        'title > empty' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['title' => '']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],
        'title > integer' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['title' => 1]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > too short' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['title' => 'ti']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be at least 3 characters.']]],
        ],
        'title > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['title' => false]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > true' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['title' => true]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['title' => []]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],

        // DESCRIPTION TESTS
        'description > integer' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['description' => 1]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > too short' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['description' => 't']),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be at least 3 characters.']]],
        ],
        'description > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['description' => false]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > true' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['description' => true]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['description' => []]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'PUT',
            'route' => 'money.update',
            'id' => 1,
            'data' => array_merge(updatedMoneyData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field is required.']]],
        ],
    ]);
});
