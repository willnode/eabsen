import React from 'react';
import { useParams } from 'react-router-dom';
import session from '../../Session';

export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}

	return <div className="text-center">
		<iframe title="Barcode" style={{width: '100%', height: '260px', border: 0}} src={session.baseUrl('dosen/barcode/'+id)}/>
		<button className="btn btn-secondary" onClick={() => session.history.goBack()}>
			<i className="fa fa-chevron-left mr-2"/>Kembali</button>
	</div>
}
