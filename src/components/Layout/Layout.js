import React,{useState} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import { connect } from 'react-redux'
const Layout = (props) => {
    const [showSidedrawer, setShowSidedrawer] = useState(false)
    const sidedrawerClosedHandler = () =>{
        setShowSidedrawer(false)
    }

    const sideDrawerTogglerHandler = () =>{
        setShowSidedrawer(prevshowSidedrawer => !prevshowSidedrawer)
    }

    return(
        <Auxiliary>
            <Toolbar isAuth={props.isAuth} toggleSidedrawer={sideDrawerTogglerHandler}/>
            <Sidedrawer isAuth={props.isAuth} open={showSidedrawer} closed={sidedrawerClosedHandler}/>
            <main className={styles.main}>
                {props.children}
            </main>
        </Auxiliary>
    )    
    
}
const mapStateToProps = state => {
    return {
        isAuth : state.auth.idToken !== null
    }
}
export default connect(mapStateToProps)(Layout)