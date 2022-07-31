import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./SideModal.css";

const SideModalContext = React.createContext();

export function SideModalProvider({ children }) {
  const sideModalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(sideModalRef.current);
  }, []);

  return (
    <>
      <SideModalContext.Provider value={value}>{children}</SideModalContext.Provider>
      <div ref={sideModalRef} />
    </>
  );
}

export function SideModal({ onClose, children }) {
  const sideModalNode = useContext(SideModalContext);
  if (!sideModalNode) return null;

  return ReactDOM.createPortal(
    <div id="side-modal">
      <div id="side-modal-background" onClick={onClose} />
      <div id="side-modal-content">{children}</div>
    </div>,
    sideModalNode
  );
}
