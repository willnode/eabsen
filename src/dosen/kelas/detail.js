import React from 'react';
import { useParams, } from 'react-router-dom';
import { controlTable, controlButtons, controlDelete } from '../../widget/controls';
import { LoadingPage } from '../../widget/page';
import session from '../../Session';

export function PertemuanBaru() {
	const id = useParams().id;
	session.postByRole('pertemuan/'+id, {}).then(x => session.history.replace('/dosen/kelas/absen/'+x.row_id));
	return <LoadingPage />
}

export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}

	return <div>
		{controlTable({
			url: `pertemuan/${id}`,
			toolbar: controlButtons([{
				href: '/dosen/kelas/pertemuan_baru/'+id,
				title: 'Pertemuan Baru',
				icon: 'fa fa-plus',
				style: 'btn btn-primary ml-2',
			}, {
				href: '/dosen/kelas/edit/'+id,
				title: 'Edit Kelas',
				icon: 'fa fa-edit',
				style: 'btn btn-warning',
			}, {
				href: () => session.history.goBack(),
				title: 'Kembali',
				key: 'back',
				icon: 'fa fa-chevron-left',
				style: 'btn btn-secondary',
			}])
		}, [{
			field: 'pertemuan_nth',
			title: '#',
		}, {
			field: 'pertemuan_tanggal',
			title: 'Tanggal',
		}, {
			field: 'pertemuan_id',
			title: 'Action',
			formatter: (value) => (controlButtons([{
				href: `../absen/${value}`,
				style: 'btn btn-sm btn-primary',
				icon: 'fa fa-link',
			}, {
				href: controlDelete('pertemuan/'+id, value),
				style: 'btn btn-sm btn-danger',
				icon: 'fa fa-trash',
				confirm: 'Yakin?'
			}]))
		}])
		}
	</div>
}
