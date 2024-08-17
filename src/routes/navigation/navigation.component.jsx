import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import {signOutUser} from "../../utils/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,} from './navigation.styles.jsx';

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)

  const signOutHandler = async () =>{
    await signOutUser();    
  }
    return (
      <Fragment>
          <NavigationContainer>
            <LogoContainer to="/">
              <CrwnLogo className="logo"/>
            </LogoContainer>   
            <NavLinks>
              <NavLink to="/shop">
                SHOP
              </NavLink>
              { currentUser ? <NavLink as="span" onClick={signOutHandler}>SIGN OUT</NavLink>:
                <NavLink to="/auth">SIGN-IN</NavLink>            
              }
            </NavLinks>
            <CartIcon/>
          </NavigationContainer>  
          {isCartOpen && <CartDropdown/>}
          <Outlet/>
      </Fragment>
    )
  };
export default Navigation;