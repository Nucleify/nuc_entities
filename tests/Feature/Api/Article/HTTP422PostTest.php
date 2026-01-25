<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-api-422');
uses()->group('article-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function (): void {
    apiTestArray([
        // TITLE TESTS
        'title > empty' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['title' => '']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],
        'title > integer' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['title' => 1]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > too short' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['title' => 'ti']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be at least 3 characters.']]],
        ],
        'title > false' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['title' => false]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > true' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['title' => true]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > empty array' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['title' => []]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],

        // DESCRIPTION TESTS
        'description > integer' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['description' => 1]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 10 characters.']]],
        ],
        'description > too short' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['description' => 'test']),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be at least 10 characters.']]],
        ],
        'description > false' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['description' => false]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 10 characters.']]],
        ],
        'description > true' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['description' => true]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 10 characters.']]],
        ],
        'description > empty array' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['description' => []]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'POST',
            'route' => 'articles.store',
            'data' => array_merge(articleData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
    ]);
});
