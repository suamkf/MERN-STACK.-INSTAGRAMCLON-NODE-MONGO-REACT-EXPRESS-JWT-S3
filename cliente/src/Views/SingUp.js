 import React, { useState } from 'react';
  import { Link } from 'react-router-dom'

 import Main from '../Components/Main.js';
 import signupImage from '../imagenes/signup.png';
 



 
  

 
 export default function Signup( { singUp ,showError}) {

    
 	const [user , setUser] = useState({

 	email: '',
 	name: '',
 	username: '',
 	bio: '',
 	password:''

   })

	function getUserData (e){
	 setUser({
	 	...user,
	 	[e.target.name] : e.target.value
	 })

	}

	async function sendDataToServer (e){

	   e.preventDefault()
       
       try{
       	await	singUp(user)
       }catch (err){
        showError(err.response.data) 
        console.log(err)
       }
	}


   return (
     <Main center={true}>

      <div className="Signup">
        <img src={signupImage} alt="" className="Signup__img" />
        <div className="FormContainer">
          <h1 className="Form__titulo">Intercambiagram</h1>
          <p className="FormContainer__info">
            Regístrate para que veas el clon de Instagram
          </p>
          <form onSubmit ={sendDataToServer}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange ={getUserData}
              value= {user.email}
            />
            <input
              type="text"
              name="name"
              placeholder="Nombre y Apellido"
              className="Form__field"
              required
              minLength="3"
              maxLength="100"
              onChange ={getUserData}
              value= {user.name}
            />
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              className="Form__field"
              required
              minLength="3"
              maxLength="30"
              onChange ={getUserData}
              value= {user.username}
            />
            <input
              type="text"
              name="bio"
              placeholder="Cuéntanos de ti..."
              className="Form__field"
              required
              maxLength="150"
              onChange ={getUserData}
              value= {user.bio}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="Form__field"
              required
              onChange ={getUserData}
              value= {user.password}
            />
            <button className="Form__submit" type="submit">
              Sign up
            </button>
            <p className="FormContainer__info">
              Ya tienes cuenta? <Link to="/singIn">Login</Link>
            </p>
          </form>
        </div>
      </div>
     </Main>
   );
 }