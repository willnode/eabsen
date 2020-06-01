import React, { useEffect } from 'react';
import { RemoteTable, actionColumns } from '../../widget/table';
import { useParams, Link } from 'react-router-dom';
import { Page } from '../../widget/page';
import { serverUrl } from '../../main/Config';
import { Context } from '../../main/Contexts';

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
