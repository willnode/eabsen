<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Filters extends BaseConfig
{
	// Makes reading things below nicer,
	// and simpler to change out script that's used.
	public $aliases = [
		'toolbar'  => \CodeIgniter\Filters\DebugToolbar::class,
		'cors' => \App\Filters\CORS::class,
		'auth' => \App\Filters\Auth::class,
	];

	// Always applied before every request
	public $globals = [
		'before' => [
			'cors',
		],
		'after'  => [
			'toolbar',
		],
	];

	// Works on all of a particular HTTP method
	// (GET, POST, etc) as BEFORE filters only
	//     like: 'post' => ['CSRF', 'throttle'],
	public $methods = [];

	// List filter aliases and any before/after uri patterns
	// that they should run on, like:
	//    'isLoggedIn' => ['before' => ['account/*', 'profiles/*']],
	public $filters = [
		'auth' => ['before' => [
			'login', 'forgot',
			'dosen/*', 'dosen',
			'mahasiswa/*', 'mahasiswa',
		]],
	];
}
