import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
	return (
		<>
			<li className="nav-item">
				<Link className="nav-link" to="/mahasiswa/">
					Beranda
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/mahasiswa/masuk">
					Masuk Kelas
				</Link>
			</li>
		</>
	)
}