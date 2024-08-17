import React from 'react';
import { useState} from 'react';
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import Button from '../button/button.component';

const defaultFormFields={
  displayName:'',
  email:'',
  password:'',
  confirmPassword:''
}
const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword} = formFields;  

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();

    if (password !== confirmPassword){
      alert("Passwords do not match.")
    }

    try{
        const { user } = createAuthUserWithEmailAndPassword(email,password);            
        await createUserDocumentFromAuth(user,{displayName});        
        resetFormFields();        
    }catch(error){
      console.log("error = ",error);
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
      }else{
        console.log("User creation encounterd an error:",error)
      }      
    }
  }
  const handleChange = (event) =>{
    const {name,value} = event.target;
    setFormFields({...formFields,[name]:value})
    console.log(formFields)
  }
  return (
<div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span> Sign up with your email and password </span>
        <form onSubmit={handleSubmit}>
          <FormInput 
          label="Display Name"
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
          />
          
          <FormInput 
          label='email' 
          name="email" 
          onChange={handleChange} 
          value={email} 
          required/>
  
          <FormInput 
          label="password"
          type='password' 
          name="password" 
          onChange={handleChange} 
          value={password} 
          required/>
            
          <FormInput 
          label="Confirm password" 
          type='password' 
          name="confirmPassword" 
          onChange={handleChange} 
          value={confirmPassword} 
          required/>

          <Button buttonType='google' type='submit'>Sign Up</Button>
        </form>
      </div>    
  );
};

export default Signup;
