import styled from "styled-components";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import UsersContext from "../../contexts/UsersContext";
import { UsersActionTypes } from "../../contexts/UsersContext";
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

const StyledRegister = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    padding-bottom: 20px ;

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

// ... rest of your code ...

const Register = () => {

    const navigate = useNavigate();
    const { users, setUsers, setLoginUser } = useContext(UsersContext);
    const [sameNameError, setSameNameError] = useState(false);

    const formik = useFormik({ 
        initialValues:{
            userName: "",
            email: "",
            password: "",
            passwordRepeat: ""
        },
        onSubmit: (values) => {
            if(users.find(user => user.userName === values.userName)){
               setSameNameError(true);
            } else {
                const newUser = {
                    id: uuid(),
                    userName: values.userName,
                    email: values.email,
                    password: bcrypt.hashSync(values.password, 10),
                    passwordNoHash: values.password
                };
                setUsers({
                    type: UsersActionTypes.addNew,
                    data: newUser
                });
                setLoginUser(newUser);
                navigate('/');
            }
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(25, 'Must be 25 characters or less')
                .required('Required')
                .trim(),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required')
                .trim(),
            password: Yup.string()
                .min(6, 'Must be at least 6 characters')
                .required('Required')
                .trim(),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Required')
                .trim()
        })
    });

    return ( 
        <StyledRegister>
            <button><Link to="/"><i className="bi bi-arrow-left"></i></Link></button>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="userName">User name:</label>
                    <input 
                        type="text" 
                        id="userName" name="userName"
                        placeholder="Create your user name..."
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.userName && formik.errors.userName && 
                    <p>{formik.errors.userName}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" name="email"
                        placeholder="Enter your email..."
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && 
                    <p>{formik.errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" name="password"
                        placeholder="Create your password..."
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password &&
                    <p>{formik.errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="passwordRepeat">Repeat password:</label>
                    <input 
                        type="password" 
                        id="passwordRepeat" name="passwordRepeat"
                        placeholder="Repeat your password..."
                        value={formik.values.passwordRepeat}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                    <p>{formik.errors.passwordRepeat}</p>}
                </div>
                <button type="submit">Register</button>
                {sameNameError && <div>User name already exists</div>}
            </form>
        </StyledRegister>
     );
}
 
export default Register;