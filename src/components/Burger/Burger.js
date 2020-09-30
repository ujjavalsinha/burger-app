import React from 'react'
import styles from './Burger.module.css'
import {withRouter } from 'react-router-dom'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js'
const Burger = (props) =>{
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        })
    }).reduce((arr,el)=>{
        // console.log(arr.concat(el))
        return arr.concat(el)
    },[])
    // console.log(transformedIngredients)
    if(transformedIngredients.length ===0 ){
        transformedIngredients = <p>Please fill you burger!</p>
    }
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-top'/>
        </div>
    )
};

export default Burger;

