import error from '../../js/reducers/error';
import resetErrorMsg from '../../js/actions/error';

describe('error reducer', () => {
  it('should reset error message', () => {
    const state = 'fatal error';
    expect(error(state, resetErrorMsg())).toEqual(null);
  });

  it('should set error message', () => {
    const initState = null;

    const action = {
      type: 'TEST_FAILURE',
      payload: 'failure_test',
    };

    expect(error(initState, action)).toEqual(action.payload);
  });
});
