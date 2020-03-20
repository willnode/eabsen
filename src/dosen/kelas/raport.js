import React from 'react';
import { useParams } from 'react-router-dom';

export default function ({ id }) {
	if (id === null || id === undefined) {
		id = useParams().id;
	}
	return <div>Halo dunia</div>
}