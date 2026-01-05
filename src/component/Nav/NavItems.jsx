import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ item }) => {
  const dropdownRef = useRef(null);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  useEffect(() => {
    // Check if Bootstrap is loaded from CDN and the element exists
    if (hasSubItems && dropdownRef.current && window.bootstrap) {
      const bsDropdown = new window.bootstrap.Dropdown(dropdownRef.current);
      
      // Cleanup to prevent memory leaks when navigating
      return () => bsDropdown.dispose();
    }
  }, [hasSubItems]);

  if (hasSubItems) {
    return (
      <li className="nav-item dropdown">
        <button 
          ref={dropdownRef} // Tell React to track this element
          className="nav-link dropdown-toggle btn btn-link text-white border-0 py-2 px-3"
          type="button"
          data-bs-toggle="dropdown" 
          aria-expanded="false"
        >
          {item.title}
        </button>
        
        <ul className="dropdown-menu dropdown-menu-dark border-0 shadow-lg">
          {item.subItems.map((sub, index) => (
            <li key={index}>
              <Link className="dropdown-item py-2" to={sub.link}>
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <Link className="nav-link text-white px-3" to={item.link}>
        {item.title}
      </Link>
    </li>
  );
};

export default NavItem;