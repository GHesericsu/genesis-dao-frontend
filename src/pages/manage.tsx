import { useEffect } from 'react';

import { Meta } from '@/components/Meta';
import useGenesisStore from '@/stores/genesisStore';
import MainLayout from '@/templates/MainLayout';

import DaosTableRow from '../components/DaosTableRow';

// dao owners can click destroy to destroy dao
// maybe add an extra confirmation before destroy action
// Once txn signed and destroyed dao, finalized, should re-fetch daos to get the latest daos info

const ManageDao = () => {
  const currentWalletAccount = useGenesisStore((s) => s.currentWalletAccount);
  const daos = useGenesisStore((s) => s.daos);
  const fetchDaos = useGenesisStore((s) => s.fetchDaos);
  const daosOwnedByWallet = useGenesisStore((s) => s.daosOwnedByWallet);

  useEffect(() => {
    if (!daos && currentWalletAccount?.address) {
      fetchDaos();
    }
  });

  const noWallet = () => {
    return (
      <MainLayout
        meta={
          <Meta
            title='Manage Your DAO - GenesisDAO'
            description='Manage Your DAO - GenesisDAO'
          />
        }>
        <div className='flex justify-center py-3 pt-5'>
          <div>Connect Wallet First</div>
        </div>
      </MainLayout>
    );
  };

  if (!currentWalletAccount) {
    return noWallet();
  }
  return (
    <MainLayout
      meta={
        <Meta
          title='Manage Your DAO - GenesisDAO'
          description='Manage Your DAO - GenesisDAO'
        />
      }>
      <div className='py-3 pt-5'>
        <h1 className='mb-3 text-center text-3xl'>{`Here are the DAOS managed by you:`}</h1>
        <div className='overflow-x-auto p-5'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {daosOwnedByWallet &&
                daosOwnedByWallet.length > 0 &&
                daosOwnedByWallet.map((dao) => {
                  return (
                    <DaosTableRow
                      key={dao.daoId}
                      daoId={dao.daoId}
                      daoName={dao.daoName}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageDao;
