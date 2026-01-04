import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
  const authState = useSelector((state) => state.auth || {});
  const { user } = authState;
  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: '#0F172A' }}>
        <div className="container text-white">
            <div className="row align-items-center">
               <div className="col-12 col-md-auto text-center text-md-start mb-3 mb-md-0">
                    <i className="bi bi-house-door" style={{ fontSize: '2rem' }}></i>
                </div>

              <div className="col-12 col-md">
                {user?.displayName 
                  ? `Welcome, ${user.displayName} to Ricky Profolio` 
                  : "Welcome to Ricky Profolio"}
              </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage