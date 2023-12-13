import ApplePayButton from "./AppleButton";

const App = () => {
  const handlePaymentAuthorized = (paymentData) => {
    // Handle the payment authorization data, e.g., send it to your server
    console.log("Payment authorized:", paymentData);
    // You can make an API call to your server to process the paymentData
    // axios.post('/your-payment-endpoint', { paymentData })
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
  };
  return (
    <div>
      <div className="App">
        {/* Other components */}
        <ApplePayButton onPaymentAuthorized={handlePaymentAuthorized} />
      </div>
    </div>
  );
};

export default App;
