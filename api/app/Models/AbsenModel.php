<?php namespace App\Models;

class AbsenModel extends BaseModel
{
	protected $table = 'absen';
	protected $primaryKey = 'absen_id';
	protected $select = [
		'absen_id', 'absen_waktu', 'absen_mahasiswa', 'nama', 'identity', 'avatar'
	];
	protected $indexable = [
		'absen_pertemuan'
	];
	protected $join = [
		['login', 'login.login_id = absen.absen_mahasiswa']
	];

}