import * as actionTypes from '../actions/actionTypes'
const initialState = {
    ingredients : null,
    price : 4,
    error : null,
    building : false
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 1.3,
    cheese : 0.4,
    bacon : 0.7
}

const reducer = (state=initialState,action ) => {
    
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return { 
                ...state, ingredients :{
                    ...state.ingredients, [action.ingredientName] : state.ingredients[action.ingredientName] + 1},
                    price : state.price + INGREDIENT_PRICES[action.ingredientName],
                    building : true

                }
            
        case(actionTypes.REMOVE_INGREDIENT):
            return { 
                ...state, ingredients :{
                    ...state.ingredients, [action.ingredientName] : state.ingredients[action.ingredientName] -1},
                    price : state.price - INGREDIENT_PRICES[action.ingredientName],
                    building : true
                }
        case(actionTypes.SET_INGREDIENTS):
                return {
                    ...state,
                    ingredients : action.ingredients,
                    price :4,
                    error : false
                }

        case(actionTypes.FETCH_FAILED):
                return {
                    ...state,
                    error : true
                }
        
    }
    return state
}

export default reducer;