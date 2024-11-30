import styles from "./paymentpage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import Payment from "./Payment/Payment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {checkAuthentication} from "../../api/api";
import {useUserContext} from "../../Contexts/UserContext";
const PaymentPage = () => {

  const navigate = useNavigate();
  const {setUserId} = useUserContext();

  useEffect(() => {
    checkAuthentication().then((response) => {
      if (!response) {
        navigate("/login");
      }else{
        setUserId(localStorage.getItem("userId"));
      }
    })
  },[]);




  return (
    <section className={styles.paymentPage}>
      <div className={styles.headerDesktopContainer}>
        <HeaderDesktop />
      </div>

      <div className={styles.navBarContainer}>
        <NavBar />
      </div>
      <div className={styles.paymentContainer}>
        <Payment />
      </div>

      <footer>
        <FooterComponent />
      </footer>
    </section>
  );
};

export default PaymentPage;
