/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import TransferAssetModal from '@/components/TransferAssetModal';

// eslint-disable-next-line
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const assetHolding = {
  balance: 10,
} as any;

describe('TransferAssetModal', () => {
  test('renders TransferAssetModal', () => {
    const { getByText } = render(
      <TransferAssetModal
        assetHolding={assetHolding}
        daoId='101'
        open
        onClose={() => {}}
      />
    );
    expect(getByText(/Transfer Tokens/)).toBeInTheDocument();
  });
});
