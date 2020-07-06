import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { history, extractForm, doLogin, setError } from '../main/Helper';
import { Page, SEO } from '../widget/page';
import { Input, Form, Submit, Checkbox } from '../widget/controls';
import { publicUrl } from '../main/Config';


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
    <Page className="paper kuning center" maxWidth="xs">
      <SEO title="Masuk" />
      <img src={publicUrl+"/assets/logo.png"} alt=""/>
      <Typography component="h1" variant="h5">
        Masuk
      </Typography>
      <Form onSubmit={form_login}>
      <Input variant="filled" name="username" required label="NIP / NIM"
      InputProps={{
        startAdornment:(
          <InputAdornment position="start">
            <p><img src={publicUrl+"/assets/USERNAME.png"} width="16px" alt=""/></p>
          </InputAdornment>
        ),
      }}/>
        <Input variant="filled" name="password" required label="Kata Sandi" autoComplete="current-password" type="password"
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <p><img src={publicUrl+"/assets/PASSWORD.png"} width="16px" alt=""/></p>
            </InputAdornment>
          ),
        }}/>
        <Checkbox name="rememberme" label="Ingat Saya" />
        <Submit label="Masuk" />
      </Form>
    </Page>
  );
}