import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import session from '../Session';

function submit(e) {
	const data = session.extract(e);
	(session.post('register/', data)
		.then(async () => {
			session.auth = 'Basic ' + btoa(data.get('email') + ':' + data.get('password'));
			try {
				const { login } = await session.get('login');
				session.login = login;
				session.history.push('/' + login.role);
				window.sessionStorage.setItem('appauth', session.auth);
				window.sessionStorage.setItem('applogin', JSON.stringify(login));
				window.localStorage.removeItem('appreferral');
				session.setMessage('Selamat datang. Jangan lupa cek inbox emailmu untuk verifikasi, lalu mengisi biodata dan melakukan pembayaran.');
			} catch {
				session.auth = null;
			}
		})
		.catch((e) => {
			if ((e+'').includes('Duplicate')) {
				if (e.includes('email')) {
					session.setError(`Email ${data.get('email')} sudah terdaftar. Mungkin anda sudah punya akun?`);
				} else if (e.includes('hp')) {
					session.setError(`Nomor HP ${data.get('hp')} sudah terdaftar. Mungkin anda sudah punya akun?`);
				}
			} else {
				session.setError(e);
			}
		})
	)
}

export default function Register() {
	let [role, setRole] = useState('mahasiswa');
	let [loading, setLoading] = useState(false);
	return (<div className="container-fluid bg-warning">
		<div className="row justify-content-center">
			<div className="col-lg-7">
				<div className="card o-hidden border-0 shadow-lg my-5">
					<div className="card-body p-0">
						<div className="p-5">
							<div className="text-center">
								<h1 className="h4 text-gray-900 mb-4">Buat Akun</h1>
							</div>
							<form className="user" onSubmit={(e) => {setLoading(true); submit(e);}}>
								<select name="role" required className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
									<option key="mahasiswa" value="mahasiswa">Mahasiswa</option>
									<option key="dosen" value="dosen">Dosen</option>
								</select>
								<div className="form-group row">
									<div className="col-12 mb-sm-0">
										<input type="text" required className="form-control form-control-user" name="nama" placeholder="Nama Lengkap" minLength="3" autoComplete="name" />
									</div>
								</div>
								<div className="form-group row">
									<div className="col-sm-6 mb-3 mb-sm-0">
											<input type="text" required className="form-control form-control-user" name="username" placeholder="Username (untuk Login)" autoComplete="username" />
										</div>
										<div className="col-sm-6">
										{
											role === 'mahasiswa' ?
											<input key="mahasiswa" required className="form-control form-control-user" name="nim" placeholder="NIM" minLength="3" autoComplete="nim" /> :
											<input key="dosen" required className="form-control form-control-user" name="nip" placeholder="NIP" minLength="3" autoComplete="nip" />
										}
										</div>
									</div>



								<div className="form-group row">
									<div className="col-sm-6 mb-3 mb-sm-0">
										<input type="password" className="form-control form-control-user"
											name="password" required placeholder="Password" autoComplete="new-password" minLength="8" />
									</div>
									<div className="col-sm-6">
										<input type="password" className="form-control form-control-user"
											name="passconf" required placeholder="Password (Ulang)" autoComplete="new-password" />
									</div>
								</div>
								<button disabled={loading} className="btn btn-primary btn-user btn-block">
									Register Akun
				                </button>
							</form>
							<div className="my-2 text-center">
								<Link className="small" to="/login">Sudah punya akun?</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>)
}