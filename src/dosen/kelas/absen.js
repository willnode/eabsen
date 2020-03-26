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
				href: `/dosen/pertemuan/barcode/${id}`,
				title: 'Barcode',
				icon: 'fa fa-plus',
				style: 'btn btn-primary ml-2',
			}, {
				href: () => session.history.goBack(),
				title: 'Kembali',
				key: 'back',
				icon: 'fa fa-chevron-left',
				style: 'btn btn-secondary',
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
