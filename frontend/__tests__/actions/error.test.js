import { resetErrorMsg } from '../../src/js/actions/error';

describe('error action', () => {
  it('RESET_ERROR_MESSAGE', () => {
    expect(resetErrorMsg()).toEqual({ type: 'RESET_ERROR_MESSAGE' });
  });
});
