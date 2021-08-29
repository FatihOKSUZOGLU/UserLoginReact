import React,{Component} from 'react';
import { login } from '../api/apicalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
//Login class12
class LoginPage extends Component{
    
    state = {
        username: null,
        password: null,
        pendingAPIcall : false,
        errors: {}
    };

    onChange = event => {
        const {t} = this.props;
        const {name, value } = event.target;          
        const errors= {...this.state.errors}
        errors[name] = undefined        
        this.setState({
            [name]: value,
            errors
        });
    };

    onClickLogin = async event => { 
        event.preventDefault();
        const {username , password} = this.state;
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({pendingAPIcall : true});
        try{ 
            const response = await login(body);
        }catch(error){
            if(error.response.data.validationErrors){
                this.setState({errors: error.response.data.validationErrors})
            }           
        }
        this.setState({pendingAPIcall : false});
       
    }
    

    render() {
        const {pendingAPIcall,errors} = this.state;
        const {username,password} = errors;       
        const {t} = this.props;


        return(
            
            <div className ="container">
                <form>
                    <h1 className= "text-center" >{t('Log in')}</h1>
                    <Input name = "username" label ={t("Username")} error = {username} onChange={this.onChange}></Input>
                    <Input name = "password" label = {t("Password")} error ={password} onChange={this.onChange} type="password"></Input>
                    <div className= "text-center">
                        <button className="btn btn-primary"
                        onClick={this.onClickLogin}
                        >
                        { pendingAPIcall && <span className="spinner-border spinner-border-sm"></span>}
                        {t('Log in')}</button>

                    </div>
                    
                </form>
            </div>
        );
    }
}

const LoginPagewithTranslation = withTranslation()(LoginPage);

export default LoginPagewithTranslation;