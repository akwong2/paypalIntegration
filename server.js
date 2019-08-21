const express = require("express");
const bodyParser = require("body-parser");
const paypal = require("paypal-rest-sdk");

const clientId = "AUC5iD4JH3n2AdxNXG4hhttW4-7EsobiMal1VH94o9_TmyBOyXRB-tP5UG_3HMhONjXPo_xCDYtBC6P1";
const secret = "EJdcaRzu4kr5A5p17ZKVl434U_RCB0TYVd7-jZhctNMW3wsSfieDYr7jDju76i0WMMfvJ0j7ltXEjXwU";

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': clientId,
  'client_secret': secret
});

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.render("index"));

app.post("/payment", (req, res) => {
  let create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:5000/success?price=" + req.body.total,
      "cancel_url": "http://localhost:5000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "item",
          "sku": "item",
          "price": req.body.total,
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": req.body.total
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.redirect("http://localhost:3000/cancel")
    } 
    else {
      for (let i = 0; i < payment["links"].length; i++) {
        if (payment["links"][i]["rel"] === "approval_url") {
          res.send(payment["links"][i]["href"]); // sends url to paypal
        }
      }
    }
  });
})

app.get('/success', (req, res) => {
  let paymentId = req.query.paymentId;
  let PayerID = req.query.PayerID;
  let price = req.query.price;
  const execute_payment_json = {
    "payer_id": PayerID,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": price
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (err, payment) => {
    if (err) {
      console.log("Payment Failed");
      res.redirect('http://localhost:3000/cancel');
    }
    else {
      console.log("Payment Successful");
      res.redirect('http://localhost:3000/success');
    }
  })
})

app.get('/cancel', (req, res) => {
  res.redirect('http://localhost:3000/cancel');
})

app.listen(port, () => {console.log("Server Started: " + port)});
