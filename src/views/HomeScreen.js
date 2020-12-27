import React, { useContext } from 'react';
import ProductGrid from '../components/ProductGrid';
import SiteInfo from '../components/SiteInfo';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import SideBar from '../components/SideBar';

function HomeScreen() {
  const [globalState, setGlobalState] = useContext(AppContext);

  return (
    <div className="HomeScreen">

      {globalState.loggedIn ?
        <React.Fragment>
          <div className="container-fluid">
            <div className="d-flex flex-grow-1">
              <SideBar></SideBar>
              <ProductGrid></ProductGrid>
            </div>
          </div>
          <Footer></Footer>
        </React.Fragment> :

        <React.Fragment>
          <SiteInfo></SiteInfo>
          <ProductGrid></ProductGrid>
          <Footer></Footer>
        </React.Fragment>
      }
    </div>
  );
}

export default HomeScreen;