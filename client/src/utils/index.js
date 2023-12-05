import { useEffect } from "react";
import "./index.scss";
import {FiX} from "react-icons/fi";

const Button = ({ text, type, isloading, appearence, icon, click }) => {


  return (
    <button className={`btn ${appearence}`} type={type} disabled={isloading} onClick={click} >
       {isloading ? "Loading..." : <>{icon} {text}</>}
    </button>
  )
}

const Modal = ({children, setIsModalOpen, isModalOpen}) => {
  useEffect(() => {
    if(isModalOpen){
      document.body.style.overflow = "hidden";
    }
    else{
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen])

  return isModalOpen && (
    <div className="overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <FiX className="modal__close" onClick={() => setIsModalOpen(false)}/>
          {children}
        </div>
    </div>
  )
}

export { Button, Modal }