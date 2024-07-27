import React from 'react'
import { singInWithGooglePopup } from '../../utils/firebase.utils'
import { createUserDocumentFromAuth } from '../../utils/firebase.utils'
import SignUp from '../SignUp/SignUp.component'

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await singInWithGooglePopup();
    //console.log(response);
    createUserDocumentFromAuth(user);
  }

  return (
    <div>
        <h1>Sign In Page</h1>        
        <button onClick={logGoogleUser}>
          Sign In With Google Popup
        </button>        
        <SignUp/>
    </div>
  )
}

export default SignIn
