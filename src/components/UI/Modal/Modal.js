import React from 'react';
import styles from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={styles.Modal}
                style={
                    {
                        opacity : props.show ? '1' : '0',
                        transform : props.show ? 'translateY(0)' : 'translateY(-100vh)'
                    }
                }>
                {props.children}
            </div>
        </Auxiliary>
    )
}

export default Modal; 
