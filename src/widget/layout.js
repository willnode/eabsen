import React from 'react';
import Header from './header';
import Footer from './footer';
import session from '../Session';

import DosenSidebar from '../dosen/sidebar';
import MahasiswaSidebar from '../mahasiswa/sidebar';
import {
	Switch,
	Route,
  } from "react-router-dom";

function Notification() {

	const message = session.message;
	const error = session.error;
	session.message = '';
	session.error = '';

	return <>
			{
				message ?
				<div className="alert alert-primary">
				{''+message}
			</div> : ''
			}
			{
				error ?
				<div className="alert alert-danger">
					{''+error}
				</div> : ''
			}
		</>
}

export default function Layout({ children }) {

	return (
		<div id="wrapper">
			<Switch>
				<Route path="/dosen">
					<DosenSidebar />
				</Route>
				<Route path="/mahasiswa">
					<MahasiswaSidebar />
				</Route>
			</Switch>
			<div id="content-wrapper" className="d-flex flex-column">
				<div id="content">
					<Header/>
					<Notification/>
					{children}
					<Footer/>
				</div>
			</div>
		</div>
	)
}