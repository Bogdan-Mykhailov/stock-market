import { FC } from "react";
import './SharesList.scss'
import {useAppSelector} from "../../services/hooks";
import {SharesItem} from "../SharesItem";

export const SharesList: FC = () => {
  const shares = useAppSelector(state => state.shares.shares)

  return (
    <div className='wrapper'>
      {shares.map((share) => <SharesItem key={share.name} share={share}/>)}
    </div>
  );
};
