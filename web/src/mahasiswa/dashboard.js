import React from 'react';
import { Page } from '../widget/page';
import { login } from '../main/Helper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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