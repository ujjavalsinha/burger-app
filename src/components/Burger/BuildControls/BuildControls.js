import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label :'Salad', type:'salad'},
    {label :'Meat', type:'meat'},
    {label :'Cheese', type:'cheese'},
    {label :'Bacon', type:'bacon'}
]
const BuildControls = (props) =>{
    return (
        <div className={styles.BuildControls}>
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
           {controls.map(ingredient => 
               (<BuildControl 
                disabled={props.disableInfo[ingredient.type]} 
                key={ingredient.label} label={ingredient.label} 
                deleted={()=>props.deletedIngredient(ingredient.type)} 
                added={()=>props.addedIngredient(ingredient.type)}/>
           ))} 
           <button 
            className={styles.OrderButton} 
            onClick={props.ordered} 
            disabled={!props.purchasable}>
            ORDER NOW
            </button>
        </div>
    )
}

export default BuildControls;
