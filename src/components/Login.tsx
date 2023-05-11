import React, { useState, FC } from "react";
import MovieTable from "../MovieTable";


type LoginProps = {
    onFormSwitch: (form: string) => void;
    };
    
    const Login: React.FC<LoginProps> = ({ onFormSwitch }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [userName, setUserName] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [disableLogin, setDisableLogin] = useState(false);

    const toggleTable = () => {
        setShowTable(!showTable);
    }

    const toggleOffLogin = () => {
        setDisableLogin(!disableLogin);
    }

    function handleClick(){
        console.log('you are being clicked');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="auth-form-container">
            <h2 className="title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="UserName">UserName</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)}type="UserName" placeholder="" id="UserName" name="userName" />
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" onClick={toggleTable}>Log In</button>
            </form>
            <button className="link-btn" onClick={() => onFormSwitch('register')}>Don't have an account? Register here.</button>
            {showTable ? <MovieTable /> : null}
            {disableLogin ? <Login onFormSwitch={function (form: string): void {
            } } /> : null}
        </div>
    );
    };
    
    export default Login;
    
    
    
    
    