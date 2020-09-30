import React from 'react'
import styles from './Order.module.css'

const Order = (props ) => {
    let ingredients = []
    
    for( let ingredient in props.ingredients){
        ingredients.push({name : ingredient,count : props.ingredients[ingredient]})
    }
    const ingredientOutput = ingredients.map(ingredient =>{
        return <span key={ingredient.name}>{ingredient.name}({ingredient.count})</span>
    }
    )
    return (
        <div className={styles.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Total Price : <strong>{props.price}</strong></p>
        </div>
    )
}

export default Order;