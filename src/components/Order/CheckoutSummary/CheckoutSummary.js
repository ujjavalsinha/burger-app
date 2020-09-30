import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'
const CheckoutSummary = (props) =>{
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Hope it tastes well!</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
        </div>
    )
}

export default CheckoutSummary