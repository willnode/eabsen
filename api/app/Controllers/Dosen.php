<?php namespace App\Controllers;

use App\Models\AbsenModel;
use App\Models\KelasModel;
use App\Models\LaporanModel;
use App\Models\PertemuanModel;
use App\Models\ProfileModel;
use Config\Database;

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
	public function laporan($id = NULL)
	{
		return (new LaporanModel())->execute($id);
	}




	public function barcode($id=NULL)
	{
		$row = Database::connect()->table('pertemuan')
		->join('kelas', 'pertemuan.pertemuan_kelas = kelas.kelas_id')
		->where('pertemuan_id', $id)->get()->getRow();
		$nama = $row->kelas_matakuliah;
		$barcode = $row->pertemuan_token;
		$generator = new \Picqer\Barcode\BarcodeGeneratorHTML();
		return view('barcode', [
			'nama' => $nama,
			'barcode' => $generator->getBarcode($barcode, $generator::TYPE_CODE_128, 2, 100),
			'serial' => $barcode
		]);
	}
}