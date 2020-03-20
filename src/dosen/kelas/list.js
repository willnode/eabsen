import React from 'react';
import { controlTable, controlButtons } from '../../widget/controls';

export default function () {
	return <div>
		{controlTable({
			url: 'kelas',
			toolbar: controlButtons([{
				href: 'create',
				title: 'New',
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
				icon: 'fa fa-link',
			}, {
				href: `edit/${value}`,
				style: 'btn btn-sm btn-warning',
				icon: 'fa fa-edit',
			}, {
				href: `delete/${value}`,
				style: 'btn btn-sm btn-danger',
				icon: 'fa fa-trash',
				confirm: 'Yakin?'
			}]))
		}])
		}
	</div>
}
