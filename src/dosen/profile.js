import React, { useState } from 'react';
import Page from '../widget/page';
import { controlInput, controlImage, controlSubmit, controlOption } from '../widget/controls';
import session from '../Session';

function submit(e) {
	const data = session.extract(e);
	(session.postByRole('profile/', data)
		.then(async () => {
			session.auth = 'Basic '+btoa((data.get('email') || session.login.email)+':'
				+(data.get('password') || (atob(session.auth.substr(6)).split(':',2)[1])));
			try {
				const {login} = await session.get('login');
				session.login = login;
				session.history.push('/'+login.role);
				window.localStorage.setItem('appauth', session.auth);
				window.localStorage.setItem('applogin', JSON.stringify(login));
				session.setMessage('Berhasil disimpan');
			} catch {
				session.auth = null;
			}
		})
		.catch((e) => session.setError(e))
	)
}

export default function () {
	const [data, setData] = useState(null);
	const form = data && data.data;
	return (
		<Page src="profile" dataCallback={setData} >
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="h3 mb-0 text-gray-800">Edit Profil</h1>
			</div>
			{
				data ? (<form onSubmit={submit}>
					{controlInput({name: 'username', label: 'Username', value: form.username, required: true, minLength: 3})}
					{controlInput({name: 'nama', label: 'Nama', value: form.nama, required: true, minLength: 3})}
					{controlInput({name: 'nip', label: 'NIP', value: form.nip, required: true})}
					{controlImage({name: 'avatar', label: 'Avatar', value: form.avatar, folder: 'avatar'})}
					{controlOption({name: 'jenis_kelamin', label: 'Jenis Kelamin', value: form.jenis_kelamin, required: true, options: [
						{key: 'L', value: 'Laki-Laki'},
						{key: 'P', value: 'Perempuan'},
					], option_key: 'key', option_value: 'value'})}
				<hr/>
					{controlInput({name: 'password', label: 'Password', type:'password', minLength: 8, autoComplete: 'new-password'})}
					{controlInput({name: 'passconf', label: 'Password (Ulang)', type:'password', autoComplete: 'new-password'})}

					{controlSubmit()}
				</form>) : <></>
			}
		</Page>)
}