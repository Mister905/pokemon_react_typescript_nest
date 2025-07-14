import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks';
import { useRedirectIfAuthenticated, useApiWithLoading, useMaterializeInit } from '../../hooks';
import Preloader from '../Preloader';
import './Login.styles.scss';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { loading: authLoading } = useRedirectIfAuthenticated();
  const { post } = useApiWithLoading();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Initialize Materialize components
  useMaterializeInit();

  const initialValues: LoginFormValues = {
    username: '',
    password: ''
  };

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the state to prevent showing the message again on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);



  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must be at most 50 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be at most 100 characters')
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);

    try {
      const response = await post<{ access_token: string; user: any }>('/auth/login', values, {
        showLoading: true,
        loadingMessage: 'Signing in...'
      });
      const { access_token, user } = response;
      
      // Use the auth context to login
      login(access_token, user);
      
      // Redirect to intended destination or home page
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  if (authLoading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <Preloader size="big" color="blue" />
            <p className="center-align grey-text">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <div className="card-panel">
            <div className="center-align">
              <h4 className="teal-text text-darken-2">Login</h4>
              <p className="grey-text">Welcome back! Please sign in to your account.</p>
            </div>

            {successMessage && (
              <div className="card-panel green lighten-4 green-text text-darken-4">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="card-panel red lighten-4 red-text text-darken-4">
                {error}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <div className="row">
                    <div className="input-field col s12">
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        className="validate"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="username">Username</label>
                      <ErrorMessage name="username" component="span" className="red-text text-darken-1" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="validate"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="password">Password</label>
                      <ErrorMessage name="password" component="span" className="red-text text-darken-1" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <button
                        type="submit"
                        className={`btn-system btn-success col s12 ${
                          isSubmitting ? 'btn-loading' : ''
                        }`}
                        disabled={isSubmitting || !isValid || !dirty}
                      >
                        {isSubmitting ? (
                          <>
                            <i className="material-icons">hourglass_empty</i>
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <>
                            <i className="material-icons">input</i>
                            <span>Sign In</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="row center-align">
              <div className="col s12">
                <p className="grey-text">
                  Don't have an account?{' '}
                  <Link to="/register" className="teal-text text-darken-2">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
