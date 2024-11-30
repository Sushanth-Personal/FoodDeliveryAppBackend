import { Link } from "react-router-dom";
import styles from "./errorpage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorTitle}>Invalid URL</h1>
      <p className={styles.errorMessage}>
        The URL you entered is invalid. Please check and try again.
      </p>
      <Link to="/" className={styles.homeButton}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
