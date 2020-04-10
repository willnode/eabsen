import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
	return (
		<>
			<li className="nav-item">
				<Link className="nav-link" to="/dosen/">
					Beranda
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/dosen/kelas/">
					Kelas
				</Link>
			</li>
		</>
	)
}