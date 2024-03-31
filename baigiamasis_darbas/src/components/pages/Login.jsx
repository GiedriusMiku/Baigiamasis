import styled from "styled-components";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    padding-bottom: 20px;

    > button {
        position: absolute;
        top: 20px;
        left: 20px;
        border: none;
        background-color: transparent;
        color: #3f51b5;
        font-size: 2em;
        cursor: pointer;
    }

    > h1 {
        color: #3f51b5;
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    > form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 300px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 5px;

            > label {
                font-weight: bold;
            }

            > input {
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }

            > p {
                color: red;
                margin-top: 5px;
            }
        }

        > button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #3f51b5;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        > button:hover {
            background-color: #283593;
        }
    }
`;

const Login = () => {

    const navigate = useNavigate();
    const [wrongInfo, setWrongInfo] = useState(false);
    const { users, setLoginUser } = useContext(UsersContext);

    const formik = useFormik({
        initialValues:{
            userName: "",
            password: ""
        },
        onSubmit: (values) => {
            const loginUser = users.find(user => user.userName === values.userName &&  bcrypt.compareSync(values.password, user.password));

            if(loginUser === undefined){
                setWrongInfo(true);
            } else {
                setLoginUser(loginUser);
                navigate('/');
            }

        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required("Username is required")
                .trim(),
            password: Yup.string()
                .required("Password is required")
                .trim()
        })
    });
    return ( 
        <StyledSection>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}> 
                <div>
                    <label htmlFor="userName">Username:</label>
                    <input 
                        type="text" 
                        id="userName" name="userName"
                        placeholder="Enter your user name..."
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.userName && formik.errors.userName && 
                        <p>{formik.errors.userName}</p>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" name="password"
                        placeholder="Enter your password..."
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange} 
                    />
                    {
                        formik.touched.password && formik.errors.password && 
                        <p>{formik.errors.password}</p>
                    }
                </div>
                <button type="submit">Login</button>
                {
                    wrongInfo && <p>Wrong username or password</p>
                }
            </form>
        </StyledSection>
     );
}
 
export default Login;