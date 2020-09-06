import React,{useState} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

const Layout = (props) => {
    const [showSidedrawer, setShowSidedrawer] = useState(true)
    const sidedrawerClosedHandler = () =>{
        setShowSidedrawer(false)
    }
    return(
        <Auxiliary>
            
            <Toolbar/>
            <Sidedrawer open={showSidedrawer} closed={sidedrawerClosedHandler}/>
            <main className={styles.main}>
                {props.children}
            </main>
        </Auxiliary>
    )    
    
}

export default Layout