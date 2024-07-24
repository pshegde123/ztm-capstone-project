import React from 'react'
import { singInWithGooglePopup } from '../../utils/firebase.utils'
import { createUserDocumentFromAuth } from '../../utils/firebase.utils'

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
    </div>
  )
}

export default SignIn
