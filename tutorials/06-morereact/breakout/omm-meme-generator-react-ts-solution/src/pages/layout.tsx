import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="App">
        <header>
          <h1>MemeMUC - React</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/histories">Histories</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
