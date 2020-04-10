import React from 'react';
import Dashboard from './dashboard';
import Profile from './profile';
import Masuk from './masuk';
import {
	Redirect,
	Switch,
	Route
} from 'react-router-dom';

import session from '../Session';
export default function () {
	return !session.login || session.login.role !== 'mahasiswa' ? <Redirect to="/login" /> : (
		<div className="container mt-4">
			<div class="card shadow p-4">
				<Switch>
					<Route exact path="/mahasiswa">
						<Dashboard />
					</Route>
					<Route exact path="/mahasiswa/profil">
						<Profile />
					</Route>
					<Route exact path="/mahasiswa/masuk">
						<Masuk />
					</Route>
					<Route>
						<>
							<div className="h2 my-5 text-center">Error :(</div>
							<p className="text-center">Mohon maaf halaman ini tidak tersedia.</p>
						</>
					</Route>
				</Switch>
			</div>
		</div>
	)
}