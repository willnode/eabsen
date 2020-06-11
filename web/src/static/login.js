import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { history, extractForm, doLogin, setError } from '../main/Helper';
import { Page, SEO } from '../widget/page';
import { Input, Form, Submit, Checkbox } from '../widget/controls';


function form_login(e) {
  const data = extractForm(e);
  doLogin(
    data.get('username'),
    data.get('password'),
    data.has('rememberme')
  ).catch((e) => setError(e))
}

export default function Login() {

  return (
    <Page className="paper center" maxWidth="xs">
      <SEO title="Masuk" />
      <Avatar className="avatar">
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Masuk
      </Typography>
      <Form onSubmit={form_login}>
      <Input name="username" required label="NIP / NIM" />
        <Input name="password" required label="Kata Sandi" autoComplete="current-password" type="password" />
        <Checkbox name="rememberme" label="Ingat Saya" />
        <Submit label="Masuk" />
      </Form>
    </Page>
  );
}