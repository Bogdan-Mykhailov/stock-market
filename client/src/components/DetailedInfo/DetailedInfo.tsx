import {FC} from "react";
import {Share} from "../../types/Share.ts";
import './DetailedInfo.scss';
import {useOutsideClick} from "../../hooks/useOutsideClick.ts";

interface Props {
  share: Share;
  // isShow: boolean
  onClose: () => void
}

export const DetailedInfo: FC<Props> = ({share, onClose}) => {
  const {
    ref
  } = useOutsideClick(false)
  const {
    dividend,
    name,
    change_percent,
    change,
    last_trade_time,
    price,
    ticker,
    exchange,
  } = share;

  return (
    <ul
      className='detailedListActive'
      ref={ref}
    >
      <li className='detailedList__listItem'>
        Company name:
        <span className='detailedList__text'>{name}</span>
      </li>
      <button onClick={onClose}>X</button>
      <hr/>
      <li className='detailedList__listItem'>
        Share name:
        <span className='detailedList__text'>{ticker}</span>
      </li>
      <li className='detailedList__listItem'>
        Share price:
        <span className='detailedList__text'>{price} $</span>
      </li>
      <li className='detailedList__listItem'>
        Exchange:
        <span className='detailedList__text'>{exchange}</span>
      </li>
      <li className='detailedList__listItem'>
        Change:
        <span className='detailedList__text'>{change} $</span>
      </li>
      <li className='detailedList__listItem'>
        Change percent:
        <span className='detailedList__text'>{change_percent}%</span>
      </li>
      <li className='detailedList__listItem'>
        Dividend:
        <span className='detailedList__text'>{dividend} $</span>
      </li>
      <li className='detailedList__listItem'>
        Yield:
        <span className='detailedList__text'>{share.yield} $</span>
      </li>
      <li className='detailedList__listItem'>
        Last trade time:
        <span className='detailedList__text'>{last_trade_time}</span>
      </li>
    </ul>
  );
};
