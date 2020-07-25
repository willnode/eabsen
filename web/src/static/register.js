import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Page, SEO } from '../widget/page';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Input, Submit, Checkbox, Select } from '../widget/controls';
import Typography from '@material-ui/core/Typography';
import { doLogin, setMessage, history } from '../main/Helper';
import {
  useValidator, required, minLength, valididentity,
  checkAllValidators, matchesRegex, matchesField
} from '../widget/validators';
import { publicUrl } from '../main/Config';

function submit(_, data) {
  doLogin(
    (data.get('identity')),
    (data.get('password')),
    (data.get('rememberme'))).then(() => [setMessage('Selamat datang di E-Absen AKSI!')]);
}

export default function () {
  const [role, setRole] = React.useState('mahasiswa');
  const validators = {
    nama: useValidator(required(), minLength(3), matchesRegex(/^[\w -'"]+$/)),
    identity: useValidator(required()),
    prodi: useValidator(required()),
    password: useValidator(required(), minLength(8)),
    passconf: useValidator(required(), matchesField('password')),
  }
  return (
    <Page className="paper orange center" maxWidth="xs" >
      <SEO title="Daftar Akun" />
      <img src={publicUrl+"/assets/logo.png"} alt=""/>
      <Typography component="h1" variant="h5">
        Daftar
      </Typography>
      <Form action="register" redirect={submit}>
        <Select name="role" value={role} onChange={x => setRole(x.target.value)}
          options={{ mahasiswa: 'Mahasiswa', dosen: 'Dosen' }} />
        <Input variant="filled" validator={validators.nama} name="nama" label="Nama"
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <p><img src={publicUrl+"/assets/USERNAME.png"} width="16px"  alt=""/></p>
            </InputAdornment>
          ),
        }}/>
        {role === 'dosen' && <Input variant="filled" validator={validators.identity} name="identity" label="NIP" />}
        {role === 'mahasiswa' && <Input variant="filled" validator={validators.identity} name="identity" label="NIM" />}
        <Input variant="filled" validator={validators.prodi} name="prodi" label="Prodi / Fakultas" />
        <Input variant="filled" validator={validators.password} name="password" label="Password" type="password" autoComplete="new-password"
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <p><img src={publicUrl+"/assets/PASSWORD.png"} width="16px" alt=""/></p>
            </InputAdornment>
          ),
        }}/>
        <Input variant="filled" validator={validators.passconf} name="passconf" label="Masukkan Ulang Password" type="password" autoComplete="new-password" />
        <Checkbox name="rememberme" label="Ingat saya" />
        <Submit disabled={!checkAllValidators(validators)} />
      </Form>
    </Page>)
}