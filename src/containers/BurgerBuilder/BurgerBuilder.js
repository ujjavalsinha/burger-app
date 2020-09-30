import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import Dictaphone from '../../components/Dictaphone/Dictaphone'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
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
        totalPrice : 4,
        purchasable : false,
        purchasing : false
        
     }
    
    updatePurchasable=(new_ingredients)=>{
        const ingredients = {...new_ingredients}
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum,el)=>{
                return sum+el
            })
        this.setState({purchasable : sum>0})
    }
    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type]
        const newIngredientCount = oldIngredientCount+1
        const newIngredients = {...this.state.ingredients}
        newIngredients[type] = newIngredientCount
        const oldTotalPrice = this.state.totalPrice
        const newTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients : newIngredients,totalPrice:newTotalPrice})
        this.updatePurchasable(newIngredients)
    }

    setPurchasing = () =>{
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
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
        this.updatePurchasable(newIngredients)
    }

    transcriptHandler = (transcript) => {
        this.setState({answer : transcript})
    }
    purchaseContinueHandler = () =>{
        const queryParams = []
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price="+this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({pathname:'/checkout',search : '?'+queryString})
    }
    render() {
        let disabledInfo = {...this.state.ingredients} 
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        
        
        return ( 
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancelorder={this.purchaseCancelHandler}
                        price={this.state.totalPrice}
                        continueorder={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                disableInfo={disabledInfo} 
                deletedIngredient={this.deleteIngredientHandler} 
                addedIngredient={this.addIngredientHandler}
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchasable={this.state.purchasable}
                ordered={this.setPurchasing}/>
                
            </Auxiliary>
         );
    }
}
 
export default BurgerBuilder;