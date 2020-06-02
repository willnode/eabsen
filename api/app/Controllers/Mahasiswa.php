<?php

namespace App\Controllers;

use App\Models\ProfileModel;
use Config\Database;

class Mahasiswa extends BaseController
{
	const ROLE = 'mahasiswa';

	public function index()
	{
		return load_info([
			'routes' => [
				'/mahasiswa/profile/',
				'/mahasiswa/masuk/',
			],
		]);
	}

	public function profile()
	{
		return (new ProfileModel())->execute($this->login->current_id);
	}

	public function masuk()
	{
		if (isset($_POST['kode'])) {
			$db = Database::connect();
			$kelas = Database::connect()->table('pertemuan')
			->join('kelas', 'pertemuan.pertemuan_kelas = kelas.kelas_id')
			->where('pertemuan_token', $_POST['kode'])->get()->getRow();
			if ($kelas) {
				$db->table('absen')->replace([
					'absen_mahasiswa' => $this->login->current_id,
					'absen_pertemuan' => $kelas->pertemuan_id,
				]);
				return load_ok([
					'pertemuan' => $kelas,
				]);
			} else {
				return load_error('Kelas tidak ditemukan');
			}
		}
		return load_404();
	}
}
