import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { logOut } from '../features/auth/authAction';
import Navbar from '../component/Nav/Navbar';
import menuData from '../data/MenuData';

const HomePage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth || {});
  const { user } = authState;

  useEffect(() => {
    
    let timer;
    console.log("user",user);
    if (user == null) {
      timer = setTimeout(() => {
        navigate('/auth');
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: '#0F172A' }}>
      <div className="container text-white">
        <div className="row align-items-center g-3">

          <div className="col-12 col-md-auto text-center text-md-start">
            <i className="bi bi-house-door" style={{ fontSize: '2rem' }}></i>
          </div>

          <div className="col-12 col-md-auto fs-5 fw-semibold text-center text-md-start">
            {user?.displayName
              ? `Welcome, ${user.displayName} to Ricky Portfolio`
              : "Welcome to Ricky Portfolio"}
          </div>

          <div className="col-12 col-md">
            <Navbar data={menuData} />
          </div>

          <div className="col-12 col-md-auto text-center text-md-end">
            <button
              onClick={() => dispatch(logOut())}
              className="btn btn-secondary btn-sm d-inline-flex align-items-center shadow-sm"
              style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>

        </div>

        <hr className="my-4 opacity-25" />
      </div>
    </div>
  )
}

export default HomePage