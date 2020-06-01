import List, {PertemuanBaru} from './list';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function RedirDetail() {
	const id = useParams().id;
	return <Redirect to={'/dosen/pertemuan/?pertemuan_kelas=' + id} />
  }

export default ({ match }) => (
	<Switch>
		<Route exact path={match.url+'/'} component={List}/>
		<Route exact path={match.url+'/create'}  component={PertemuanBaru} />
		<Route exact path={match.url+'/detail/:id'} component={RedirDetail} />
	</Switch>
)