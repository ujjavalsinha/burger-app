import React from 'react';
import styles from './Sidedrawer.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'


const Sidedrawer = props =>{
    let attachclass = [styles.Sidedrawer,styles.Close]
    if(props.open){
        attachclass = [styles.Sidedrawer,styles.Open]
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachclass.join(' ')} >
                
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <NavigationItems/>
            </div>
        </Auxiliary>
        
    )
}

export default Sidedrawer;