<?php namespace App\Models;

class ProfileModel extends BaseModel
{
	protected $table = 'login';
	protected $primaryKey = 'login_id';
	protected $select = [
		'login_id', 'username',	'nama', 'identity', 'prodi', 'avatar', 'role',
	];
	protected $allowedFields = [
		'nama', 'avatar', 'password', 'identity', 'prodi'
	];
	protected $fileUploadRules = [
		'avatar' => ['types' => ['jpg', 'png', 'bmp']]
	];
	protected $validationRules = [
		'nama' => 'required|min_length[3]',
	];
	protected $only = [ SELECT, UPDATE ];

	protected function executeBeforeChange($event)
	{
		extract($event, EXTR_REFS);

		// Password Change
		if ($method === UPDATE) {
			if (!empty($data['password'])) {
				if(control_password_update($data)) {
					$data['otp'] = NULL;
				}
			} else {
				unset($data['password']);
			}
		}
		return $event;
	}
}