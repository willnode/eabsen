import React, { useEffect } from 'react';
import { RemoteTable, actionColumns } from '../../widget/table';
import { useParams } from 'react-router-dom';
import { serverPost, history, getQueryParam } from '../../main/Helper';
import { Page } from '../../widget/page';
import AddIcon from '@material-ui/icons/Add';

export function PertemuanBaru() {
	const id = useParams().id;
	useEffect(() => {
		serverPost('dosen/kelas/'+id, {
			'action': 'pertemuan_baru'
		}).then(x => history().goBack());
	}, []);
	return <Page className="paper" />;
}

export default function () {
	return <RemoteTable
		options={{
			title: "Pertemuan",
			actions: ['back', {
				key: 'create',
				icon: () => <AddIcon />,
				tooltip: 'New',
				onClick: () => history().push(`/dosen/pertemuan/create/`+getQueryParam('pertemuan_kelas'))
			  }],
			searchable: false,
		}}
		columns={{
			pertemuan_nth: '#',
			pertemuan_tanggal: 'Tanggal',
			pertemuan_id: actionColumns(['detail',  'delete'], 'Pertemuan'),
		}} />
}

