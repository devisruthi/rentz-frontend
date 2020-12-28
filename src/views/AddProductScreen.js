import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SiteInfo from '../components/SiteInfo';
import Footer from '../components/Footer';
import AddProductForm from '../components/AddProductForm';
import SideBar from '../components/SideBar';


function AddProductScreen() {
    return (

        <div className="AddProductScreen">
            <div className="container-fluid">

                <div className="d-flex flex-grow-1">
                {/* <SideBar></SideBar> */}
                <AddProductForm></AddProductForm>
                
                </div>
            </div>
            
        </div>
    );
}

export default AddProductScreen;