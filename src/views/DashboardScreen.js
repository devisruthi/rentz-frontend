import React, { useContext } from 'react';
import ProductGrid from '../components/ProductGrid';
import UserProductGrid from '../components/UserProductsGrid';
import SiteInfo from '../components/SiteInfo';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';
import SideBar from '../components/SideBar';
import WelcomeInfo from '../components/WelcomeInfo';

function DashboardScreen() {
  const [globalState, setGlobalState] = useContext(AppContext);

  return (
    <div className="DashboardScreen">

      {globalState.loggedIn ?
        <React.Fragment>

              {/* <SideBar></SideBar> */}
              <WelcomeInfo></WelcomeInfo>
              <UserProductGrid></UserProductGrid>
         
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

export default DashboardScreen;