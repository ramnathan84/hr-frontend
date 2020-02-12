import React, { Component } from 'react';
import { signup } from './util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from './constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            sex: {
                value: ''
            },
            email: {
                value: ''
            },
            mobile: {
                value: ''
            },
            address: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const signupRequest = {
            name: this.state.name.value,
            sex: this.state.sex.value,
            email: this.state.email.value,
            mobile: this.state.mobile.value,
            address: this.state.address.value
        };
        signup(signupRequest)
        .then(response => {
            console.log("Success:: ",response);
            notification.success({
                message: 'Success',
                description: "Registration Successful!",
            });          
            this.props.history.push("/Home");
        }).catch(error => {
            console.log("error:: ",error);
            notification.error({
                message: 'Fail',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.sex.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.mobile.validateStatus === 'success' &&
            this.state.address.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div>
            <button style={{ padding: '10px' }}> <Link to="/Home">Back</Link></button>
            <div className="signup-container">
                <h1 className="page-title">Create New Employee</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem 
                            label="Full Name"
                            hasFeedback
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input 
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Your full name"
                                value={this.state.name.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem label="Gender"
                            hasFeedback
                            validateStatus={this.state.sex.validateStatus}
                            help={this.state.sex.errorMsg}>
                            <Input 
                                size="large"
                                name="sex" 
                                autoComplete="off"
                                placeholder="Gender"
                                value={this.state.sex.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateGender)} />    
                        </FormItem>
                        <FormItem 
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input 
                                size="large"
                                name="email" 
                                type="email" 
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />    
                        </FormItem>
                        <FormItem label="Mobile"
                            hasFeedback
                            validateStatus={this.state.mobile.validateStatus}
                            help={this.state.mobile.errorMsg}>
                            <Input 
                                size="large"
                                name="mobile" 
                                autoComplete="off"
                                placeholder="Mobile"
                                value={this.state.mobile.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateMobileNumber)} />    
                        </FormItem>
                        <FormItem label="Address"
                            hasFeedback
                            validateStatus={this.state.address.validateStatus}
                            help={this.state.address.errorMsg}>
                            <Input 
                                size="large"
                                name="address" 
                                autoComplete="off"
                                placeholder="Address"
                                value={this.state.address.value} 
                                onChange={(event) => this.handleInputChange(event, this.validateMobileNumber)} />    
                        </FormItem>
                      
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Submit</Button>
                          
                        </FormItem>
                    </Form>
                </div>
            </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }

    validateMobileNumber = (name) => {
        //console.log(name)
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        
    }

    validateGender = (name) => {
        //console.log(name)

        if(name.length > 1) {
            return {
                validateStatus: 'error',
                errorMsg: `Please enter M or F only`
            }
        }

            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        
    }

    validateEmail = (email) => {

        
            return {
                validateStatus: null,
                errorMsg: null,
        };
      
    }

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

    
    }

  
    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default Signup;