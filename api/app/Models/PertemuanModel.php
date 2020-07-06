<?php namespace App\Models;

class PertemuanModel extends BaseModel
{
	protected $table = 'pertemuan';
	protected $primaryKey = 'pertemuan_id';
	protected $select = [
		'pertemuan_id', 'pertemuan_nth',
		'pertemuan_tanggal',
		'pertemuan_kelas', 'pertemuan_token',
	];
	protected $indexable = [
		'pertemuan_kelas'
	];
	protected $lookUp = [
		'pertemuan_kelas' => KelasModel::class,
	];
	protected $only = [
		SELECT
	];
}