import React, { Component } from 'react';
import Login from './static/login';
import Register from './static/register';
import Dosen from './dosen';
import Mahasiswa from './mahasiswa';
import Layout from './widget/layout';
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import session from './Session';


class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0.5
    }
  }
  Logout() {
    session.auth = null;
    session.login = null;
    window.localStorage.clear();
    window.sessionStorage.clear();
    return <Redirect to="/login" />
  }
  render() {
    session.history = this.props.history;
    session.counter = this.state.counter;
    session.roll = () => this.forceUpdate();
    session.setCounter = (v) => this.setState({ counter: v });

    return (
      <Layout key={this.state.counter}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <Route exact path="/logout">
            <this.Logout />
          </Route>
          <Route exact path="/login">
            {
              session.login ? <Redirect to={'/' + session.login.role + '/'} /> : <Login />
            }
          </Route>
          <Route exact path="/register">
            {
              session.login ? <Redirect to={'/' + session.login.role + '/'} /> : <Register />
            }
          </Route>
          <Route path="/dosen">
            <Dosen />
          </Route>
          <Route path="/mahasiswa">
            <Mahasiswa />
          </Route>
          <Route>
					<>
						<div className="h2 my-5 text-center">Error :(</div>
						<p className="text-center">Mohon maaf halaman ini tidak tersedia.</p>
					</>
				</Route>
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
