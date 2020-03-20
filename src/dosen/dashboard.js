import React from 'react';
import session from '../Session';

export default function () {
	return (
		<div className="text-center">
			<p><img style={{ height: '256px' }} src={session.login.avatar ? session.baseUrl(`avatar/${session.login.avatar}`) : '/assets/user.png'} alt=""/></p>
	<h1>Selamat Datang, {session.login.name}</h1>
			<p className="text-muted">{session.login.hp}</p>
		</div>
	)
}