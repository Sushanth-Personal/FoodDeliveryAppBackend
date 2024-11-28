import { useState, useEffect } from "react";
import { useUserContext } from "../Contexts/UserContext";

const useCart = () => {
  const { userId, setCartItems } = useUserContext(); // Get setCartItems from context
  const [cartData, setCartData] = useState([]); // State to store cart data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

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
        setCartData(data.cartItems || []); // Update local cart data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId]);

  // When cartData changes, update the cartItems in context
  useEffect(() => {
    if (cartData.length === 0) return;

    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];

      cartData.forEach((newItem) => {
        const existingItemIndex = updatedItems.findIndex(
          (item) => item.productId === newItem.productId
        );

        if (existingItemIndex !== -1) {
          updatedItems[existingItemIndex] = {
            productId: newItem.productId,
            productName: newItem.productName,
            quantity: newItem.quantity,
            price: newItem.price,
          };
        } else {
          updatedItems.push({
            productId: newItem.productId,
            productName: newItem.productName,
            quantity: newItem.quantity,
            price: newItem.price,
          });
        }
      });

      return updatedItems;
    });
  }, [cartData, setCartItems]);

  // Add a new product to the cart
  const addToCart = async (product) => {
    try {
      // Assuming your backend or logic to add to cart is similar to this
      const response = await fetch(`http://localhost:5000/cart/${userId}?productId=${product._id}`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error adding product to cart");
      }

      const data = await response.json();
      // Update the local state (cartData) after adding the item
      setCartData(data.cartItems);
    } catch (err) {
      setError(err.message);
    }
  };

  return { cartData, loading, error, addToCart };
};

export default useCart;
