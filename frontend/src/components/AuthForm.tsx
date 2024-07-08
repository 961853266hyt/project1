import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../redux/actions';
import { Link } from 'react-router-dom';
import { EmailSend } from './icons/EmailSend';


interface FormData {
    email: string;
    password: string;
    role: string;
}

const SignInLinks = () => {
  return (
    <div className="flex justify-between mt-4 text-sm">
      <h2>Don't have an account?</h2>
      <Link to="/signup" className="text-blue-500 underline"><span className="font-semibold">Sign up</span></Link>
      <span className="mx-4"></span>
      <Link to="/update-password" className="text-blue-500 underline font-semibold">Forgot password?</Link>
    </div>
  );
};



const AuthForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        role: 'user',
    });

    const [emailSent, setEmailSent] = useState(false);
    const [pageType, setPageType] = useState(location.pathname);

    useEffect(() => {
      setPageType(location.pathname);
      setEmailSent(false); 
    }, [location.pathname]);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password, role} = formData;
        if (location.pathname === '/signin') {
            // dispatch signin action
            await dispatch(signIn({email, password}));
            navigate('/'); 
        } else if (location.pathname === '/signup') {
            await dispatch(signUp({email, password, role}));
            navigate('/'); 
        } else if (location.pathname === '/update-password') {
            //await dispatch(updatePassword(email));
            setEmailSent(true);
        }
       
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox'?(checked?'admin':'user'):value,
        });
    }

    const handleClose = () => {
      setEmailSent(false);
      navigate('/');
    }
    const signinHeader = 'Sign in to your account'
    const signupHeader = 'Sign up an account'
    const updatePasswordHeader = 'Update your password'
    const signinBtn = 'Sign in'
    const signupBtn = 'Create account'
    const updatePasswordBtn = 'Update password'

    if (emailSent) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative p-12 border border-gray-300 rounded shadow-lg text-center">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-black"
            >
              &times;
            </button>
            <EmailSend />
            <p className="text-lg font-semibold">We have sent the update password link to your email, please check that!</p>
          </div>
        </div>
      );
    }
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
          {location.pathname === '/signup' && (
            <div className="mb-4">
              <label className="block mb-1">
                <input
                  type="checkbox"
                  name="role"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Register as admin
              </label>
            </div>
          )}
          {location.pathname === '/signin' && <SignInLinks />}
        </form>
      </div>
    </div>
    )

}

export default AuthForm;
