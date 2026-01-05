import NavItems from "./NavItems";

const Navbar = ({ data }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#portfolioNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="portfolioNav">
          <ul className="navbar-nav w-100 d-flex flex-column flex-md-row">
            {data.map((item, index) => (
              <NavItems key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;