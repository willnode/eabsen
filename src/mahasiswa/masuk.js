import React, { useState } from 'react';
import Page from '../widget/page';
import { controlInput, controlTextarea, controlSubmit, controlOption, controlDiv } from '../widget/controls';
import session from '../Session';
import { Link } from 'react-router-dom';

function submit(e) {
	(session.postByRole('biodata/', session.extract(e))
		.then(() => {
			session.setMessage('Berhasil disimpan');
		})
		.catch((e) => session.setError(e))
	)
}

export default function () {
	const [data, setData] = useState(null);
	const form = data && data.data;
	return (
		<Page src="biodata" dataCallback={setData} >
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="h3 mb-0 text-gray-800">Form Biodata</h1>
			</div>
			{
				data ? (<form onSubmit={submit}>
					{controlDiv({label: 'Nama', value: form.nama, class: 'd-block'})}
					{controlDiv({label: 'Email', value: form.email, class: 'd-block'})}
					{controlDiv({label: 'HP / WA', value: form.hp, class: 'd-block'})}
					<p className="text-muted">Jika ada kesalahan biodata diatas silahkan koreksi di <Link to="/siswa/profil">halaman profil</Link></p>
					<hr/>
					{controlOption({name: 'jenis_kelamin', label: 'Jenis Kelamin', value: form.jenis_kelamin, required: true, options: [
						{key: 'L', value: 'Laki-Laki'},
						{key: 'P', value: 'Perempuan'},
					], option_key: 'key', option_value: 'value'})}
					{controlInput({name: 'tempat_lahir', label: 'Tempat Lahir', value: form.tempat_lahir, required: true})}
					{controlInput({name: 'tanggal_lahir', label: 'Tanggal Lahir', value: form.tanggal_lahir, type: 'date', required: true})}
					{controlInput({name: 'asal_sekolah', label: 'Asal Sekolah', value: form.asal_sekolah, required: true})}
					{controlTextarea({name: 'alamat_sekolah', label: 'Alamat Sekolah', value: form.alamat_sekolah, required: true})}
					{controlOption({name: 'kelas_sekolah', label: 'Kelas', value: form.kelas_sekolah, required: true, options: [
						{key: '10', value: '10'},
						{key: '11', value: '11'},
						{key: '12', value: '12'},
						{key: 'lulus', value: 'Sudah Lulus'},
					], option_key: 'key', option_value: 'value'})}
					{controlSubmit()}
				</form>) : <></>
			}
		</Page>)
}