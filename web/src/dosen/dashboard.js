import React from 'react';
import { Page } from '../widget/page';
import { login } from '../main/Helper';
import { ButtonGroup, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function () {
	return (
		<Page className="paper center">
			<h1>Selamat Datang, {login().nama}</h1>
			<ButtonGroup>
				<Button color="primary" component={Link} to="/dosen/kelas">Kelas</Button>
				<Button color="primary" component={Link} to="/dosen/profile">Profil</Button>
			</ButtonGroup>
		</Page>
	)
}