import  { createPortal } from "react-dom";
import React from "react";
type  ModalProps ={
    
   onClose:()=>void;
     children: React.ReactNode;
     show:boolean

}

const Modal = ({show, onClose,children}:ModalProps) => {
  return (
    <>    {show &&  createPortal(<>
        <div className="modal-backdrop fade show" onClick={onClose}></div>
     
        </>
        ,
        document.body
      )}
      {show &&  createPortal(<>
       
        <div className="modal  fade show" style={{display:"block"}}  tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
             
                {children}
            </div>
          </div>
        </div>
        </>
        ,
        document.body
      )}
    </>
  );
};

export default Modal;
