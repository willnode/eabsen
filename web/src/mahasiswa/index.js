import React from 'react';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Masuk from './masuk';
import Profile from '../widget/shared/profile';
import Page404 from '../static/404';
import { CheckRole } from '../widget/controls';
import { SEO } from '../widget/page';
import { LoginMenu, HeaderComponent } from '../widget/header';
import { DrawerComponent, DrawerListItem } from '../widget/drawer';
import { FooterComponent } from '../widget/footer';

function Main() {
  return (
    <CheckRole role='mahasiswa'>
      <SEO title="Panel Mahasiswa" />
      <Switch>
        <Route exact path="/mahasiswa/" component={Dashboard} />
        <Route path="/mahasiswa/profile/" component={Profile} />
        <Route path="/mahasiswa/masuk/" component={Masuk} />
        <Route component={Page404} />
      </Switch>
    </CheckRole>
  )
}

function LeftBar() {
  return (
    <DrawerComponent>
      <List>
        <DrawerListItem to="/mahasiswa/" icon={DashboardIcon} label="Dashboard" />
        <DrawerListItem to="/mahasiswa/masuk/" icon={DashboardIcon} label="Masuk" />
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
  role: 'mahasiswa',
  main: Main,
  top: TopBar,
  left: LeftBar,
  bottom: BottomBar
}