import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../core/actions/authActions/userAction";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoSomething = (routeName) => {
    navigate(routeName);
  };

  const hompage = () => {
    navigate("/");
  };

  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        sticky="top"
      >
        <Container>
          <Navbar.Brand className="brand" onClick={hompage}>
            Proshop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => gotoSomething("/cart")}>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => gotoSomething("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => gotoSomething("/login")}>
                  <i className="fas fa-user"></i> Sign in
                </Nav.Link>
              )}
              {userInfo?.isAdmin && (
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => gotoSomething("/admin/userlist")}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => gotoSomething("/admin/productlist")}
                  >
                    Product List
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => gotoSomething("/admin/orderlist")}
                  >
                    Order List
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
