import React from 'react';
import { buttonClasses } from '../layouts/helpers';

const ConfirmModal = ({ showModal, setShowModel, setConfirm, message }) => {
  let modalBg =
    'min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-20 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ';
  let modalClasses =
    'w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 transition-all ease-in-out duration-300';

  if (showModal) {
    modalBg += ' z-20';
    modalClasses += ' translate-y-5 opacity-1 ';
  } else {
    modalBg += ' -z-20 ';
    modalClasses += ' translate-y-0 opacity-0';
  }

  return (
    <div onClick={() => setShowModel(false)} role="presentation" className={modalBg}>
      <div className="absolute bg-black opacity-80 inset-0 z-0 " />
      <div onClick={(e) => e.stopPropagation()} role="presentation" className={modalClasses}>
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>

            <p> {message}</p>
          </div>

          <div className="p-3 mt-2 text-center space-x-4 flex justify-around items-center ">
            <button
              className={buttonClasses('green')}
              onClick={() => {
                if (setConfirm) {
                  setConfirm(true);
                }
                setShowModel(false);
              }}
            >
              confirm
            </button>
            <button
              className={buttonClasses('red')}
              onClick={(e) => {
                e.preventDefault();
                setShowModel(false);
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
