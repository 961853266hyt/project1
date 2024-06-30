import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../redux/actions';


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
        const { email, password } = formData;
        if (location.pathname === '/signin') {
            // dispatch signin action
            await dispatch(signIn(email, password));
        }

        navigate('/'); // after signin, redirect to home page
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign in to your account</h2>
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
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Sign in</button>
        </form>
    )

}

export default AuthForm;
