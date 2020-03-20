import React from 'react';
import { Link } from 'react-router-dom';
import { ToggleSidebarCollapse } from '../widget/header';

export default function () {
	return (
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

		<li>
		  <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/mahasiswa">
			<div className="sidebar-brand-icon rotate-n-15">
			  <i className="fas fa-laugh-wink"></i>
			</div>
			<div className="sidebar-brand-text mx-3">E-Absen</div>
		  </Link>
		</li>

		  <hr className="sidebar-divider my-0"/>

		  <li className="nav-item">
			<Link className="nav-link" to="/mahasiswa/">
			  <i className="fas fa-fw fa-tachometer-alt"></i>
			  <span>Beranda</span></Link>
		  </li>

		  <hr className="sidebar-divider"/>

		  <li className="nav-item">
			<Link className="nav-link" to="/mahasiswa/profil/">
			  <i className="fas fa-fw fa-tachometer-alt"></i>
			  <span>Profil</span></Link>
		  </li>

		  <li className="nav-item">
			<Link className="nav-link" to="/mahasiswa/masuk/">
			  <i className="fas fa-fw fa-tachometer-alt"></i>
			  <span>Masuk Kelas</span></Link>
		  </li>

		  <hr className="sidebar-divider d-none d-md-block"/>

		  <div className="text-center d-none d-md-inline">
			<button className="rounded-circle border-0" id="sidebarToggle" onClick={ToggleSidebarCollapse}></button>
		  </div>

		</ul>
	)
}