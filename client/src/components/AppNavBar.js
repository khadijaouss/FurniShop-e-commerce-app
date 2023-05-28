import React , {Component} from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap' ; 
import logo from '../assets/images/logo.png';
class AppNavBar extends Component {

    state = { isOpen : false }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        });
    }

    render(){
        return(
            <div>
                <Navbar color='white' dark expand="md" className='mb-5 my-navbar'>
                    <Container >
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <NavbarBrand href="/"><img src={logo} alt="FurniShop" style={{marginLeft: -130}}/></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        
                            <Nav className='ms-auto' navbar>
                                <NavItem className="nav-item">
                                  <NavLink href='/'style={{color: 'black'}}>HOME</NavLink>
                                </NavItem >
                                <NavItem className="nav-item">
                                  <NavLink href='/' style={{color: 'black'}}>ABOUT</NavLink>
                                </NavItem>
                                <NavItem className="nav-item">
                                  <NavLink href='/' style={{color: 'black'}}>CONTACT</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }

}

export default AppNavBar;