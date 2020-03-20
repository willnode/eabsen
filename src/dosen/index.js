import React from 'react';
import Dashboard from './dashboard';
import {
	Redirect,
	Switch,
	Route
} from 'react-router-dom';

import session from '../Session';
export default function () {
	return !session.login || session.login.role !== 'dosen' ? <Redirect to="/login" /> : (
		<Switch>
			<Route exact path="/dosen">
				<Dashboard />
			</Route>
			<Route>
				404 WIP masih kosong
			</Route>
		</Switch>
	)
}