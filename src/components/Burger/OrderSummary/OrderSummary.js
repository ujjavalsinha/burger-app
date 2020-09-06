import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'
const OrderSummary = (props)=>{
    const orders = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                        <span style={{textTransform : 'capitalize'}}>{igKey}</span>
                        : {props.ingredients[igKey]}
                    </li>
            )
        })
    return (
        <Auxiliary>
            <h3>Your Burger is Ready!</h3>
            <p>Delicious Burger with ingredients as follows:</p>
            <ul>
                {orders}
            </ul>
            <h3>Total Price : {props.price.toFixed(2)}</h3>
            <p>Continue to checkout ?</p>
            <Button btnType='Danger' clicked={props.cancelorder}>CANCEL</Button>
            <Button btnType='Success' clicked={props.cancelorder}>CONTINUE</Button>
        </Auxiliary>
    )
}

export default OrderSummary;