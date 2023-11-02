import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const Modal = () => {
  return (
    <dialog id="my_modal_3" className="modal ">
      <div className="modal-box bg-black">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg capitalize">
          connect on linkedin and github
        </h3>
        <div className="flex flex-col">
          <button className="btn btn-ghost">
            <FontAwesomeIcon
              className="text-2xl"
              icon="fa-brands fa-linkedin"
            />
            linkedIn
          </button>

          <button className="btn btn-ghost">
            <FontAwesomeIcon className="text-2xl" icon="fa-brands fa-github" />
            readme
          </button>

          <button className="btn btn-ghost">
            <FontAwesomeIcon className="text-2xl" icon="fa-brands fa-github" />
            source code
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
