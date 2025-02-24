import React from "react";
import PastOrders from "../Components/PastOrders"; 

import bg2 from "../Content/bg2.jpg";



const OrdersPage = () => {
  return (
    <div style={{  backgroundImage: `url(${bg2})` }} >
            {/* <Header  /> */}

      <PastOrders />
      {/* <Footer/> */}
    </div>
  );
};

export default OrdersPage;
