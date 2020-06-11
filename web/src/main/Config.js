
const appKey = 'eabsen';
const appTitle = 'E-Absen AKSI';
const isProduction = process.env.NODE_ENV === 'production';
const publicUrl = isProduction ? '/eabsen' : '/';
const serverUrl = isProduction ? 'https://api.wellosoft.net/eabsen' : 'http://localhost:4000';
const uploadsUrl = serverUrl + '/uploads';
const imageAvatarUrl = publicUrl + '/assets/user.png';
const imageBrandUrl = publicUrl + '/assets/logo.png';
const imageNavbarUrl = publicUrl + '/assets/logo-navbar.png';

export {
  appKey,
  appTitle,
  isProduction,
  publicUrl,
  serverUrl,
  uploadsUrl,
  imageAvatarUrl,
  imageBrandUrl,
  imageNavbarUrl,
}
