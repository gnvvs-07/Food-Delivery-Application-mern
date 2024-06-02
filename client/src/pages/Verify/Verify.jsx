import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useEffect } from "react";
import axios from "axios";

export default function Verify() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/paymentfailed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/paymentfailed");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}
