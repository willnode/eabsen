import React from 'react';
import { Page } from '../../widget/page';
import {
  Form, Input, Submit, Select, BackButton
} from '../../widget/controls';
import { useParams } from 'react-router-dom';
import { history } from '../../main/Helper';
import Button from '@material-ui/core/Button';


export default function () {
  const id = useParams().id || 0;
  return (
    <Page className="paper" maxWidth="sm" src={'dosen/kelas/' + id}>
      {({ data }) => (
        <Form action={'dosen/kelas/' + (id || '')} redirect={history().goBack}>
          <Input name="kelas_matakuliah" label="Matakuliah / Program Studi" defaultValue={data.kelas_matakuliah} />
          <Input name="kelas_ruang" label="Ruang" defaultValue={data.kelas_ruang} />
          <Input name="kelas_waktu" label="Waktu" defaultValue={data.kelas_waktu} type="time" />
          <Select name="kelas_hari" label="Hari" defaultValue={data.kelas_hari}
            options={{ 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu', 7: 'Minggu', }} />
          <Submit />
          <BackButton variant="contained"/>
          {id !== 0 && <Button color="secondary" variant="outlined" onClick={() => (
            window.confirm(`Anda yakin ingin menghapus kelas ini?`) &&
            controlDelete('dosen/kelas/' + id, (() => { history().goBack() }))()
          )} style={{
            marginTop: 8,
            marginBottom: 8,
            width: '100%',
          }}>Hapus</Button>}
        </Form>
      )}
    </Page>)
}
