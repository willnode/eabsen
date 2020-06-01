<?php namespace App\Models;

class RegisterModel extends BaseModel
{
	protected $table = 'login';
	protected $primaryKey = 'login_id';
	protected $allowedFields = [
		'nama', 'password', 'role', 'nim', 'nip'
	];
	protected $validationRules = [
		'name' => 'required|min_length[3]|alpha_numeric_space',
		'email' => 'required|valid_email',
		'password' => 'required|min_length[8]',
		'role' => 'required|in_list[dosen,mahasiswa]',
	];
	protected $only = [ CREATE ];

	protected function executeBeforeChange($event)
	{
		extract($event, EXTR_REFS);

		control_password_update($data);

		return $event;
	}
}