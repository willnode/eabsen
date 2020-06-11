import React from 'react';
import { RemoteTable, actionColumns } from '../../widget/table';

export default function () {
	return <RemoteTable
		options={{
			title: "Matakuliah",
			actions: ['back', 'create'],
			searchable: false,
		}}
		columns={{
			kelas_matakuliah: 'Matakuliah',
			kelas_waktu: 'Waktu',
			kelas_hari: 'Hari',
			kelas_id: actionColumns(['detail', 'edit', 'delete', 'print'], 'Kelas'),
		}} />
}
