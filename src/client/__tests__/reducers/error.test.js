import error from '../../js/reducers/error';
import { resetErrorMsg } from '../../js/actions/error';
import { loginUserSuccess, loginUserFailure } from '../../js/actions/auth';

describe('error reducer', () => {
  it('should reset error message', () => {
    const state = 'fatal error';
    expect(error(state, resetErrorMsg())).toEqual(null);
  });

  it('should set error message', () => {
    const initState = null;
    const errMsg = 'failure_test';
    const action = loginUserFailure({ error: errMsg });
    expect(error(initState, action)).toEqual(errMsg);
  });

  it('should not modify state for undefined payload', () => {
    const initState = 'failure test';

    expect(error(initState, loginUserSuccess())).toEqual(initState);
  });
});
