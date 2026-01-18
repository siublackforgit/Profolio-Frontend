import React from 'react';

const LoadingSpinner = ({ size = "20px", color = "#FFFFFF" }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `3px solid rgba(255, 255, 255, 0.2)`,  
    borderTop: `3px solid ${color}`,             
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
    </>
  );
};

export default LoadingSpinner;