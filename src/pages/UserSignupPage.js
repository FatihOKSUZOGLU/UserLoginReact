import React from 'react';
import { signup , changeLanguage} from '../api/apicalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';

class UserSignupPage extends React.Component{
    
    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingAPIcall : false,
        errors: {}
    };

    onChange = event => {
        const {t} = this.props;
        const { name, value } = event.target;  
        const errors= {...this.state.errors}
        errors[name] = undefined
        if(name=="password" || name=="passwordRepeat"){
            if(name=="password"&& value!=this.state.passwordRepeat){
                errors.passwordRepeat= t( "Password missmatch");
            }else if(name=="passwordRepeat"&& value!=this.state.password){
                errors.passwordRepeat = this.props.t( "Password missmatch");
            }else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        });
    };

    onClickSignup = async event => { // browserin bizim yerimize bir sey yapmasını engeller
        event.preventDefault();
        const {username , displayName , password} = this.state;
        const body = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.setState({pendingAPIcall : true});
        try{ 
            const response = await signup(body);
        }catch(error){
            if(error.response.data.validationErrors){
                this.setState({errors: error.response.data.validationErrors})
            }           
        }
        this.setState({pendingAPIcall : false});
       
    }
    onChangelanguage = language => {
        const { i18n } = this.props; 
        i18n.changeLanguage(language);
        changeLanguage(language); 
    }

    render() {
        const {pendingAPIcall,errors} = this.state;
        const {username,displayName,password,passwordRepeat} = errors;       
        const {t} = this.props;


        return(
            
            <div className ="container">
                <form>
                    <h1 className= "text-center" >{t('Sign Up')}</h1>
                    <Input name = "username" label ={t("Username")} error = {username} onChange={this.onChange}></Input>
                    <Input name = "displayName" label ={t("Display Name")} error = {displayName} onChange={this.onChange}></Input>
                    <Input name = "password" label = {t("Password")} error ={password} onChange={this.onChange} type="password"></Input>
                    <Input name = "passwordRepeat" label = {t("Password Repeat")} error ={passwordRepeat} onChange={this.onChange} type="password"></Input>
                    <div className= "text-center">
                        <button className="btn btn-primary"
                        onClick={this.onClickSignup}
                        disabled={pendingAPIcall||passwordRepeat!=undefined}
                        >
                        { pendingAPIcall && <span className="spinner-border spinner-border-sm"></span>}
                        {t('Sign Up')}</button>

                    </div>
                    <div>
                        <img src="https://www.countryflags.io/tr/flat/24.png" alt ="Turkey Flag" onClick = {() => this.onChangelanguage('tr')} style={{cursor :"pointer"}} ></img>
                        <img src="https://www.countryflags.io/us/flat/24.png" alt = "USA flag" onClick = {() => this.onChangelanguage('en')} style={{cursor :"pointer"}} ></img>
                    </div>
                    
                </form>
            </div>
        );
    }
}

const UserSignupPagewithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPagewithTranslation;