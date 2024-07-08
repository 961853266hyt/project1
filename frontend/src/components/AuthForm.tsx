import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signIn, signUp } from '../redux/actions';
import { Link } from 'react-router-dom';
import { EmailSend } from './icons/EmailSend';
import CustomInput from './custom/CustomInput';

const SignInLinks = () => {
  return (
    <div className="flex justify-between mt-4 text-sm">
      <h2>Don't have an account?</h2>
      <Link to="/signup" className="text-blue-500 underline">
        <span className="font-semibold">Sign up</span>
      </Link>
      <span className="mx-4"></span>
      <Link to="/update-password" className="text-blue-500 underline font-semibold">
        Forgot password?
      </Link>
    </div>
  );
};

const AuthForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailSent, setEmailSent] = useState(false);
  const [pageType, setPageType] = useState(location.pathname);

  useEffect(() => {
    setPageType(location.pathname);
    setEmailSent(false); 
  }, [location.pathname]);

  const initialValues = {
    email: '',
    password: '',
    role: 'user',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email input!').required('Invalid Email input!'),
    password: Yup.string().required('Invalid Password input!'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password, role } = values;
    if (pageType === '/signin') {
      await dispatch(signIn({ email, password }));
      navigate('/');
    } else if (pageType === '/signup') {
      await dispatch(signUp({ email, password, role }));
      navigate('/');
    } else if (pageType === '/update-password') {
      setEmailSent(true);
    }
    setSubmitting(false);
  };

  const handleClose = () => {
    setEmailSent(false);
    navigate('/');
  };

  const headers = {
    '/signin': 'Sign in to your account',
    '/signup': 'Sign up an account',
    '/update-password': 'Update your password',
  };

  const buttons = {
    '/signin': 'Sign in',
    '/signup': 'Create account',
    '/update-password': 'Update password',
  };

  if (emailSent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative p-12 border border-gray-300 rounded shadow-lg text-center">
          <button onClick={handleClose} className="absolute top-2 right-2 text-black">
            &times;
          </button>
          <EmailSend />
          <p className="text-lg font-semibold">
            We have sent the update password link to your email, please check that!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-full max-w-2xl p-6 border border-gray-300 rounded shadow-lg">
        <button onClick={handleClose} className="absolute top-2 right-2 text-black">
          &times;
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={
            pageType === '/update-password'
              ? Yup.object().shape({ email: Yup.string().email('Invalid Email input!').required('Invalid Email input!') })
              : validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-xl font-bold mb-4 text-center">{headers[pageType]}</h2>
              <CustomInput label="Email" name="email" type="email" />
              {location.pathname !== '/update-password' && (
                <CustomInput label="Password" name="password" type="password" />
              )}
              {location.pathname === '/signup' && (
                <div className="mb-4">
                  <label className="block mb-1">
                    <input type="checkbox" name="role" value="admin" />
                    Register as admin
                  </label>
                </div>
              )}
              <button
                type="submit"
                className="bg-main-purple text-sm font-semibold text-white px-4 py-2 w-full rounded"
                disabled={isSubmitting}
              >
                {buttons[pageType]}
              </button>
              {location.pathname === '/signin' && <SignInLinks />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;