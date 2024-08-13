import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {  
  const existingCartItem = cartItems.find(
    (cartItem) => {          
      return (parseInt(cartItem.product.id) === parseInt(productToAdd.product.id))
    }   
  );  

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product.id === productToAdd.product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.product.id === cartItemToRemove.product.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.product.id !== cartItemToRemove.product.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.product.id === cartItemToRemove.product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.product.id !== cartItemToClear.product.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.product.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);


  const addItemToCart = (product) => {    
    setCartItems(addCartItem(cartItems, product));
  }
    
 const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart, 
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};