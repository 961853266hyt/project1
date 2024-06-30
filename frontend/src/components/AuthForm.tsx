import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn, signUp, updatePassword } from '../redux/actions';


interface FormData {
    email: string;
    password: string;
};


const AuthForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password} = formData;
        if (location.pathname === '/signin') {
            // dispatch signin action
            await dispatch(signIn(email, password));
        } else if (location.pathname === '/signup') {
            dispatch(signUp(email, password));
        } else if (location.pathname === '/update-password') {
            dispatch(updatePassword(email));
        }
        navigate('/'); // redirect to home page
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const signinHeader = 'Sign in to your account'
    const signupHeader = 'Sign up an account'
    const updatePasswordHeader = 'Update your password'
    const signinBtn = 'Sign in'
    const signupBtn = 'Create account'
    const updatePasswordBtn = 'Update password'
    return (
        <form onSubmit={handleSubmit}>
            <h2>{location.pathname === '/signin' ?signinHeader:location.pathname === '/signup' ?signupHeader:updatePasswordHeader}</h2>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div>
                {
                    location.pathname === 'update-password'?null:
                    <>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </>
                }
            </div>
            <button type="submit">{location.pathname === '/signin'?signinBtn:location.pathname === '/signup'?signupBtn:updatePasswordBtn}</button>
        </form>
    )

}

export default AuthForm;
