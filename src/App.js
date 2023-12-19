import React from "react";
import ProductsCard from "./components/ProductsCard/index.jsx";

const App = () => {
    return (
        <div style={{height: '100%'}}>
            <div className="productCardWrapper">
                <ProductsCard/>
            </div>
        </div>
    );
};

export default App;
