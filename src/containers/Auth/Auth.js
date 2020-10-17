import React, {Component} from 'react';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/index'
import {connect } from 'react-redux'
import {Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner'
const emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class Auth extends Component{

    state = {
        controls : {
            email :{
                elementType :'input',
                elementConfig : {
                    type : "email",
                    placeholder : "Mail Address"
                },
                validation : {
                    required : true,
                    emailType : true
                },
                valid : false,
                value : '',
                touched : false
            },
            password :{
                elementType :'input',
                elementConfig : {
                    type : "password",
                    placeholder : "Password"
                },
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                value : '',
                touched : false
            },
            
        },
        isSignup : true,
        formIsValid :false
    }
    componentDidMount() {
        if(this.props.authRedirectPath!=='/' && !this.props.building){
            this.props.onSetAuthRedirectPath('/')

        }
    }
    checkValidity = (value,rules) =>{
        let isValid = true
        if(rules.required){
            isValid = value!=='' && isValid
        }
        if(rules.minLength){
            
            
            isValid = value.length>=rules.minLength && isValid

        }
        if(rules.maxLength){
            isValid = value.length<=5 && isValid
        }
        if(rules.emailType){
            
            isValid = emailRegExp.test(String(value).toLowerCase()) && isValid
        }
        return isValid
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)

    }
    switchHandler = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {isSignup : !prevState.isSignup}
        })
    }
    inputChangeHandler = (event,controlName) => {
        const updatedControlData = {...this.state.controls}
        const updatedControlElement = {...this.state.controls[controlName]}
        updatedControlElement.value = event.target.value;
        
        updatedControlElement.valid = this.checkValidity(updatedControlElement.value, updatedControlElement.validation)
        
        updatedControlElement.touched = true
        updatedControlData[controlName] = updatedControlElement

        let formIsValid = true
        for(let inputIdentifier in updatedControlData){
            formIsValid = updatedControlData[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({controls : updatedControlData,formIsValid : formIsValid})
    }
    render(){
        let formElements = [];
        for ( let formElement in this.state.controls){
            formElements.push({
                id : formElement,
                config : this.state.controls[formElement]
            })
        }
        let form = formElements.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangeHandler(event,formElement.id)}
            />
        ))
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        if(this.props.loading){
            form = <Spinner/>
        }
        let redirect = null;
        if(this.props.isAuth ){
            redirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className={styles.Auth}>
                {redirect}
                <form>
                    {errorMessage}
                    {form}
                    <Button btnType='Success' disabled={!this.state.formIsValid} clicked={(e)=>{this.submitHandler(e)}}>SUBMIT</Button>
                    <Button btnType='Danger' clicked={(e) => {this.switchHandler(e)}}>SWITCH TO {this.state.isSignup ? 'Login' : 'SignUp'}</Button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.idToken !== null,
        authRedirectPath : state.auth.authRedirectPath,
        building : state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth  : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)