import styles from "./orderplaced.module.css";
import useCart from "../../../customHook/useCart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useImage from "../../../customHook/useImage";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const { cartData: cartItems, loading, error } = useCart();
  const image = useImage(
    "id",
    "orderplaced-maincontent-content-1"
  ).imageURL;
  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.orderPlaced}>
      <div className={styles.mainContent}>
        <img
          id="orderplaced-maincontent-content-1"
          src={image}
          alt="content"
        />
        <div className={styles.orderListContent}>
          <div className={styles.orderList}>
            <ul>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className={styles.cartItem}>
                    <p>{item.productName}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    </section>
  );
};

export default OrderPlaced;
