<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('article-api-422');
uses()->group('article-api-422-put');
uses()->group('api-422');
uses()->group('api-422-put');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > PUT', function (): void {
    apiTestArray([
        // TITLE TESTS
        'title > empty' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['title' => '']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],
        'title > integer' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['title' => 1]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > too short' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['title' => 'ti']),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be at least 3 characters.']]],
        ],
        'title > false' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['title' => false]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > true' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['title' => true]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field must be a string.', 'The title field must be at least 3 characters.']]],
        ],
        'title > empty array' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['title' => []]),
            'structure' => ['errors' => ['title']],
            'fragment' => ['errors' => ['title' => ['The title field is required.']]],
        ],

        // DESCRIPTION TESTS
        'description > integer' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['description' => 1]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 10 characters.']]],
        ],
        'description > too short' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['description' => 'test']),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be at least 10 characters.']]],
        ],
        'description > false' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['description' => false]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 10 characters.']]],
        ],
        'description > true' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['description' => true]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 10 characters.']]],
        ],
        'description > empty array' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['description' => []]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'PUT',
            'route' => 'articles.update',
            'id' => 1,
            'data' => array_merge(updatedArticleData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
    ]);
});
