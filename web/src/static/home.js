import React from 'react';
import { Page, SEO } from '../widget/page';
import { publicUrl, appTitle } from '../main/Config';

export default function Home() {
  return (<Page className="paper kuning center" maxWidth="md">
    <SEO
      title={`Welcome to ${appTitle}!`}
      image={publicUrl + '/assets/AKSI.png'}
      description="CRM Toolkit is your starting template for bootstrapping any web application project."
    />
    <h1>Selamat Datang di Aplikasi {appTitle}.</h1>
    <p><img src="assets/AKSI.png" alt="" width="200px" /></p>
  </Page>)
}
