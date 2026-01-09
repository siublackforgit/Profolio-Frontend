import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams  } from 'react-router-dom';
import { registerUser, loginEmail, getUserFromToken } from '../features/auth/authAction';
import "../App.css"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    avatarUrl: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth || {});
  const { isLoading, error, isSuccess, message } = authState;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        console.log("Logging in with:", formData.email);
        dispatch(loginEmail({ ...formData }))
      } else {
        dispatch(registerUser({ ...formData }));
      }
    } catch (e) {
      console.log("Failed Login error message:" + e);
    }
  };

  const handleGoogleOauth = () => {
    setIsRedirecting(true);
    window.location.href = process.env.REACT_APP_API_URL+"/oauth2/authorization/google"
  }

  useEffect(() => {
    const tempToken = searchParams.get('tempToken');

    if (tempToken) {
      console.log("Found token:", tempToken);
      dispatch(getUserFromToken(tempToken));

      // Clean the URL so the token isn't reused or leaked in history
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    console.log("reached Auth")
    let timer;
    if (isSuccess) {
      timer = setTimeout(() => {
        navigate('/home');
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{ backgroundColor: '#0F172A' }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-white ps-5 ps-md-5 text-center text-md-start">
            <h1 className="fw-bold mb-4 mb-md-0" style={{ fontSize: '3rem' }}>Welcome to Ricky Profolio</h1>
          </div>

          <div className="col-12 col-md-5">
            <div className="p-5 text-white">
              <h2 className="mb-1 fw-bold">{!isLogin ? "Create your account" : "Sign In"} </h2>
              <p className="text-light text-opacity-75 mb-4">it's just few minutes</p>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-white text-white">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        required
                        className="form-control bg-transparent border-white text-white"
                        placeholder="display name"
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, displayName: e.target.value }));
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-white text-white">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      required
                      className="form-control bg-transparent border-white text-white"
                      placeholder="webmail@email.com"
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-white text-white">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="form-control bg-transparent border-white text-white"
                      placeholder="Password"
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, password: e.target.value }));
                      }}
                    />
                    <button
                      type="button"
                      className="btn bg-transparent border-white text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-100 btn py-2 mb-3"
                  style={{ backgroundColor: '#3B82F6', color: 'white', border: 'none' }}
                >
                  {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Create my account')}
                </button>
              </form>

              {error && <p className="text-danger text-center text-sm">{error}</p>}
              {isSuccess && <p className="text-success text-center text-sm">{message}</p>}

              <div className="text-center mt-4">
                <button
                  onClick={() => handleGoogleOauth()} disabled={isRedirecting}
                  className="text-primary text-decoration-none bg-transparent border-0 p-0 text-red"
                >
                 {isRedirecting ? "Redirecting to Google..." : "Sign in with Google"}
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary text-decoration-none bg-transparent border-0 p-0"
                >
                  {isLogin ? "Don't have an account? Signup" : "Already have an account? Log In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;