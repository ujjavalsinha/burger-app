import * as actionTypes from './action'
const initialState = {
    ingredients : {
        salad : 0,
        meat : 0,
        bacon : 0,
        cheese : 0
    },
    price : 4
}

const INGREDIENT_PRICES = {
    salad : 0.5,
    meat : 1.3,
    cheese : 0.4,
    bacon : 0.7
}

const reducer = (state=initialState,action ) => {
    console.log("INSIDE REDUCER")
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return { 
                ...state, ingredients :{
                    ...state.ingredients, [action.ingredientName] : state.ingredients[action.ingredientName] + 1},
                    price : state.price + INGREDIENT_PRICES[action.ingredientName]

                }
            
        case(actionTypes.REMOVE_INGREDIENT):
            return { 
                ...state, ingredients :{
                    ...state.ingredients, [action.ingredientName] : state.ingredients[action.ingredientName] -1},
                    price : state.price - INGREDIENT_PRICES[action.ingredientName]

                }
        
    }
    return state
}

export default reducer;