import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import Dictaphone from '../../components/Dictaphone/Dictaphone'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 1.3,
    cheese : 0.4,
    bacon : 0.7
}
class BurgerBuilder extends Component {
    state = { 
        ingredients : {
            
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4
        
     }
    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type]
        const newIngredientCount = oldIngredientCount+1
        const newIngredients = {...this.state.ingredients}
        newIngredients[type] = newIngredientCount
        const oldTotalPrice = this.state.totalPrice
        const newTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients : newIngredients,totalPrice:newTotalPrice})
        
    }

    deleteIngredientHandler = type => {
        const oldIngredientCount = this.state.ingredients[type]
        if(oldIngredientCount <= 0){
            return;
        }
        const newIngredientCount = oldIngredientCount-1
        const newIngredients = {...this.state.ingredients}
        newIngredients[type] = newIngredientCount
        const oldTotalPrice = this.state.totalPrice
        const newTotalPrice = oldTotalPrice - INGREDIENT_PRICES[type]
        this.setState({ingredients : newIngredients,totalPrice:newTotalPrice})
    }

    transcriptHandler = (transcript) => {
        this.setState({answer : transcript})
    }
    render() {
        let disabledInfo = {...this.state.ingredients} 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        
        return ( 
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                disableInfo={disabledInfo} 
                deletedIngredient={this.deleteIngredientHandler} 
                addedIngredient={this.addIngredientHandler}
                price={this.state.totalPrice}/>
                
            </Auxiliary>
         );
    }
}
 
export default BurgerBuilder;