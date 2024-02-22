import {FC, useMemo} from "react";
import './SharesList.scss'
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {SharesItem} from "../SharesItem";
import {CharType} from "../../types/types.ts";
import {deleteShare, restoreDeletedShares} from "../../services/features";
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../services";
import {MainChart} from "../Chart";

const selectShares = (state: RootState) => state.shares.shares;
const selectActiveShares = createSelector(
  [selectShares],
  (shares) => shares.filter(share => share.active)
);

export const SharesList: FC = () => {
  const activeShares = useAppSelector(selectActiveShares);
  const allShares = useAppSelector(selectShares);
  const dispatch = useAppDispatch();

  const handleDeleteTicker = (ticker: string) => {
    dispatch(deleteShare(ticker));
  };

  const handleRestoreAll = () => {
    dispatch(restoreDeletedShares());
  };

  const isButtonHidden = useMemo(() => allShares.length !== activeShares.length, [allShares, activeShares]);

  return (
    <div className='wrapper'>
      <h2 className='wrapper__title'>Real-Time Stock Price Monitor</h2>
      <div className='wrapper__items-container'>
        {activeShares.map((share) => (
          <SharesItem
            onDeleteTicker={handleDeleteTicker}
            key={share.name}
            share={share}
          />
        ))}
      </div>
      <div style={{width: '100%', height: '250px'}}>
        <h2 className='wrapper__chart-title'>Price Tracker</h2>
        <MainChart data={activeShares} type={CharType.MAIN}/>
      </div>

      {isButtonHidden && (
        <button
          className='wrapper__button'
          onClick={handleRestoreAll}
        >
          Restore all
        </button>)}
    </div>
  );
};
