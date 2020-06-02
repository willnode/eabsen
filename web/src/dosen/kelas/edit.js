import React from 'react';
import {Page} from '../../widget/page';
import {
	Form, Input, Submit, Select, BackButton
} from '../../widget/controls';
import { useParams } from 'react-router-dom';
import { history } from '../../main/Helper';


export default function () {
  const id = useParams().id || 0;
	return (
		<Page className="paper" src={'dosen/kelas/' + id}>
			{({ data }) => (
				<Form action={'dosen/kelas/' + (id || '')} redirect={history().goBack}>
          <Input name="kelas_matakuliah" label="Matakuliah" defaultValue={data.kelas_matakuliah} />
          <Input name="kelas_ruang" label="Ruang" defaultValue={data.kelas_ruang} />
          <Input name="kelas_waktu" label="Waktu" defaultValue={data.kelas_waktu} type="time"/>
          <Select name="kelas_hari" label="Hari" defaultValue={data.kelas_hari}
            options={{1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu', 7: 'Minggu', }}/>
					<Submit />
          <BackButton />
				</Form>
			)}
		</Page>)
}
