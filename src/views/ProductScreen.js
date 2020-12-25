import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SiteInfo from '../components/SiteInfo';
import Footer from '../components/Footer';

function ProductScreen() {
  return (
    
    <div className="ProductScreen">
      <SiteInfo></SiteInfo>
      <ProductGrid></ProductGrid>
      <Footer></Footer>
    </div>
  );
}

export default ProductScreen;