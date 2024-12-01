import { useState, useEffect } from "react";
import { useUserContext } from "../Contexts/UserContext";

const useCart = () => {
  const { userId, setCartItems, setCartTotal } = useUserContext();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

   
    let id=userId.userId;
    if (!id){
      id=localStorage.getItem("userId");
    }

    const fetchCartData = async () => {
      try {
        
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/cart/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching cart data: ${response.statusText}`);
        }
        const data = await response.json();
        let sumTotal = data.cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
        sumTotal = parseFloat(sumTotal.toFixed(2));
        setCartTotal(sumTotal);
        setCartData(data.cartItems || []);
        console.log("cartData", data.cartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId]);

  // Sync cartData with setCartItems
  useEffect(() => {
    setCartItems(cartData);
  }, [cartData, setCartItems]);

  const addToCart = async (product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/${userId}?productId=${product._id}`,
        {
          method: "POST",
          body: JSON.stringify(product),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Error adding product to cart");
      }

      const data = await response.json();
      let sumTotal = data.cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
      sumTotal = parseFloat(sumTotal.toFixed(2));
      setCartTotal(sumTotal);
      setCartData(data.cartItems);

    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFromCart = async (product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/${userId}?productId=${product.productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting product from cart");
      }

      const data = await response.json();
      let sumTotal = data.cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
      sumTotal = parseFloat(sumTotal.toFixed(2));
      setCartTotal(sumTotal);
      setCartData(data.cartItems);
    } catch (err) {
      setError(err.message);
    }
  };

  return { cartData, loading, error, addToCart, deleteFromCart };
};

export default useCart;
