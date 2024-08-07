import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import {signOutUser} from "../../utils/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser} = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)

  const signOutHandler = async () =>{
    await signOutUser();    
  }
    return (
      <Fragment>
          <div className="navigation">
            <Link className="logo-container" to="/">
              <CrwnLogo className="logo"/>
            </Link>   
            <div className="nav-links-container">
              <Link className="nav-link" to="/shop">
                SHOP
              </Link>
              { currentUser ? <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>:
                <Link className="nav-link" to="/auth">SIGN-IN</Link>            
              }
            </div>
            <CartIcon/>
          </div>  
          {isCartOpen && <CartDropdown/>}
          <Outlet/>
      </Fragment>
    )
  };
export default Navigation;