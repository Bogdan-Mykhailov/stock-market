import { FC } from "react";
import './SharesList.scss'
import {useAppSelector} from "../../services/hooks";
import {SharesItem} from "../SharesItem";
import {Chart} from "../Chart/Chart.tsx";
import {CharType} from "../../types/types.ts";

export const SharesList: FC = () => {
  const shares = useAppSelector(state => state.shares.shares)

  return (
    <div className='wrapper'>
      <h2 className='wrapper__title'>Real-Time Stock Price Monitor</h2>
      {shares.map((share) => <SharesItem key={share.name} share={share}/>)}
      <h2 className='wrapper__title'>Price Tracker</h2>

      <div style={{width: '100%', height: '250px'}}>
        <Chart data={shares} type={CharType.MAIN}/>
      </div>
    </div>
  );
};
