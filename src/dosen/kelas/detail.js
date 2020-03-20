import React from 'react';
import { useParams } from 'react-router-dom';
import { controlTable, controlButtons } from '../../widget/controls';

export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}

	return <div>
		{controlTable({
			url: `pertemuan/${id}`,
			toolbar: controlButtons([{
				href: 'create',
				title: 'New',
				icon: 'fa fa-plus',
				style: 'btn btn-success ml-2',
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
				href: `delete/${value}`,
				style: 'btn btn-sm btn-danger',
				icon: 'fa fa-trash',
				confirm: 'Yakin?'
			}]))
		}])
		}
	</div>
}
