import React, { useEffect } from 'react';
import { RemoteTable, actionColumns } from '../../widget/table';
import { useParams, Link } from 'react-router-dom';
import { Page } from '../../widget/page';
import { serverUrl, publicUrl } from '../../main/Config';
import { Context } from '../../main/Contexts';
import Button from '@material-ui/core/Button';

export default function () {
  const id = useParams().id || 0;
  const [URI, setURI] = React.useState();
  useEffect(() => {
    fetch(serverUrl + '/dosen/barcode/' + id, {
      headers: {
        'Authorization': Context.get('auth'),
        'X-Requested-With': 'xmlhttprequest',
      }
    }).then(r => r.blob().then(b => setURI(URL.createObjectURL(b))))
  }, []);
	return <>
		<Page className="paper">
			{URI && <iframe title="Barcode" style={{ width: '100%', height: '260px', border: 0 }}
				src={URI} />}
		</Page>
		<Page src={"dosen/pertemuan/"+id} className="paper center">
			{({data}) => (
				<div>
					<Button component="a" variant="contained" color="primary" target="_blank" href={"https://api.whatsapp.com/send?text="+encodeURIComponent(serverUrl+'/barcode?nama='+encodeURIComponent(data.pertemuan_kelas.kelas_matakuliah)+'&kode='+data.pertemuan_token)}>Bagikan Barcode Link</Button>
					<Button component="a" variant="contained" color="primary" target="_blank" href={"https://api.whatsapp.com/send?text="+encodeURIComponent('https://eabsen-aksi.dom.my.id/mahasiswa/masuk?kode='+data.pertemuan_token)}>Bagikan Join Link</Button>
				</div>
			)}
		</Page>
		<RemoteTable
			src={`dosen/absen/?absen_pertemuan=` + id}
			options={{
				title: "Absen",
				actions: ['back'],
				searchable: false,
			}}
			columns={{
				nim: 'NIM',
				absen_waktu: 'Waktu',
			}} /></>
}
