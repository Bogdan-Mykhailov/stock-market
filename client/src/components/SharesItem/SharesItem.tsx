import {FC} from "react";
import './SharesItem.scss'
import info from "../../assets/info.png";
import {Share} from "../../types/Share.ts";
import {useModal} from "../../hooks/useModal.ts";
import toggleOn from '../../assets/toggleOn.svg';
import toggleOff from '../../assets/toggleOff.svg';
import {DetailedInfo} from "../DetailedInfo";
import {Modal} from "../Modal";

interface Props {
  share: Share;
  onDeleteTicker: (ticker: string) => void;
}

export const SharesItem: FC<Props> = ({share, onDeleteTicker}) => {
  const {
    name,
    change_percent,
    price,
    ticker,
    color,
    active
  } = share;

  const {modal, toggleModal} = useModal(false);
  const handleDeleteTicker = () => {
    onDeleteTicker(ticker);
  };

  return (
    <>
      <ul className={`list ${active ? '' : 'list__inactive'}`} key={name}>
        <li
          className='list__title'
          style={{backgroundColor: `${color}`}}
        >
          {ticker}
        </li>
        <img
          className='list__toggle-icon'
          src={active ? toggleOn : toggleOff}
          onClick={handleDeleteTicker}
          alt='Toggle icon'
        />
        <span className='list__company'>{name}</span>
        <li className='list__price'>{price} $</li>
        <li className='list__percent'>{change_percent}%</li>
        {active && <img
          className='list__icon'
          onClick={toggleModal}
          src={info}
          alt="open modal icon"
        />}
      </ul>

      <Modal modalMode={modal} closeModal={toggleModal}>
        <DetailedInfo share={share}/>
      </Modal>
    </>
  );
};
