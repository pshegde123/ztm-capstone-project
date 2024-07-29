import React from 'react';
import Signin from '../signin/signin.component';
import SignUp from '../SignUp/SignUp.component';
import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className='authentication-container'>        
        <Signin/>
        <SignUp/>
    </div>
  )
}

export default Authentication
