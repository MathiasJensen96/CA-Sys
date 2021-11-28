import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar } from "react-bootstrap";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";

function OurNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer exact to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer exact to="/foodfusion">
              <Nav.Link>Foodfusion</Nav.Link>
            </LinkContainer>

            <LinkContainer exact to="/HathawayFoods">
              <Nav.Link>Hathaway Foods</Nav.Link>
            </LinkContainer>

            <LinkContainer exact to="/SugarbeeKitchen">
              <Nav.Link>Sugarbee Kitchen</Nav.Link>
            </LinkContainer>

            <LinkContainer exact to="/Areachops">
              <Nav.Link>Areachops</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer exact to="/Basket">
              <Nav.Link>
                {" "}
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  style={{ color: "white" }}
                />
              </Nav.Link>
            </LinkContainer>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OurNavbar;
