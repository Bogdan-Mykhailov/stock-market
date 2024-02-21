import {FC, useEffect, useState} from "react";
import {Share} from "../../types/Share.ts";
import './DetailedInfo.scss';
import {formatDateAndTime} from "../../utils/helpers.ts";
import {Chart} from "../Chart/Chart.tsx";
import {CharType} from "../../types/types.ts";

interface Props {
  share: Share;
}

export const DetailedInfo: FC<Props> = ({share}) => {
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

  const [arr, setArr] = useState<Share[]>([]);

  useEffect(() => {
    setArr(prevState => {
      if (!prevState.find(prevShare => prevShare.last_trade_time === share.last_trade_time)) {
        if (prevState.length > 12) {
          prevState.shift();
        }
        return [...prevState, share];
      }
      return prevState;
    })
  }, [share]);

  const currentData = arr.slice(1)

  const currentDataAndTime = formatDateAndTime(last_trade_time)

  return (
    <>
      <ul className='detailedList'>
        <li className='detailedList__listItem'>
          Company name:
          <span className='detailedList__text'>{name}</span>
        </li>
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
          <span className='detailedList__text'>{currentDataAndTime}</span>
        </li>
        <hr/>
        <li>
          <Chart data={currentData} type={CharType.DETAILED}/>
        </li>
      </ul>
    </>
  );
};
