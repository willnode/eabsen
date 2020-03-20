import React, { useState } from 'react';
import Page from '../../widget/page';
import {
	controlInput, controlSubmit, controlBack
} from '../../widget/controls';
import session from '../../Session';
import { useParams } from 'react-router-dom';


export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}
	function submit(e) {
		(session.postByRole('santri/update/' + id, session.extract(e))
			.then(() => session.setMessage('Berhasil disimpan'))
			.catch((e) => session.setError(e))
		)
	}
	const [d, setData] = useState(null);
	const data = (d && d.data);
	return (
		<Page src={'kelas/' + id} dataCallback={setData}>
			{!data ? '' : (
			<form onSubmit={submit}>
				{controlInput({name: 'kelas_matakuliah', label: 'Matakuliah', value: data.kelas_matakuliah, })}
				{controlInput({name: 'kelas_waktu', label: 'Waktu', value: data.kelas_waktu, })}
				{controlInput({name: 'kelas_hari', label: 'Hari', value: data.kelas_hari })}
				{controlSubmit()}
			</form>)}
			{controlBack()}
		</Page>)
}
