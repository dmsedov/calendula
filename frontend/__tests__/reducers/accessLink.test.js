import {
  fetchLinkRequest,
  fetchLinkSuccess,
  fetchLinkFailure,
} from '../../js/actions/accessLink';
import { accessLinkFetching, accessLink } from '../../js/reducers/accessLink';

describe('Fetching accessLink reducers', () => {
  const initLinkState = '';

  it('should return the initial state', () => {
    expect(accessLink(undefined, {})).toEqual(initLinkState);
    expect(accessLinkFetching(undefined, {})).toEqual('none');
  });

  it('FETCH_LINK_REQUEST', () => {
    expect(accessLinkFetching('none', fetchLinkRequest())).toEqual('requested');

    expect(accessLink(initLinkState, fetchLinkRequest()))
      .toEqual(initLinkState);
  });

  it('FETCH_LINK_SUCCESS', () => {
    expect(accessLinkFetching('requested', fetchLinkSuccess())).toEqual('successed');
    const link = 'test_link';
    expect(accessLink(initLinkState, fetchLinkSuccess({ link })))
      .toEqual(link);
  });

  it('FETCH_LINK_FAILURE', () => {
    expect(accessLinkFetching('requested', fetchLinkFailure())).toEqual('failured');
  });

  it('FETCH_LINK_FAILURE after attempt to generate new link', () => {
    const prevLink = 'some_prev_link';
    expect(accessLink(prevLink, fetchLinkRequest())).toEqual(prevLink);
    expect(accessLink(prevLink, fetchLinkFailure())).toEqual(prevLink);
  });
});
