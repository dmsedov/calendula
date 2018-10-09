import resetErrMsg from '../../js/actions/error';

describe('error action', () => {
  it('RESET_ERROR_MESSAGE', () => {
    expect(resetErrMsg()).toEqual({ type: 'RESET_ERROR_MESSAGE' });
  });
});
