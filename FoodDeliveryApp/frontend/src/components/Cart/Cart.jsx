import useCart from "../../customHook/useCart";
import styles from "./cart.module.css";
import { useUserContext } from "../../Contexts/UserContext";
import { useRef, useEffect } from "react";
import useDragToScroll from "../../customHook/useDragToScroll";
import { displayImage } from "../../utility/imageProcess";
import useImage from "../../customHook/useImage";
import { useNavigate } from "react-router-dom";
import useAuth from "../../customHook/useAuth";

const Cart = () => {
  useAuth();
  const navigate = useNavigate();
  const { loading, error, deleteFromCart } = useCart();
  const { cartItems, cartTotal, userId, setUserId } =
    useUserContext();
  
  const {
    listRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
  } = useDragToScroll();
  //custom hook
  const imageURLs = useImage("page", "cart","protected");

  const cartRef = useRef(null);

  useEffect(() => {
    console.log(cartTotal);
  }, [cartTotal]);

 useEffect(() => {
  if (!userId) {
    const id = localStorage.getItem("userId");
    if (!id) {
      navigate("/login");
    } else {
      setUserId(id);
      navigate(`/checkout/${id}`); // Navigate directly to the checkout page
    }
  } else {
    navigate(`/checkout/${userId}`); // Navigate directly to the checkout page
  }
}, [userId, navigate]);

  if (loading) return <p>Loading cart data...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (item) => {
    console.log("productid", item);
    deleteFromCart(item);
  };

   // Function to copy link to clipboard
   const copyLinkToClipboard = () => {
    const currentURL = window.location.href;  // Get the full URL of the current page
    navigator.clipboard.writeText(currentURL).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Error copying link: ", err);
      }
    );
  };
  

  return (
    <section ref={cartRef} className={styles.cart}>
      <div className={styles.copyLink}>
        <img
          id="cart-copylink-sharecart-1"
          src={displayImage(imageURLs, "cart-copylink-sharecart-1")}
          alt="sharecart"
        />
        <p>Share this cart with your friends</p>
        <button onClick={copyLinkToClipboard}>Copy link</button>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <img
            id="cart-header-basketicon-1"
            src={displayImage(imageURLs, "cart-header-basketicon-1")}
            alt="Basket Icon"
          />
          <p>My Basket</p>
        </div>
        <div className={styles.cartItems}>
          <ul
            ref={listRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <li key={item._id}>
                  {item.quantity > 0 && (
                    <>
                      <div className={styles.quantity}>
                        {item.quantity}x
                      </div>
                      <div className={styles.content}>
                        <p>₹{item.price * item.quantity}</p>
                        <h1>{item.productName}</h1>
                      </div>
                      <img
                        role="button"
                        onClick={() => handleDelete(item)}
                        className={styles.remove}
                        id="cart-item-remove-1"
                        src={displayImage(
                          imageURLs,
                          "cart-item-remove-1"
                        )}
                        alt="Remove Item"
                      />
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className={styles.summary}>
          <div className={styles.costs}>
            <p>Sub Total: </p>
            <p>Discounts:</p>
            <p>Delivery Fee:</p>
          </div>
          <div className={styles.values}>
            <p>{cartTotal}</p>
            <p>-₹3.00</p>
            <p>₹3.00</p>
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.total}>
            <p>Total to pay</p>
            <p className={styles.totalValue}>{`₹${cartTotal}`}</p>
          </div>
          <div className={styles.button}>
            <p>Choose your free item..</p>
            <img
              id="cart-total-downarrow-1"
              src={displayImage(imageURLs, "cart-total-downarrow-1")}
              alt="downarrow"
            />
          </div>
          <div className={styles.button}>
            <p>Apply Coupon Code here</p>
            <img
              id="cart-total-rightarrow-1"
              src={displayImage(imageURLs, "cart-total-rightarrow-1")}
              alt="rightarrow"
            />
          </div>
        </div>
        <div className={styles.checkoutContainer}>
          <div className={styles.deliveryContainer}>
            <div className={styles.deliver}>
              <img
                id="cart-delivery-scooter-1"
                src={displayImage(
                  imageURLs,
                  "cart-delivery-scooter-1"
                )}
                alt="scooter"
              />
              <h1>Delivery</h1>
              <p>Starts at 17:50</p>
            </div>
            <div className={styles.collection}>
              <img
                id="cart-collection-store-1"
                src={displayImage(
                  imageURLs,
                  "cart-collection-store-1"
                )}
                alt="store"
              />
              <h1>Collection</h1>
              <p>Starts at 16:50</p>
            </div>
          </div>
          {cartTotal > 20 && (
            <button
              onClick={() => navigate("/checkout/" + userId)}
              className={styles.checkout}
            >
              <img
                className={styles.rightarrow}
                id="cart-checkout-rightarrow-1"
                src={displayImage(
                  imageURLs,
                  "cart-checkout-rightarrow-1"
                )}
                alt="rightarrow"
              />
              <img
                id="cart-checkout-tooltip-1"
                className={styles.toolTip}
                src={displayImage(
                  imageURLs,
                  "cart-checkout-tooltip-1"
                )}
                alt="tooltip"
              />
              Checkout!
            </button>
          )}
          {cartTotal < 20 && (
            <button
              style={{ backgroundColor: "#FFB1B1" }}
              className={styles.checkout}
            >
              <img
                className={styles.rightarrow}
                id="cart-checkout-rightarrow-1"
                src={displayImage(
                  imageURLs,
                  "cart-checkout-rightarrow-1"
                )}
                alt="rightarrow"
              />
              <img
                id="cart-checkout-tooltip-2"
                className={styles.toolTip}
                src={displayImage(
                  imageURLs,
                  "cart-checkout-tooltip-2"
                )}
                alt="tooltip"
              />
              Checkout!
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
