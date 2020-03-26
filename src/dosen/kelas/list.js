import React from 'react';
import { controlTable, controlButtons, controlDelete } from '../../widget/controls';

export default function () {
	return <div>
		{controlTable({
			url: 'kelas',
			toolbar: controlButtons([{
				href: 'create',
				title: 'Kelas Baru',
				icon: 'fa fa-plus',
				style: 'btn btn-success ml-2',
			}])
		}, [{
			field: 'kelas_matakuliah',
			title: 'Matakuliah',
		}, {
			field: 'kelas_waktu',
			title: 'Waktu',
		}, {
			field: 'kelas_hari',
			title: 'Hari',
		}, {
			field: 'kelas_id',
			title: 'Action',
			formatter: (value) => (controlButtons([{
				href: `detail/${value}`,
				style: 'btn btn-sm btn-primary',
				title: 'Lihat',
				icon: 'fa fa-link',
			}, {
				href: `edit/${value}`,
				style: 'btn btn-sm btn-warning',
				icon: 'fa fa-edit',
			}, {
				href: controlDelete('kelas', value),
				key: 'del'+value,
				style: 'btn btn-sm btn-danger',
				icon: 'fa fa-trash',
				confirm: 'Yakin?'
			}]))
		}])
		}
	</div>
}
