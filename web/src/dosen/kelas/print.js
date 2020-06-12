import React from 'react';
import {Page} from '../../widget/page';
import {
	Form, Input, Submit, Select, BackButton
} from '../../widget/controls';
import { useParams } from 'react-router-dom';
import { history } from '../../main/Helper';


export default function () {
  const id = useParams().id || 0;
	return (
		<Page className="paper" src={'dosen/kelas/' + id}>
			{({ data }) => (
				<table border='1' >
					<thead>
						<tr>
							<th>Nama Mahasiswa</th>
							<th>Pertemuan ke</th>
							<th>Jam ke</th>
							<th>MataKuliah</th>
							<th>Keterangan</th>
						</tr>
					</thead>
					<tbody>
					<tr>
							<th>#</th>
							<th>Mata Kuliah</th>
							<th>Ruang Kuliah</th>
							<th>Waktu Kuliah</th>
							<th>Hari Kuliah</th>
						</tr>
					</tbody>	
				</table>
			)}
		</Page>)
}
