import React from 'react';
import Dashboard from './dashboard';
import Profile from '../widget/shared/profile';
import Kelas from './kelas';
import Pertemuan from './pertemuan';
import {
	Switch,
	Route
} from 'react-router-dom';
import { CheckRole } from '../widget/controls';
import { HeaderComponent, LoginMenu } from '../widget/header';
import { DrawerComponent, DrawerListItem } from '../widget/drawer';
import List  from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { SEO } from '../widget/page';
import Page404 from '../static/404';
import { FooterComponent } from '../widget/footer';

function Main() {
	return (
		<CheckRole role='dosen'>
			<SEO title="Panel Dosen" />
			<Switch>
				<Route exact path="/dosen/" component={Dashboard} />
				<Route exact path="/dosen/profile/" component={Profile} />
				<Route path="/dosen/kelas/" component={Kelas} />
				<Route path="/dosen/pertemuan/" component={Pertemuan} />
				<Route component={Page404} />
			</Switch>
		</CheckRole>
	)
}

function LeftBar() {
	return (
		<DrawerComponent>
			<List>
				<DrawerListItem to="/dosen/" icon={DashboardIcon} label="Dashboard" />
				<DrawerListItem to="/dosen/kelas/" icon={DashboardIcon} label="Kelas" />
			</List>
		</DrawerComponent>
	)
}

function TopBar() {
	return (
		<HeaderComponent>
			<LoginMenu />
		</HeaderComponent>
	);
}

function BottomBar() {
	return <FooterComponent />
}

export default {
	role: 'dosen',
	main: Main,
	top: TopBar,
	left: LeftBar,
	bottom: BottomBar
}