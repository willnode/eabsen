import React from 'react';
import { useParams } from 'react-router-dom';
import { controlTable, controlButtons } from '../../widget/controls';
import session from '../../Session';

export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}

	return <div>
		{controlTable({
			url: `absen/${id}`,
			toolbar: controlButtons([{
				href: 'create',
				title: 'New',
				icon: 'fa fa-plus',
				style: 'btn btn-success ml-2',
			}])
		}, [{
			field: 'avatar',
			title: '#',
			width: 100,
			formatter: (value) => (

				<img alt="" style={{ maxWidth: '100px', height: '100px', objectFit: 'contain' }} src={value ? session.baseUrl(`uploads/toko/${value}`) : '/assets/user.png'} />

			)
		}, {
			field: 'nim',
			title: 'NIM',
		}, {
			field: 'absen_waktu',
			title: 'Waktu',
		}])
		}
	</div>
}
