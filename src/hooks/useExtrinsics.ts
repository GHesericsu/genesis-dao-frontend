import type { ISubmittableResult } from '@polkadot/types/types';

import type {
  CreateDaoData,
  DaoInfo,
  IncomingDaoInfo,
  WalletAccount,
} from '../stores/genesisStore';
import useGenesisStore, { TxnResponse } from '../stores/genesisStore';

// fixme open one connection and reuse that connection
const useExtrinsics = () => {
  const addTxnNotification = useGenesisStore((s) => s.addTxnNotification);
  const updateTxnProcessing = useGenesisStore((s) => s.updateTxnProcessing);
  const apiConnection = useGenesisStore((s) => s.apiConnection);

  // fixme currently only handles cancelled error
  const handleTxnError = (err: Error) => {
    const newNoti = {
      title: TxnResponse.Error,
      message: err.message,
      type: TxnResponse.Error,
      timestamp: Date.now(),
    };

    updateTxnProcessing(false);
    addTxnNotification(newNoti);
  };

  // fixme need to be able to separate txn types to send different response msgs
  const txResponseCallback = (
    result: ISubmittableResult,
    successMsg: string,
    errorMsg: string
  ) => {
    if (result.status.isInBlock) {
      console.log(
        'Included at block hash',
        result.status.asInBlock.toHex(),
        '\nwait for 10-20 seconds to finalize'
      );
      result.events.forEach(({ event: { data, method, section }, phase }) => {
        if (method === 'ExtrinsicSuccess') {
          updateTxnProcessing(false);
          const successNoti = {
            title: `${TxnResponse.Success}`,
            message: successMsg,
            type: TxnResponse.Success,
            txnHash: result.status.asInBlock.toHex(),
            timestamp: Date.now(),
          };
          // add txn to our store - first index
          addTxnNotification(successNoti);
        }
        if (method === 'ExtrinsicFailed') {
          updateTxnProcessing(false);
          const errorNoti = {
            title: `${TxnResponse.Error}`,
            message: errorMsg,
            type: TxnResponse.Error,
            txnHash: result.status.asInBlock.toHex(),
            timestamp: Date.now(),
          };
          addTxnNotification(errorNoti);
        }
      });
    } else if (result.status.isFinalized) {
      console.log('Finalized block hash', result.status.asFinalized.toHex());
    }
  };

  // fixme I need to be able to see what error I get like duplicated daoId error
  const createDao = (
    walletAccount: WalletAccount,
    { daoId, daoName }: CreateDaoData
  ) => {
    if (walletAccount.signer) {
      apiConnection
        .then(async (api) => {
          api?.tx?.daoCore
            ?.createDao?.(daoId, daoName)
            .signAndSend?.(
              walletAccount.address,
              { signer: walletAccount.signer },
              (result) => {
                txResponseCallback(
                  result,
                  'Congrats! Your DAO is created.',
                  'Something went wrong. Please try again.'
                );
              }
            )
            .catch((err) => {
              updateTxnProcessing(false);
              const errMessage = new Error(err);
              handleTxnError(errMessage);
              // fixme
              console.log('create dao', errMessage);
            });
        })
        .catch((err) => {
          updateTxnProcessing(false);
          handleTxnError(new Error(err));
        });
    } else {
      // fixme
      console.log('wallet does not have a signer');
    }
  };

  const getDaos = () => {
    const daos: DaoInfo[] = [];
    apiConnection
      .then((api) => {
        api?.query?.daoCore?.daos
          ?.entries()
          .then((daoEntries) => {
            daoEntries.forEach(([_k, v]) => {
              const dao = v.toHuman() as unknown as IncomingDaoInfo;
              const newObj = {
                daoId: dao.id,
                daoName: dao.name,
                owner: dao.owner,
                assetId: dao.assetId,
              };
              daos.push(newObj);
            });
          })
          .catch((err) => {
            updateTxnProcessing(false);
            handleTxnError(new Error(err));
          });
      })
      .catch((err) => {
        updateTxnProcessing(false);
        handleTxnError(new Error(err));
      });
    return daos;
  };

  const destroyDao = (walletAccount: WalletAccount, daoId: string) => {
    if (walletAccount.signer) {
      apiConnection
        .then((api) => {
          api?.tx?.daoCore
            ?.destroyDao?.(daoId)
            .signAndSend(
              walletAccount.address,
              { signer: walletAccount.signer },
              (result) => {
                txResponseCallback(
                  result,
                  'DAO Destroyed. Bye Bye.',
                  'Something went wrong. Please try again.'
                );
              }
            )
            .catch((err) => {
              updateTxnProcessing(false);
              handleTxnError(new Error(err));
            });
        })
        .catch((err) => {
          updateTxnProcessing(false);
          handleTxnError(new Error(err));
        });
    } else {
      console.log('wallet does not have a signer');
    }
  };

  const issueTokens = (
    walletAccount: WalletAccount,
    daoId: string,
    supply: number
  ) => {
    if (walletAccount.signer) {
      apiConnection
        .then((api) => {
          api?.tx?.daoCore
            ?.issueToken?.(daoId, supply)
            .signAndSend(
              walletAccount.address,
              { signer: walletAccount.signer },
              (result) => {
                txResponseCallback(
                  result,
                  'Tokens Issued',
                  'Something went wrong. Please try again. '
                );
              }
            )
            .catch((err) => {
              updateTxnProcessing(false);
              handleTxnError(new Error(err));
            });
        })
        .catch((err) => {
          updateTxnProcessing(false);
          handleTxnError(new Error(err));
        });
    } else {
      console.log('wallet does not have a signer');
    }
  };

  return { createDao, destroyDao, issueTokens, getDaos, handleTxnError };
};

export default useExtrinsics;
