<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('contact-api-422');
uses()->group('contact-api-422-post');
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
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['user_id' => '']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field is required.']]],
        ],
        'user_id > string' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['user_id' => 'user_id']),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['user_id' => false]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field must be an integer.']]],
        ],
        'user_id > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['user_id' => []]),
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => ['user_id' => ['The user id field is required.']]],
        ],

        // FIRST NAME TESTS
        'first_name > empty' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => '']),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field is required.']]],
        ],
        'first_name > integer' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => 1]),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field must be at least 3 characters.', 'The first name field must be a string.']]],
        ],
        'first_name > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => false]),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field must be at least 3 characters.', 'The first name field must be a string.']]],
        ],
        'first_name > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => true]),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field must be at least 3 characters.', 'The first name field must be a string.']]],
        ],
        'first_name > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => 'L']),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field must be at least 3 characters.']]],
        ],
        'first_name > too long' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.']),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field must not be greater than 30 characters.']]],
        ],
        'first_name > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['first_name' => []]),
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => ['first_name' => ['The first name field is required.']]],
        ],

        // LAST NAME TESTS
        'last_name > integer' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['last_name' => 1]),
            'structure' => ['errors' => ['last_name']],
            'fragment' => ['errors' => ['last_name' => ['The last name field must be at least 3 characters.', 'The last name field must be a string.']]],
        ],
        'last_name > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['last_name' => false]),
            'structure' => ['errors' => ['last_name']],
            'fragment' => ['errors' => ['last_name' => ['The last name field must be at least 3 characters.', 'The last name field must be a string.']]],
        ],
        'last_name > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['last_name' => true]),
            'structure' => ['errors' => ['last_name']],
            'fragment' => ['errors' => ['last_name' => ['The last name field must be at least 3 characters.', 'The last name field must be a string.']]],
        ],
        'last_name > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['last_name' => 'L']),
            'structure' => ['errors' => ['last_name']],
            'fragment' => ['errors' => ['last_name' => ['The last name field must be at least 3 characters.']]],
        ],
        'last_name > too long' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['last_name' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do et aliqua laborum.']),
            'structure' => ['errors' => ['last_name']],
            'fragment' => ['errors' => ['last_name' => ['The last name field must not be greater than 30 characters.']]],
        ],
        'last_name > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['last_name' => []]),
            'structure' => ['errors' => ['last_name']],
            'fragment' => ['errors' => ['last_name' => ['The last name field must be at least 3 characters.', 'The last name field must be a string.']]],
        ],

        // EMAIL TESTS
        'email > format' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['email' => 'admin.example.com']),
            'structure' => ['errors' => ['email']],
            'fragment' => ['errors' => ['email' => ['The email field must be a valid email address.']]],
        ],
        'email > integer' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['email' => 1]),
            'structure' => ['errors' => ['email']],
            'fragment' => ['errors' => ['email' => ['The email field must be at least 3 characters.', 'The email field must be a valid email address.']]],
        ],
        'email > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['email' => false]),
            'structure' => ['errors' => ['email']],
            'fragment' => ['errors' => ['email' => ['The email field must be at least 3 characters.', 'The email field must be a valid email address.']]],
        ],
        'email > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['email' => true]),
            'structure' => ['errors' => ['email']],
            'fragment' => ['errors' => ['email' => ['The email field must be at least 3 characters.', 'The email field must be a valid email address.']]],
        ],
        'email > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['email' => []]),
            'structure' => ['errors' => ['email']],
            'fragment' => ['errors' => ['email' => ['The email field must be a valid email address.', 'The email field must be at least 3 characters.']]],
        ],

        // PERSONAL PHONE TESTS
        'personal_phone > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['personal_phone' => false]),
            'structure' => ['errors' => ['personal_phone']],
            'fragment' => ['errors' => ['personal_phone' => ['The personal phone field must be a string.', 'The personal phone field must be at least 9 characters.', 'The personal phone field format is invalid.']]],
        ],
        'personal_phone > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['personal_phone' => true]),
            'structure' => ['errors' => ['personal_phone']],
            'fragment' => ['errors' => ['personal_phone' => ['The personal phone field must be a string.', 'The personal phone field must be at least 9 characters.', 'The personal phone field format is invalid.']]],
        ],
        'personal_phone > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['personal_phone' => '9876543']),
            'structure' => ['errors' => ['personal_phone']],
            'fragment' => ['errors' => ['personal_phone' => ['The personal phone field must be at least 9 characters.', 'The personal phone field format is invalid.']]],
        ],
        'personal_phone > too long' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['personal_phone' => '98 76 543 210 123']),
            'structure' => ['errors' => ['personal_phone']],
            'fragment' => ['errors' => ['personal_phone' => ['The personal phone field must not be greater than 9 characters.', 'The personal phone field format is invalid.']]],
        ],
        'personal_phone > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['personal_phone' => []]),
            'structure' => ['errors' => ['personal_phone']],
            'fragment' => ['errors' => ['personal_phone' => ['The personal phone field must be a string.', 'The personal phone field must be at least 9 characters.', 'The personal phone field format is invalid.']]],
        ],

        // WORK PHONE TESTS
        'work_phone > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['work_phone' => false]),
            'structure' => ['errors' => ['work_phone']],
            'fragment' => ['errors' => ['work_phone' => ['The work phone field must be a string.', 'The work phone field must be at least 9 characters.', 'The work phone field format is invalid.']]],
        ],
        'work_phone > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['work_phone' => true]),
            'structure' => ['errors' => ['work_phone']],
            'fragment' => ['errors' => ['work_phone' => ['The work phone field must be a string.', 'The work phone field must be at least 9 characters.', 'The work phone field format is invalid.']]],
        ],
        'work_phone > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['work_phone' => '9876543']),
            'structure' => ['errors' => ['work_phone']],
            'fragment' => ['errors' => ['work_phone' => ['The work phone field must be at least 9 characters.', 'The work phone field format is invalid.']]],
        ],
        'work_phone > too long' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['work_phone' => '98 76 543 210 123']),
            'structure' => ['errors' => ['work_phone']],
            'fragment' => ['errors' => ['work_phone' => ['The work phone field must not be greater than 9 characters.', 'The work phone field format is invalid.']]],
        ],
        'work_phone > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['work_phone' => []]),
            'structure' => ['errors' => ['work_phone']],
            'fragment' => ['errors' => ['work_phone' => ['The work phone field must be a string.', 'The work phone field format is invalid.', 'The work phone field must be at least 9 characters.']]],
        ],

        // ADDRESS TESTS
        'address > integer' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['address' => 1]),
            'structure' => ['errors' => ['address']],
            'fragment' => ['errors' => ['address' => ['The address field must be at least 15 characters.', 'The address field must be a string.']]],
        ],
        'address > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['address' => false]),
            'structure' => ['errors' => ['address']],
            'fragment' => ['errors' => ['address' => ['The address field must be at least 15 characters.', 'The address field must be a string.']]],
        ],
        'address > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['address' => true]),
            'structure' => ['errors' => ['address']],
            'fragment' => ['errors' => ['address' => ['The address field must be at least 15 characters.', 'The address field must be a string.']]],
        ],
        'address > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['address' => 'Lorem ipsum.']),
            'structure' => ['errors' => ['address']],
            'fragment' => ['errors' => ['address' => ['The address field must be at least 15 characters.']]],
        ],
        'address > too long' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['address' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua']),
            'structure' => ['errors' => ['address']],
            'fragment' => ['errors' => ['address' => ['The address field must not be greater than 100 characters.']]],
        ],
        'address > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['address' => []]),
            'structure' => ['errors' => ['address']],
            'fragment' => ['errors' => ['address' => ['The address field must be a string.', 'The address field must be at least 15 characters.']]],
        ],

        // BIRTHDAY TESTS
        'birthday > integer' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['birthday' => 1]),
            'structure' => ['errors' => ['birthday']],
            'fragment' => ['errors' => ['birthday' => ['The birthday field must be a valid date.']]],
        ],
        'birthday > string' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['birthday' => 'birthday']),
            'structure' => ['errors' => ['birthday']],
            'fragment' => ['errors' => ['birthday' => ['The birthday field must be a valid date.']]],
        ],
        'birthday > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['birthday' => true]),
            'structure' => ['errors' => ['birthday']],
            'fragment' => ['errors' => ['birthday' => ['The birthday field must be a valid date.']]],
        ],
        'birthday > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['birthday' => false]),
            'structure' => ['errors' => ['birthday']],
            'fragment' => ['errors' => ['birthday' => ['The birthday field must be a valid date.']]],
        ],
        'birthday > date' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['birthday' => '30.30.2023']),
            'structure' => ['errors' => ['birthday']],
            'fragment' => ['errors' => ['birthday' => ['The birthday field must be a valid date.']]],
        ],
        'birthday > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['birthday' => []]),
            'structure' => ['errors' => ['birthday']],
            'fragment' => ['errors' => ['birthday' => ['The birthday field must be a valid date.']]],
        ],

        // CONTACT GROUPS TESTS
        'contact_groups > true' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['contact_groups' => true]),
            'structure' => ['errors' => ['contact_groups']],
            'fragment' => ['errors' => ['contact_groups' => ['The contact groups field must be a string.']]],
        ],
        'contact_groups > false' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['contact_groups' => false]),
            'structure' => ['errors' => ['contact_groups']],
            'fragment' => ['errors' => ['contact_groups' => ['The contact groups field must be a string.']]],
        ],
        'contact_groups > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['contact_groups' => []]),
            'structure' => ['errors' => ['contact_groups']],
            'fragment' => ['errors' => ['contact_groups' => ['The contact groups field must be a string.']]],
        ],

        // ROLE TESTS
        'role > integer' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['role' => 1]),
            'structure' => ['errors' => ['role']],
            'fragment' => ['errors' => ['role' => ['The role field must be a string.', 'The selected role is invalid.']]],
        ],
        'role > example' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['role' => 'example']),
            'structure' => ['errors' => ['role']],
            'fragment' => ['errors' => ['role' => ['The selected role is invalid.']]],
        ],
        'role > empty array' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => array_merge(contactData, ['role' => []]),
            'structure' => ['errors' => ['role']],
            'fragment' => ['errors' => ['role' => ['The role field must be a string.', 'The selected role is invalid.']]],
        ],
    ]);
});
