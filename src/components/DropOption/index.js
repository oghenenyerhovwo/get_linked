import React from 'react'
import { ButtonMenu } from 'react-rainbow-components';
import styles from "./dropoption.module.css"

const DropOption = props => {
    const {parentComp, childrenComp} = props
  return (
    <div className={`${styles.drop_option}`}>
        <div className={`${styles.drop_option_parent}`}>
          {parentComp}
        </div>
        <ButtonMenu >
            {childrenComp}
        </ButtonMenu>
    </div>
  )
} 
export default DropOption