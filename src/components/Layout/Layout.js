import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import styles from './Layout.module.css'

const Layout = (props) => (
    <Auxiliary>
        <div>
            Toolbar, Side Drawer, Order
        </div>
        <main className={styles.main}>
            {props.children}
        </main>
    </Auxiliary>
    
)

export default Layout