import React from 'react';
import { Page } from '../widget/page';

export default function () {
	return (
		<Page className="paper center">
			<h1>Selamat Datang, {login().nama}</h1>
			<ButtonGroup>
				<Button color="primary" component={Link} to="/mahasiswa/masuk">Masuk Kelas</Button>
				<Button color="primary" component={Link} to="/mahasiswa/profile">Profil</Button>
			</ButtonGroup>
		</Page>
	)
}