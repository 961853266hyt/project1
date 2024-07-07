import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn, signUp, updatePassword } from '../redux/actions';


interface FormData {
    email: string;
    password: string;
}


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
            await dispatch(signUp(email, password));
        } else if (location.pathname === '/update-password') {
            await dispatch(updatePassword(email));
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

    const handleClose = () => {
      navigate('/');
    }
    const signinHeader = 'Sign in to your account'
    const signupHeader = 'Sign up an account'
    const updatePasswordHeader = 'Update your password'
    const signinBtn = 'Sign in'
    const signupBtn = 'Create account'
    const updatePasswordBtn = 'Update password'
    return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-2xl p-6 border border-gray-300 rounded shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-black"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4 text-center">
            {location.pathname === '/signin' ? signinHeader :
             location.pathname === '/signup' ? signupHeader :
             updatePasswordHeader}
          </h2>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          {location.pathname !== '/update-password' && (
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-main-purple text-sm font-semibold text-white px-4 py-2 w-full rounded"
          >
            {location.pathname === '/signin' ? signinBtn :
             location.pathname === '/signup' ? signupBtn :
             updatePasswordBtn}
          </button>
        </form>
      </div>
    </div>
    )

}

export default AuthForm;
