import {FC, ReactNode} from 'react';
import './Modal.scss'

interface ModalProps {
  children: ReactNode,
  modalMode: boolean,
  closeModal: () => void,
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    modalMode,
    closeModal,
  } = props;

  return (
    <div
      onClick={closeModal}
      className={
        modalMode
          ? 'modal--active'
          : 'modal'
      }
    >
      <div onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
