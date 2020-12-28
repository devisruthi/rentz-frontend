import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SiteInfo from '../components/SiteInfo';
import Footer from '../components/Footer';

function HomeScreen() {
  return (
    
    <div className="HomeScreen">
      <SiteInfo></SiteInfo>
      <ProductGrid></ProductGrid>
      <Footer></Footer>
    </div>
  );
}

export default HomeScreen;