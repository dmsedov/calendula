import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from '../client_config.json';
import makeUserDataByApiType from '../helpers/makeUserDataByApiType';

export default class LoginPage extends React.Component {
  successGoogleResp = (resp) => {
    console.log(resp);
    this.signUp('google', resp);
  }

  failedGoogleResp = (resp) => {
    console.log(resp, 'failed resp');
  }

  successFbResp = (resp) => {
    console.log(resp, 'resp from Fb');
    this.signUp('facebook', resp);
  }

  signUp = (type, resp) => {
    const userData = makeUserDataByApiType(type)(resp);
    this.props.loginUser(userData);
  }

  render() {
    return (
      <div className="auth-form">
        <h2>Авторизация</h2>
        <p className="auth-tip">Авторизуйтесь через представленные ниже сервисы:</p>
        <ul className="list-sm">
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Google"
            className="btn google-social"
            onSuccess={this.successGoogleResp}
            Failure={this.failedGoogleResp}
          />
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={this.successFbResp}
            textButton="Facebook"
            cssClass="btn facebook-social"
          />
        </ul>
      </div>
    );
  }
}
