import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { translateName } from "../../utils/translations";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>Pedidos</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return translateName(item.name) + " X " + item.quantity;
                  } else {
                    return translateName(item.name) + " X " + item.quantity + ",";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>productos: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {{ "Food Processing": "En preparación", "Out for delivery": "En reparto", "Delivered": "Entregado" }[order.status] || order.status}</b>
              </p>
              <button onClick={fetchOrders}>Seguir pedido</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
