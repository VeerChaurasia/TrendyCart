import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';

export const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();

  // console.log(all_product);  /// Debug: Check all products data
  // console.log(productId);    // Debug: Check productId from URL
  const product = all_product.find((e) => e.id === Number(productId));
  // console.log(product);      // Debug: Check the found product

  // if (!product) {
  //   return <div>Product not found</div>;  // Handle product not found
  // }

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  );
};
