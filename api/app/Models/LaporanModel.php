<?php namespace App\Models;

class LaporanModel extends BaseModel
{
	protected $table = 'kelas';
	protected $primaryKey = 'kelas_id';
	protected $select = [
		'kelas_id', 'kelas_ruang', 'kelas_matakuliah',
		'kelas_waktu', 'kelas_hari',
	];
	protected $only = [
		SELECT
	];
	protected $lookDown = [
		'pertemuan' => SubLaporanModel::class
	];
}
class SubLaporanModel extends BaseModel
{
	protected $table = 'pertemuan';
	protected $primaryKey = 'pertemuan_id';
	protected $compositeKey = 'pertemuan_kelas';
	protected $select = [
		'pertemuan_id', 'pertemuan_nth',
		'pertemuan_tanggal', 'pertemuan_kelas'
	];
	protected $indexable = [
		'pertemuan_kelas'
	];
	protected $only = [
		SELECT
	];
	protected $lookDown = [
		'absen' => SubSubLaporanModel::class
	];
}
class SubSubLaporanModel extends BaseModel
{
	protected $table = 'laporan';
	protected $primaryKey = 'login_id';
	protected $compositeKey = 'pertemuan_id';
	protected $only = [
		SELECT
	];
	protected $select = [
		'nim', 'nama'
	];

}
