import React from 'react'
import { ButtonMenu } from 'react-rainbow-components';
import styles from "./dotmenu.module.css"

import { FaEllipsisV } from 'react-icons/fa';

const DotMenu = props => {

    return (
        <div className={`${styles.dot_menu} flex flex__center`}>
            <ButtonMenu id="button-menu" icon={<FaEllipsisV />} >
                {props.children}
            </ButtonMenu>
        </div>
    )
}

export default DotMenu