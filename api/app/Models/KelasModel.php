<?php namespace App\Models;

class KelasModel extends BaseModel
{
	protected $table = 'kelas';
	protected $primaryKey = 'kelas_id';
	protected $select = [
		'kelas_id', 'kelas_ruang', 'kelas_matakuliah',
		'kelas_waktu', 'kelas_hari',
	];
	protected $allowedFields = [
		'kelas_ruang', 'kelas_matakuliah',
		'kelas_waktu', 'kelas_hari',
	];
	protected $validationRules = [
		'kelas_ruang' => 'required',
		'kelas_matakuliah' => 'required',
		'kelas_waktu' => 'required',
		'kelas_hari' => 'required',
	];

	function executeBeforeExecute($event)
	{
		$this->where['kelas_dosen'] = $event['request']->login->current_id;
		return $event;
	}


	function executeBeforeChange($event)
	{
		extract($event, EXTR_REFS);
		if ($method === UPDATE && $action === 'pertemuan_baru')
		{
			$db = \Config\Database::connect();
			$db->simpleQuery("CALL `".$db->prefixTable ('pertemuan__generate')."`(".
			$db->escape($id[0]).", ".$db->escape(rand(111111, 999999)).")");
		}
		return $event;
	}
}