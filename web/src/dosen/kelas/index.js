import Edit from './edit';
import List from './list';
import React from 'react';
import Print from './print';
import { Route, Switch, useParams, Redirect } from 'react-router-dom';

function RedirDetail() {
	const id = useParams().id;
	return <Redirect to={'/dosen/pertemuan/?pertemuan_kelas=' + id} />
  }

export default ({ match }) => (
	<Switch>
		<Route exact path={match.url+'/'} component={List}/>
		<Route exact path={match.url+'/create'}  component={Edit} />
		<Route exact path={match.url+'/edit/:id'} component={Edit} />
		<Route exact path={match.url+'/detail/:id'} component={RedirDetail} />
		<Route exact path={match.url+'/print/:id'} component={Print} />
	</Switch>
)