import * as actionTypes from '../actions/actionTypes'

let initialState = {
    orders : [],
    error : null,
    loading : false,
    purchased : false
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case(actionTypes.PURCHASE_INIT):
            return {
                ...state,
                purchased : false
            }
        case(actionTypes.PURCHASE_BURGER_START):{
            return {
                ...state,
                loading : true
            }
        }

        case(actionTypes.PURCHASE_BURGER_SUCCESS):
            
            const newOrder = state.orders.concat(action.orderData)
            return {
                ...state,
                id : action.order_id,
                orders : newOrder,
                error : false,
                loading : false,
                purchased : true
            }

        case(actionTypes.PURCHASE_BURGER_FAIL):
            return {
                ...state,
                error : true,
                loading : false
            }
        case(actionTypes.FETCH_ORDERS_START):
            return {
                ...state,
                loading : true
            }

        case(actionTypes.FETCH_ORDERS_SUCCESS):
            return {
                ...state,
                orders : action.order,
                loading : false
            }
        case(actionTypes.FETCH_ORDERS_FAIL):
            return {
                ...state,
                loading : false
            }
        default:
            return state
        
    }
}

export default reducer;