import { Avatar, Button } from '@material-ui/core';
import React, { useContext } from 'react';
import googleLogo from '../../images/google.png'
import './Login.css'

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);


const Login = () => {
    
    const  provider = new firebase.auth.GoogleAuthProvider();
  
    const [loginUser,setLoginUser] = useContext(UserContext);
    

    const history = useHistory();

    const location = useLocation();

   let { from } = location.state || { from: { pathname: "/" } };
    

    const googleSignIn = ()=>{
        firebase.auth().signInWithPopup(provider).then((res)=> {
          
            const {displayName , email} = res.user;

            const signUser = {
                name : displayName,
                email : email
            }
           
            setLoginUser(signUser);
            history.replace(from);
          })
          .catch(function(error) {
           
            var errorCode = error.code;
            var errorMessage = error.message;
           
            var email = error.email;
          
            var credential = error.credential;
          
          });
    }


    return (
        <div className='login-section'>
            <h1>This is Login</h1>
            <Button onClick={googleSignIn} variant="contained" color="primary">
             <Avatar className='google-btn' alt="Cindy Baker" src={googleLogo}/>    Google
            </Button>
           
        </div>
    );
};

export default Login;