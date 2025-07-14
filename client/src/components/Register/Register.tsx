import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRedirectIfAuthenticated, useApiWithLoading, useMaterializeInit } from '../../hooks';
import Preloader from '../Preloader';
import './Register.styles.scss';

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { loading: authLoading } = useRedirectIfAuthenticated();
  const { post } = useApiWithLoading();
  const [error, setError] = useState<string | null>(null);
  
  // Initialize Materialize components
  useMaterializeInit();

  const initialValues: RegisterFormValues = {
    username: '',
    password: '',
    confirmPassword: '',
    name: ''
  };



  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must be at most 50 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be at most 100 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    name: Yup.string()
      .max(100, 'Name must be at most 100 characters')
      .optional()
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    setError(null);

    try {
      const { confirmPassword, ...registerData } = values;
      await post('/auth/register', registerData, {
        showLoading: true,
        loadingMessage: 'Creating account...'
      });
      
      // Show success message and redirect to login
      setError(null);
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please log in with your new account.' 
        } 
      });
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError('Username already exists');
      } else {
        setError('Registration failed. Please try again.');
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
              <h4 className="teal-text text-darken-2">Create Account</h4>
              <p className="grey-text">Join us and start your Pokemon journey!</p>
            </div>

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
                      <label htmlFor="username">Username *</label>
                      <ErrorMessage name="username" component="span" className="red-text text-darken-1" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className="validate"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="name">Full Name (Optional)</label>
                      <ErrorMessage name="name" component="span" className="red-text text-darken-1" />
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
                      <label htmlFor="password">Password *</label>
                      <ErrorMessage name="password" component="span" className="red-text text-darken-1" />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="validate"
                        disabled={isSubmitting}
                      />
                      <label htmlFor="confirmPassword">Confirm Password *</label>
                      <ErrorMessage name="confirmPassword" component="span" className="red-text text-darken-1" />
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
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <i className="material-icons">person_add</i>
                            <span>Create Account</span>
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
                  Already have an account?{' '}
                  <Link to="/login" className="teal-text text-darken-2">
                    Sign in here
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

export default Register;
