import styles from "./orderplaced.module.css";
import useCart from "../../../customHook/useCart";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const { cartData: cartItems, loading, error } = useCart();

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.orderPlaced}>
      <div className={styles.mainContent}>
        <img src="/Content.png" alt="content" />
        <div className = {styles.orderListContent}>
          <div className={styles.orderList}>
            <ul>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className={styles.cartItem}>
                    <p>
                      {item.productName}
                    </p>
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
