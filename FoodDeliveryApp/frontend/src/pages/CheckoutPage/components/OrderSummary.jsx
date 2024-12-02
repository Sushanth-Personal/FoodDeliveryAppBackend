import styles from "./ordersummary.module.css";
import { useState, useEffect } from "react";
import useCart from "../../../customHook/useCart";
import { getImageByProductIdArray } from "../../../api/api";
import useImage from "../../../customHook/useImage";
import useScreenSize from "../../../customHook/useScreenSize";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../../Contexts/UserContext"; // Import setCartTotal

const OrderSummary = () => {
  const navigate = useNavigate();
  const isMobile = useScreenSize(768);
  const { cartData: cartItems, loading, error } = useCart();
  const [productImageURLs, setProductImageURLs] = useState({});
  const placeholder = useImage("id", "popularrestaurants-content-mcdonalds-1");
  const { setCartTotal } = useUserContext(); // Access setCartTotal

  useEffect(() => {
    const fetchImages = async () => {
      if (cartItems.length === 0) return;
      const productIds = cartItems.map((item) => item.productId);
      try {
        const response = await getImageByProductIdArray(productIds);
        console.log("responseOrdersummary", response);
        setProductImageURLs(response);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, [cartItems]);

  // Calculate cart total
  useEffect(() => {
    const cartTotal = cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1; // Add 10% sales tax
    setCartTotal(cartTotal.toFixed(2)); // Set the cart total
  }, [cartItems, setCartTotal]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.orderSummary}>
      {!isMobile ? (
        <div className={styles.header}>
          <img
            role="button"
            onClick={() => window.history.back()}
            src="/backarrow.png"
            alt="backarrow"
          />
          <h1>Your Order Details</h1>
        </div>
      ) : (
        <div className={styles.header}>
          <img
            role="button"
            onClick={() => window.history.back()}
            src="/colorback.png"
            alt="colorback"
          />
          <h1>Checkout</h1>
        </div>
      )}

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.productId}>
                {console.log("item", item)}
                <div className={styles.item}>
                  <img
                    src={productImageURLs[index] || placeholder.imageURL}
                    alt={item.productName}
                  />
                  <h1>
                    {item.productName}
                    <p>{item.quantity}x item</p>
                  </h1>
                </div>
                <p className={styles.itemPrice}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className={styles.notesContainer}>
            <label htmlFor="notes">Notes</label>
            <input type="text" placeholder="Add order notes" />
          </div>
        </div>
        <div className={styles.rightContent}>
          {isMobile && <h3>Deliver Address</h3>}
          <div className={styles.address}>
            <div>
              <img
                className={styles.locationImage}
                src="/location.png"
                alt="location"
              />
              <img
                className={styles.addressImage}
                src="/address.png"
                alt="address"
              />
            </div>
            <div>
              <img
                className={styles.arrowImage}
                src="/rightarrow.png"
                alt="rightarrow"
              />
            </div>
          </div>
          <div className={styles.summary}>
            <span>
              <p>Items</p>
              <p>
                ₹
                {cartItems
                  .reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </span>
            <span>
              <p>Sales Tax</p>
              <p>
                ₹
                {(
                  cartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  ) * 0.1
                ).toFixed(2)}
              </p>
            </span>
          </div>
          <span className={styles.subTotal}>
            <h1>Subtotal ({cartItems.length} items)</h1>
            <p className={styles.amount}>
              ₹
              {cartItems
                .reduce(
                  (sum, item) => sum + item.price * item.quantity * 1.1,
                  0
                )
                .toFixed(2)}
            </p>
          </span>
          <button onClick={() => navigate("/payment")}>Choose Payment Method</button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
