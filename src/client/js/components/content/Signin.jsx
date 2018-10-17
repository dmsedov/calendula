import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from '../../client_config.json';
import makeUserDataByApiType from '../../helpers/makeUserDataByApiType';
import renderPreloaderLayout from '../../helpers/renderPreloader';
// import renderErrorReport from '../../helpers/renderErrorReport';

export default class Signin extends React.Component {
  handleRequestToForeignApi = () => {
    const { signinUserRequest } = this.props;

    signinUserRequest();
  }

  successGoogleResp = (resp) => {
    console.log(resp);
    this.signUp('google', resp);
  }

  failedGoogleResp = (resp) => {
    const { signinUserFailure } = this.props;
    signinUserFailure({ error: resp.error });
    // DELETE IN FUTURE!!!
    console.log(resp, 'failed resp');
  }

  successFbResp = (resp) => {
    console.log(resp, 'resp from Fb');
    this.signUp('facebook', resp);
  }

  signUp = (type, resp) => {
    const { history, signout } = this.props;

    const userData = makeUserDataByApiType(type)(resp);
    signout(userData, history);
  }

  render() {
    const { requestStatus } = this.props;

    return (
      <div id="auth-form-content">
        <div className="auth-form">
          {requestStatus === 'requested' ? renderPreloaderLayout('Аутентификация') : null}
          <h2>Вход</h2>
          <p className="auth-tip">Войти через соцсети:</p>
          <div className="list-sm">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google"
              className="btn-login google-social"
              onRequest={this.handleRequestToForeignApi}
              onSuccess={this.successGoogleResp}
              onFailure={this.failedGoogleResp}
            />
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              fields="name,email,picture"
              textButton="Facebook"
              cssClass="btn-login facebook-social"
              callback={this.successFbResp}
              onClick={this.handleRequestToForeignApi}
            />
          </div>
        </div>
      </div>
    );
  }
}
