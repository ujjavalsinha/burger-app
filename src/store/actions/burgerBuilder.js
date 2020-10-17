import * as actionTypes from './actionTypes'
import axios from 'axios'
export const addIngredient = (name) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const fetchFailed = (error) => {
    return {
        type : actionTypes.FETCH_FAILED,
        error : error
    }
}
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-project-d9936.firebaseio.com/ingredients.json')
        .then(response => {
            console.log("RESPONSE ",response.data)
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchFailed(true))
        })
    }
}