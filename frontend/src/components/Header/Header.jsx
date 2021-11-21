import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const gotoSomething = (routeName) => {
    navigate(routeName);
  };

  const hompage = () => {
    navigate("/");
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

              <Nav.Link onClick={() => gotoSomething("/login")}>
                <i className="fas fa-user"></i> Sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// {
//   /* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
// <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.2">
//   Another action
// </NavDropdown.Item>
// <NavDropdown.Item href="#action/3.3">
//   Something
// </NavDropdown.Item>
// <NavDropdown.Divider />
// <NavDropdown.Item href="#action/3.4">
//   Separated link
// </NavDropdown.Item>
// </NavDropdown> */
// }
