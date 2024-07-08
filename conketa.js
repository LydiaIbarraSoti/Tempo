// import { CustomersApi, Configuration, Customer, CustomerResponse } from "conekta";

// const apikey = "key_Jd4mWh6tleGJqNIKMsGcdti";
// const config = new Configuration({ accessToken: apikey });
// const client = new CustomersApi(config);

// const customer: Customer = {
//   name: "John Constantine",
//   email: "frank@google.com",
//   phone: "+5215555555555"
// }

// client.createCustomer(customer).then(response => {
//   const customerResponse = response.data as CustomerResponse;
//   console.log(customerResponse.id);
// }).catch(error => {
//   console.error("here", error);
// });