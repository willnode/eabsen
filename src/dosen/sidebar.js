import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
	return (
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link to="/admin/rekening/" className="nav-link">
					<i className="material-icons">money</i> Saldo
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/admin/siswa/" className="nav-link">
					<i className="material-icons">people</i> Santri
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/admin/toko/" className="nav-link">
					<i className="material-icons">shopping_cart</i> Barang
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/admin/rekening/riwayat" className="nav-link">
				<i className="material-icons">swap_vertical_circle</i> Transaksi
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/logout" className="nav-link">
				<i className="material-icons">vpn_key</i> Logout
				</Link>
			</li>
		</ul>
	)
}