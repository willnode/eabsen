import List, { PertemuanBaru } from './list';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Barcode from './barcode';
import Detail from './detail';


export default ({ match }) => (
	<Switch>
		<Route exact path={match.url + '/'} component={List} />
		<Route exact path={match.url + '/create/:id'} component={PertemuanBaru} />
		<Route exact path={match.url + '/detail/:id'} component={Detail} />
		<Route exact path={match.url + '/barcode/:id'} component={Barcode} />
	</Switch>
)