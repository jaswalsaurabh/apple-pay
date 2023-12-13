// ApplePayButton.js

import { useEffect } from "react";

const ApplePayButton = ({ onPaymentAuthorized }) => {
  useEffect(() => {
    const button = document.getElementById("apple-pay-button");

    button.addEventListener("click", handleApplePayClick);

    return () => {
      button.removeEventListener("click", handleApplePayClick);
    };
  }, []);

  //   const handleApplePayClick = () => {
  //     // Initialize Apple Pay session and handle events
  //     const paymentRequest = {
  //       countryCode: "US",
  //       currencyCode: "USD",
  //       total: {
  //         label: "Your Product",
  //         amount: "10.00",
  //       },
  //     };

  //     const session = new window.ApplePaySession(1, paymentRequest);

  //     session.onvalidatemerchant = (event) => {
  //       // Send a request to your server to get a merchant session
  //       // Your server should provide a merchant session using the Apple Pay API
  //       const merchantSession = {
  //         /* ... */
  //       };
  //       session.completeMerchantValidation(merchantSession);
  //     };

  //     session.onpaymentauthorized = (event) => {
  //       // Send payment data to your server for processing
  //       const paymentData = event.payment;
  //       // Send paymentData to your server for processing
  //       onPaymentAuthorized(paymentData);
  //       session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
  //     };

  //     session.begin();
  //   };

  const handleApplePayClick = () => {
    const paymentRequest = {
      countryCode: "US",
      currencyCode: "USD",
      total: {
        label: "Your Product",
        amount: "10.00",
      },
      merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
      supportedNetworks: ["amex", "visa", "masterCard"],
    };

    const session = new window.ApplePaySession(1, paymentRequest);

    session.onvalidatemerchant = (event) => {
      // Send a request to your server to get a merchant session
      // Your server should provide a merchant session using the Apple Pay API
      const merchantSession = {
        /* ... */
      };
      session.completeMerchantValidation(merchantSession);
    };

    session.onpaymentauthorized = (event) => {
      // Send payment data to your server for processing
      const paymentData = event.payment;
      // Send paymentData to your server for processing
      onPaymentAuthorized(paymentData);
      session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
    };

    session.begin();
  };

  return <div id="apple-pay-button">Apple Pay</div>;
};

export default ApplePayButton;
