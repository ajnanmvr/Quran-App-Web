import React from "react";

const Modal = ({ isOpen, onClose, text }) => {
  console.log(text);
  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0  bg-gray-500 bg-opacity-0 transition-opacity" />
      <div className="fixed inset-0 z-10 ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-sans font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Translation
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 font-sans">{text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex font-sans w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
