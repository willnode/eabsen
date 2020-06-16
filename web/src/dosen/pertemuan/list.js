import React, { useEffect } from 'react';
import { RemoteTable, actionColumns } from '../../widget/table';
import { useParams } from 'react-router-dom';
import { serverPost, history, getQueryParam } from '../../main/Helper';
import { Page } from '../../widget/page';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';

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
				tooltip: 'Baru',
				onClick: () => history().push(`/dosen/pertemuan/create/`+getQueryParam('pertemuan_kelas'))
			  }, {
				key: 'print',
				icon: () => <PrintIcon />,
				tooltip: 'Cetak',
				onClick: () => history().push(`/dosen/kelas/print/`+getQueryParam('pertemuan_kelas'))
			  }],
			searchable: false,
			tableProps: {
				size: "small",
			}
		}}
		columns={{
			pertemuan_nth: '#',
			pertemuan_tanggal: 'Tanggal',
			pertemuan_id: actionColumns(['detail',  'delete'], 'Pertemuan'),
		}} />
}

