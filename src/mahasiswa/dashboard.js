import React, { useState } from 'react';
import Page from '../widget/page';
import session from '../Session';
import { Link } from 'react-router-dom';

function ResendEmail() {
	session.post('send_verification', {
		email: session.login.email
	}).then(_ => session.setMessage('Email sudah terkirim. Silahkan cek inboxnya'))
		.catch(e => session.setError(e));
}

function Checklist({ title, ok, children }) {
	return (
		<div className="col-12 mb-4">
			<div className={`card border-left-${ok ? 'success' : 'danger'} shadow h-100 py-2`}>
				<div className="card-body">
					<div className="row no-gutters align-items-center">
						<div className="col mr-2">
							<div className={`h5 my-3 font-weight-bold text-${ok ? 'success' : 'danger'}`}>
								<i className={'mr-2 fa ' + (ok ? 'fa-check' : 'fa-times')}></i>
								{title}
							</div>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}
export default function () {
	const [data, setData] = useState(null);
	const moment = window.moment;
	return <Page src="info" dataCallback={setData} >
		<div className="d-sm-flex align-items-center justify-content-between mb-4">
			<h1 className="h3 mb-0 text-gray-800">Info Pendaftaran</h1>
		</div>
		{data ? <>
			<div className="row">

				<Checklist title="Verifikasi Email" ok={data.data.email_verified} >
					{data.data.email_verified ?
						<p>Email sudah diverifikasi {moment(data.data.email_verified).fromNow()}</p> :
						<><p>Silahkan cek inbox email untuk verifikasi email</p>
							<button onClick={ResendEmail} className="btn btn-primary">Kirim ulang</button>
						</>}
				</Checklist>

				<Checklist title="Isi Biodata" ok={data.data.asal_sekolah} >
					{data.data.asal_sekolah ?
						<p>Biodata sudah diisi</p> :
						<><p>Silahkan isi biodata anda di halaman biodata</p>
							<Link to="/siswa/biodata" className="btn btn-primary">Cek Biodata</Link>
						</>}
				</Checklist>

				<Checklist title="Verifikasi Pembayaran" ok={data.data.payment_verified && ((Date.now() - new Date(data.data.payment_verified.replace(' ', 'T')))>(1000*60*5))} >
					{data.data.payment_verified && ((Date.now() - new Date(data.data.payment_verified.replace(' ', 'T')))>(1000*60*5)) ?
						<p>Pembayaran sudah diverifikasi {moment(new Date(data.data.payment_verified) + (1000*60*5)).fromNow()}</p> :
						<><p>Silahkan ikuti petunjuk pembayaran di halaman tagihan</p>
						<Link to="/siswa/tagihan" className="btn btn-primary">Cek Tagihan</Link>
						</>}
				</Checklist>

			</div></> : null}
	</Page>
}