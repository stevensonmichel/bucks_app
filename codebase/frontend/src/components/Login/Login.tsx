import React from "react";


const Login:React.FC = ()=> {
    const username = "Username";
    const password = "Password";
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" value={password} required/>
                </div>
            </form>
        </div>
        

    );
};

export default Login