import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks'

import Auth from '../../utils/auth'
import { ADD_CREATOR } from '../../utils/mutations'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import  AWSService  from '../../utils/AWS.js';

import './Signup.css';

const Signup = () => {
  const [ formState, setFormState ] = useState({ email: '', password: '' });
  const [ addCreator ] = useMutation(ADD_CREATOR)

  function createCreatorDir(username) {
    console.log('username from createCreatorDir: ', username)
    username = username.trim();
    if (!username) {
      return alert("usernames must contain at least one non-space character.");
    }
    if (username.indexOf("/") !== -1) {
      return alert("Album names cannot contain slashes.");
    }
    var creatrDirKey = encodeURIComponent(username) + '/';
    console.log('creatrDirKey: ', creatrDirKey)

    AWSService.signup(creatrDirKey);
        
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    createCreatorDir(formState.username)


    // handle signup auth
    const mutationResponse = await addCreator({
			variables : {
				username : formState.username,
				email     : formState.email,
				password  : formState.password
			}
		});
    const token = mutationResponse.data.addCreator.token;
    const creatorId = mutationResponse.data.addCreator.creator._id
		Auth.login(creatorId, token);
		// Auth.login(token);
  }

  const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name] : value
		});
	};

	return (
		<React.Fragment>
			<main className="Signup vh-100 d-flex flex-column align-items-center mt-5 pt-5">
				<h3 className="mb-5">Signup</h3>
				<Form className="signup-form d-flex flex-column" onSubmit={handleFormSubmit}>
          
					<Form.Group controlId="Signup-username-input">
						<Form.Label>Username</Form.Label>
						<Form.Control name="username" placeholder="" onChange={handleChange}/>
					</Form.Group>

					<Form.Group controlId="Signup-email-input">
						<Form.Label>Email Address</Form.Label>
						<Form.Control type="email" name="email" placeholder="" onChange={handleChange}/>
					</Form.Group>


					<Form.Group controlId="Signup-password-input">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="" onChange={handleChange}/>
					</Form.Group>

					<Button className="signup-btn align-self-center" variant="primary" type="submit">
						Sign Up
					</Button>
				</Form>
			</main>
		</React.Fragment>
	);
};

export default Signup;