import React from 'react'
import { useContext } from 'react';
import { ProductContext } from '../../context/products.context';
import ProductCard  from "../../components/product-card/product-card.component"
import './shop.styles.scss';

const Shop = () => {
  const {products} = useContext(ProductContext);
  console.log("products = ",products);
  return (
    <div className='products-container'>
      {products.map( (product) => (
          <ProductCard key={product.key} product={product}/>
      ))}
    </div>
  )
}

export default Shop;
