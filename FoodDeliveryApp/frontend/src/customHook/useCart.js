import { useState, useEffect } from "react";
import { useUserContext } from "../Contexts/UserContext";

const useCart = () => {
  const { userId, setCartItems } = useUserContext();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchCartData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:5000/cart/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching cart data: ${response.statusText}`);
        }
        const data = await response.json();
        setCartData(data.cartItems || []);
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
      setCartData(data.cartItems);
    } catch (err) {
      setError(err.message);
    }
  };

  return { cartData, loading, error, addToCart, deleteFromCart };
};

export default useCart;
