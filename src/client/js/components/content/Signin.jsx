import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from '../../client_config.json';
import makeUserDataByApiType from '../../helpers/makeUserDataByApiType';
import LoaderLayout from '../../containers/informers/Loader';
import errors from '../../errors';

export default class Signin extends React.Component {
  handleRequestToForeignApi = () => {
    const { foreignAuthUserRequest } = this.props;

    foreignAuthUserRequest();
  }

  successGoogleResp = (resp) => {
    console.log(resp);
    this.signInBy('google', resp);
  }

  failedGoogleResp = (resp) => {
    const { signinUserFailure } = this.props;
    signinUserFailure({ error: errors[resp.error] });
    // DELETE IN FUTURE!!!
    console.log(resp, 'failed resp');
  }

  successFbResp = (resp) => {
    console.log(resp, 'resp from Fb');
    this.signInBy('facebook', resp);
  }

  signInBy = (type, resp) => {
    const { history, signinUser } = this.props;

    const userData = makeUserDataByApiType(type)(resp);
    signinUser(userData, history);
  }

  render() {
    return (
      <div className="auth-form">
        <div className="auth-form__content">
          <LoaderLayout />
          <h2>Вход</h2>
          <p className="auth-form__auth-tip">Войти через соцсети:</p>
          <div className="auth-form__list-social-btn">
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Google"
              className="auth-form__btn-signin auth-form_btn-google"
              onRequest={this.handleRequestToForeignApi}
              onSuccess={this.successGoogleResp}
              onFailure={this.failedGoogleResp}
            />
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              fields="name,email,picture"
              textButton="Facebook"
              cssClass="auth-form__btn-signin auth-form_btn-google"
              callback={this.successFbResp}
              onClick={this.handleRequestToForeignApi}
            />
          </div>
        </div>
      </div>
    );
  }
}
