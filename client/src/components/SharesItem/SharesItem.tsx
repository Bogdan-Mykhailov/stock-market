import {FC} from "react";
import './SharesItem.scss'
import info from "../../assets/info.png";
import {Share} from "../../types/Share.ts";
import {DetailedInfo} from "../DetailedInfo/DetailedInfo.tsx";
import {Modal} from "../Modal/Modal.tsx";
import {useModal} from "../../hooks/useModal.ts";

interface Props {
  share: Share
}

export const SharesItem: FC<Props> = ({share}) => {
  const {
    name,
    change_percent,
    price,
    ticker,
    color
  } = share;

  const {modal, toggleModal} = useModal(false)

  return (
    <>
      <ul className='list' key={name}>
        <li
          className='list__title'
          style={{backgroundColor: `${color}`}}
        >
          {ticker}
        </li>
        <span className='list__company'>{name}</span>
        <li className='list__price'>{price} $</li>
        <li className='list__percent'>{change_percent}%</li>
        <img
          className='list__icon'
          onClick={toggleModal}
          src={info}
          alt="open modal icon"
        />
      </ul>

      <Modal modalMode={modal} closeModal={toggleModal}>
        <DetailedInfo share={share} />
      </Modal>
    </>
  );
};
