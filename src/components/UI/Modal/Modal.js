import React,{ Component, PureComponent } from 'react';
import styles from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.show != nextProps.show){
            return true
        }
        else{
            return false
        }
    }
    componentDidUpdate(){
        console.log("Modal UPDATED")
    }
    render() {
        
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={styles.Modal}
                    style={
                        {
                            opacity : this.props.show ? '1' : '0',
                            transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
                        }
                    }>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
    
}

export default Modal; 
