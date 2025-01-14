import { BN } from '@polkadot/util';
import { act, render, screen } from '@testing-library/react';

import type { DaoDetail } from '@/types/dao';

import CreateProposal from '../src/components/CreateProposal';

// eslint-disable-next-line
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({}),
  } as any);
});

const daoDetail: DaoDetail = {
  daoId: 'MANGO',
  daoName: 'MANGO',
  daoOwnerAddress: '{N/A}',
  daoCreatorAddress: '{N/A}',
  adminAddresses: [],
  setupComplete: false,
  proposalDuration: null,
  proposalTokenDeposit: new BN(0),
  minimumMajority: null,
  daoAssetId: null,
  metadataUrl: null,
  metadataHash: null,
  descriptionShort: null,
  descriptionLong: null,
  email: null,
  numberOfOpenProposals: null,
  numberOfTokenHolders: null,
  mostRecentProposals: null,
  images: {
    contentType: null,
    small: null,
    medium: null,
    large: null,
  },
};

describe('CreateProposal', () => {
  test('renders CreateProposal', async () => {
    // eslint-disable-next-line
    await act(async () => render(<CreateProposal dao={daoDetail} handleChangePage={() => {}} />));

    const el = screen.getAllByText(/MANGO/);
    expect(el[0]).toBeInTheDocument();
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
