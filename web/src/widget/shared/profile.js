import React, { useMemo } from 'react';
import { Page } from '../../widget/page';
import { Form, Input, Submit, File } from '../../widget/controls';
import Typography from '@material-ui/core/Typography';
import { Context } from '../../main/Contexts';
import { doLogin, login, setMessage, doReload } from '../../main/Helper';
import { appKey } from '../../main/Config';
import {
  useValidator, required, minLength, validEmail,
  matchesValue, matchesField, requireField,
  checkAllValidators, matchesRegex
} from '../../widget/validators';
import Box from '@material-ui/core/Box';

function submit(_, data) {
  doLogin(
    (data.get('email') || login().identity),
    (data.get('password') || (atob(Context.get('auth').substr(6)).split(':', 2)[1])),
    Boolean(localStorage.getItem(appKey + 'appauth'))).then(() => [doReload(), setMessage('Successfully Saved')]);
}

export default function () {
  const role = login().role;
  const curPassword = useMemo(() => (atob(Context.get('auth').substr(6)).split(':', 2)[1]), []);
  const validators = {
    nama: useValidator(required(), minLength(3), matchesRegex(/^[\w -'"]+$/)),
    identity: useValidator(required()),
    prodi: useValidator(required()),
    oldpass: useValidator(matchesValue(curPassword)),
    password: useValidator(requireField('oldpass'), minLength(8)),
    passconf: useValidator(matchesField('password')),
  }
  return (
    <Page className="paper" maxWidth="sm" src={`${role}/profile`}>
      {({ data }) => (
        <Form action={`${role}/profile`} redirect={submit}>
          <Typography variant="h4">Edit Profil</Typography>
          {role === 'dosen' && <Input name="username" label="Username" defaultValue={data.username} />}
          <Input validator={validators.nama} name="nama" label="Nama" defaultValue={data.nama} />
          {role === 'dosen' && <Input validator={validators.identity} name="identity" label="NIP" defaultValue={data.identity}/>}
          {role === 'mahasiswa' && <Input validator={validators.identity} name="identity" label="NIM" defaultValue={data.identity}/>}
          <Input validator={validators.prodi} name="prodi" label="Prodi / Fakultas" defaultValue={data.prodi} />
          <File folder="avatar" name="avatar" label="Avatar" defaultValue={data.avatar} accept="image/*" />
          <Box marginTop={5}>Jika anda butuh mengganti password, ganti disini:</Box>
          <Input validator={validators.oldpass} name="oldpass" label="Password Sekarang" type="password" autoComplete="current-password" />
          <Input validator={validators.password} name="password" label="Password Baru" type="password" autoComplete="new-password" />
          <Input validator={validators.passconf} name="passconf" label="Ulang Password Baru" type="password" autoComplete="new-password" />
          <Submit disabled={!checkAllValidators(validators)} />
        </Form>
      )}
    </Page>
  )
}