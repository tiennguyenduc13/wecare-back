import express from "express";
import _ from "lodash";
import Cart from "../models/Cart";
import Order from "../models/Order";

const orderRoutes = express.Router();

orderRoutes.route("/listByUserId").get((req, res) => {
  const userId = req.params.userId;
  let filter = {};
  if (userId) {
    filter = { userId };
  }
  console.log("Get list orders filter: ", filter);
  Order.find(filter, (err, orders) => {
    if (err) {
      console.log(err);
    } else {
      res.json(orders);
    }
  });
});

orderRoutes.route("/:orderId").get((req, res) => {
  const orderId = req.params.orderId;
  if (orderId) {
    console.log("Find order : ", orderId);
    Order.findById(orderId, (err, order) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Found order : ", order);
        res.json(order);
      }
    });
  } else {
    res.json({});
  }
});

orderRoutes.route("/placeOrder").post((req, res) => {
  //create order from client's cart
  const cart = new Cart(req.body);

  const order = new Order({
    userId: cart.userId,
    userName: cart.userName,
    eventDate: new Date(),
    orderItems: cart.cartItems,
    total: cart.total,
    orderStatus: "received",
  });

  console.log("Adding order ", order);
  order
    .save()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      console.log("Add order err", err);
      res.status(400).send("unable to save to database");
    });
});

// orderRoutes.route("/updateOrder/:userId").post((req, res) => {
//   const userId = req.params.userId;
//   const orderParam = new Order({
//     userId,
//     email: req.body.email,
//     name: req.body.name,
//     cellPhone: req.body.cellPhone,
//     dateOfBirth: req.body.dateOfBirth,
//     gender: req.body.gender,
//   });
//   console.log("Doing updateOrder orderParam", orderParam);
//   Order.findOne({ userId }).then((order) => {
//     console.log("updateOrder found ", order);
//     if (order) {
//       order.email = orderParam.email;
//       order.name = orderParam.name;
//       order.eventDate = util.isNullDate(order.eventDate)
//         ? new Date()
//         : order.eventDate;
//       order.cellPhone = orderParam.cellPhone;
//       order.dateOfBirth = orderParam.dateOfBirth;
//       order.gender = orderParam.gender;
//       console.log("updateOrder save order ", order);
//       // update
//       order
//         .save()
//         .then((resData) => {
//           console.log("updateOrder save order done", resData);
//           res.status(200).json(resData);
//         })
//         .catch((err) => {
//           console.log("Error ", err);
//           res.status(400).send("unable to save to database");
//         });
//     }
//   });
// });

export default orderRoutes;
