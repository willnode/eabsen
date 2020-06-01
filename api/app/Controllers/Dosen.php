<?php namespace App\Controllers;

use App\Models\AbsenModel;
use App\Models\KelasModel;
use App\Models\PertemuanModel;
use App\Models\ProfileModel;

class Dosen extends BaseController
{
	const ROLE = 'dosen';

	public function index()
	{
		return load_info([
			'routes'=>[
				'/dosen/profile/',
				'/dosen/pertemuan/',
				'/dosen/kelas/',
			],
		]);
	}

	public function profile()
	{
		return (new ProfileModel())->execute($this->login->current_id);
	}

	public function absen($id = NULL)
	{
		return (new AbsenModel())->execute($id);
	}

	public function pertemuan($id = NULL)
	{
		return (new PertemuanModel())->execute($id);
	}

	public function kelas($id = NULL)
	{
		return (new KelasModel())->execute($id);
	}


	public function barcode($id=NULL)
	{
		$this->db->join('kelas', 'pertemuan.pertemuan_kelas = kelas.kelas_id');
		$row = get_values_at('pertemuan', $id, 'load_404', 'pertemuan_id');
		$nama = $row->kelas_matakuliah;
		$barcode = $row->pertemuan_token;
		$generator = new Picqer\Barcode\BarcodeGeneratorHTML();
		echo '<html><body style="display:flex;flex-direction:column;text-align:center">';
		echo '<div style="margin:auto"><p>'.$nama.'</p>';
		echo $generator->getBarcode($barcode, $generator::TYPE_CODE_128, 2, 100);
		echo '<p>'.$barcode.'</p></div></body></html>';
		exit;
	}
}