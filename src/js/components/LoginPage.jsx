import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from '../client_config.json';

export default class LoginPage extends React.Component {
  successRespGoogle = (resp) => {
    console.log(resp);
    const { profileObj: { name } } = resp;
    const { history } = this.props;
    this.props.login({ name, history });
  }

  failedRespGoogle = (resp) => {
    console.log(resp, 'failed resp');
  }

  successRespFb = (resp) => {
    console.log(resp, 'resp from Fb');
    const { name } = resp;
    const { history } = this.props;
    this.props.login({ name, history });
  }

  makeUserDataByApiType = (type, resp) =>{
    return {
      google: function(resp) {
        const { profileObj: { googleId, name, imageUrl, email } } = resp;

        userData = {
          id: googleId,
          name,
          email,
          imageUrl,
        };
        return userData;
      },
      facebook: function(resp) {
        const { userId, name, email, picture: { data: { url } } } = resp;

        userData = {
          id: userId,
          name,
          email,
          imageUrl: url,
        };
        return userData;
      },
    }[type];
  }

  signUp = (type, resp) => {
    const { loginUser } = this.props;

    const userData = this.makeUserDataByApiType(type, resp);
    loginUser(userData);
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
            onSuccess={this.successRespGoogle}
            Failure={this.failedRespGoogle}
          />
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={this.successRespFb}
            textButton="Facebook"
            cssClass="btn facebook-social"
          />
        </ul>
      </div>
    );
  }
}
