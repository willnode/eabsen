import React from 'react';
import Dashboard from './dashboard';
import Profile from './profile';
import KelasList from './kelas/list';
import KelasDetail, {PertemuanBaru} from './kelas/detail';
import KelasEdit from './kelas/edit';
import KelasAbsen from './kelas/absen';
import {
	Redirect,
	Switch,
	Route
} from 'react-router-dom';

import session from '../Session';
export default function () {
	return !session.login || session.login.role !== 'dosen' ? <Redirect to="/login" /> : (
		<div className="container-fluid mt-4">
			<Switch>
				<Route exact path="/dosen">
					<Dashboard />
				</Route>
				<Route exact path="/dosen/profil">
					<Profile />
				</Route>
				<Route exact strict path="/dosen/kelas/">
					<KelasList />
				</Route>
				<Route exact strict path="/dosen/kelas/create">
					<KelasEdit id={0} />
				</Route>
				<Route exact strict path="/dosen/kelas/pertemuan_baru/:id">
					<PertemuanBaru />
				</Route>
				<Route exact strict path="/dosen/kelas/absen/:id">
					<KelasAbsen />
				</Route>
				<Route exact strict path="/dosen/kelas/detail/:id">
					<KelasDetail />
				</Route>
				<Route exact strict path="/dosen/kelas/edit/:id">
					<KelasEdit />
				</Route>
				<Route>
					<>
						<div className="h2 my-5 text-center">Error :(</div>
						<p className="text-center">Mohon maaf halaman ini tidak tersedia.</p>
					</>
				</Route>
			</Switch>
		</div>
	)
}