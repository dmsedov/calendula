import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from '../client_config.json';
import makeUserDataByApiType from '../helpers/makeUserDataByApiType';
import renderPreloaderLayout from '../helpers/renderPreloader';
import renderErrorReport from '../helpers/renderErrorReport';


export default class LoginPage extends React.Component {
  handleRequestToForeignApi = () => {
    const { loginUserRequest } = this.props;

    loginUserRequest();
  }

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
    const { history, login } = this.props;

    const userData = makeUserDataByApiType(type)(resp);
    login(userData, history);
  }

  render() {
    const { requestStatus, user: { err } } = this.props;

    return (
      <div className="center-container" style={{ height: '700px' }}>
        {requestStatus === 'requested' ? renderPreloaderLayout('Please wait') : null}
        <div className="auth-form">
          <h2>Вход</h2>
          <p className="auth-tip">Войдите через представленные ниже сервисы:</p>
          <div className="list-sm">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google"
              className="btn google-social"
              onRequest={this.handleRequestToForeignApi}
              onSuccess={this.successGoogleResp}
              Failure={this.failedGoogleResp}
            />
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              fields="name,email,picture"
              textButton="Facebook"
              cssClass="btn facebook-social"
              callback={this.successFbResp}
              onClick={this.handleRequestToForeignApi}
            />
          </div>
          {requestStatus === 'failure' ? renderErrorReport(err) : null}
        </div>
      </div>
    );
  }
}
