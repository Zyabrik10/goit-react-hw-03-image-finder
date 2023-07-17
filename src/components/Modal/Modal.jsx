import PropsType from 'props-type';

export const Modal = ({ isModalOpen, largeImageSrcForModal }) => {
  return (
    <div className={`modal-overlay ${isModalOpen ? 'Overlay' : ''}`}>
      <div className="modal">
        <img src={largeImageSrcForModal} alt="" />
      </div>
    </div>
  );
};

Modal.propsType = {
  isModalOpen: PropsType.bool,
  largeImageSrcForModal: PropsType.string,
};
