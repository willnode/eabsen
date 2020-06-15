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

function submit(_, data) {
  doLogin(
    (data.get('nip') || data.get('nim')),
    (data.get('password')),
    (data.get('rememberme'))).then(() => [setMessage('Welcome!')]);
}

export default function () {
  const [role, setRole] = React.useState('mahasiswa');
  const validators = {
    nama: useValidator(required(), minLength(3), matchesRegex(/^[\w -'"]+$/)),
    identity: useValidator(required()),
    password: useValidator(required(), minLength(8)),
    passconf: useValidator(required(), matchesField('password')),
  }
  return (
    <Page className="paper orange center" maxWidth="xs" >
      <SEO title="Daftar Akun" />
      <img src="/assets/logo.png" alt=""/>
      <Typography component="h1" variant="h5">
        Daftar
      </Typography>
      <Form action="register" redirect={submit}>
        <Select name="role" value={role} onChange={x => setRole(x.target.value)}
          options={{ mahasiswa: 'Mahasiswa', dosen: 'Dosen' }} />
        <Input validator={validators.nama} name="nama" label="Nama" 
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <p><img src="/assets/USERNAME.png" alt=""/></p>
            </InputAdornment>
          ),
        }}/>
        {role === 'dosen' && <Input validator={validators.identity} name="nip" label="NIP" />}
        {role === 'mahasiswa' && <Input validator={validators.identity} name="nim" label="NIM" />}
        <Input validator={validators.password} name="password" label="Password" type="password" autoComplete="new-password" 
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <p><img src="/assets/PASSWORD.png" alt=""/></p>
            </InputAdornment>
          ),
        }}/>
        <Input validator={validators.passconf} name="passconf" label="Masukkan Ulang Password" type="password" autoComplete="new-password" />
        <Checkbox name="rememberme" label="Ingat saya" />
        <Submit disabled={!checkAllValidators(validators)} />
      </Form>
    </Page>)
}