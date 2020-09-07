import React,{useState} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

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
            
            <Toolbar toggleSidedrawer={sideDrawerTogglerHandler}/>
            <Sidedrawer open={showSidedrawer} closed={sidedrawerClosedHandler}/>
            <main className={styles.main}>
                {props.children}
            </main>
        </Auxiliary>
    )    
    
}

export default Layout