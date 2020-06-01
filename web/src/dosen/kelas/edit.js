import React, { useState } from 'react';
import Page from '../../widget/page';
import {
	controlInput, controlSubmit, controlBack, controlOption, controlPost
} from '../../widget/controls';
import { useParams } from 'react-router-dom';


export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}
	const [d, setData] = useState(null);
	const data = (d && d.data);
	return (
		<Page src={'kelas/' + id} dataCallback={setData}>
			{!data ? '' : (
			<form onSubmit={controlPost('kelas', id)}>
				{controlInput({name: 'kelas_matakuliah', label: 'Matakuliah', value: data.kelas_matakuliah, required: true})}
				{controlInput({name: 'kelas_ruang', label: 'Ruang', value: data.kelas_ruang, required: true})}
				{controlInput({name: 'kelas_waktu', label: 'Waktu', value: data.kelas_waktu, required: true, type: 'time'})}
				{controlOption({name: 'kelas_hari', label: 'Hari', value: data.kelas_hari,
					options: [{k: 1, v: 'Senin'}, {k: 2, v: 'Selasa'}, {k: 3, v: 'Rabu'}, {k: 4, v: 'Kamis'}, {k: 5, v: 'Jumat'}, {k: 6, v: 'Sabtu'}, {k: 0, v: 'Minggu'}], optionKey: 'k', optionValue:'v' })}
				{controlSubmit()}
			</form>)}
			{controlBack()}
		</Page>)
}
