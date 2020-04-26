import express from "express";
import _ from "lodash";
import Cart from "../models/Cart";
import * as util from "../common/util";

const cartRoutes = express.Router();

cartRoutes.route("/:cartId").get((req, res) => {
  const cartId = req.params.cartId;
  if (cartId) {
    console.log("Find cart : ", cartId);
    Cart.findById(cartId, (err, cart) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Found cart : ", cart);
        res.json(cart);
      }
    });
  } else {
    res.json({});
  }
});

cartRoutes.route("/byUserId/:userId").get((req, res) => {
  const userId = req.params.userId;
  let filter = {};
  if (userId) {
    filter = { userId };
  }
  console.log("Find cart : ", filter);
  Cart.findOne(filter, (err, cart) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Found cart : ", cart);
      res.json(cart);
    }
  });
});

// cartRoutes.route("/add").post((req, res) => {
//   const cart = new Cart(req.body);
//   cart.eventDate = util.isNullDate(cart.eventDate)
//     ? new Date()
//     : cart.eventDate;
//   console.log("Adding cart ", req.body);
//   cart
//     .save()
//     .then((cart) => {
//       res.status(200).json(cart);
//     })
//     .catch((err) => {
//       console.log("Add cart err", err);
//       res.status(400).send("unable to save to database");
//     });
// });

cartRoutes.route("/updateCart/:userId").post((req, res) => {
  const userId = req.params.userId;
  const cartParam = new Cart({
    userId,
    cartItems: req.body.cartItems,
    total: req.body.total,
  });
  console.log("Doing updateCart cartParam", cartParam);
  Cart.findOne({ userId }).then((cart) => {
    console.log("updateCart found ", cart);
    if (cart) {
      cart.cartItems = cartParam.cartItems;
      cart.total = cartParam.total;
      cart.eventDate = util.isNullDate(cart.eventDate)
        ? new Date()
        : cart.eventDate;
      console.log("updateCart save cart ", cart);
      // update
      cart
        .save()
        .then((resData) => {
          console.log("updateCart save cart done", resData);
          res.status(200).json(resData);
        })
        .catch((err) => {
          console.log("Error ", err);
          res.status(400).send("unable to save to database");
        });
    } else {
      //add new cart
      cartParam.eventDate = util.isNullDate(cart.eventDate)
        ? new Date()
        : cart.eventDate;
      console.log("Add cart ", req.body);
      cart
        .save()
        .then((cart) => {
          res.status(200).json(cart);
        })
        .catch((err) => {
          console.log("Add cart err", err);
          res.status(400).send("unable to save to database");
        });
    }
  });
});

// cartRoutes.route("/placeOrder/:userId").post((req, res) => {
//   const userId = req.params.userId;
//   console.log("Doing placeOrder userId", userId);
//   Cart.findOne({ userId }).then((cart) => {
//     console.log("cart found ", cart);
//     if (cart) {
//       cart.eventDate = new Date();

//       console.log("placeOrder for cart ", cart);
//       // update
//       cart
//         .save()
//         .then((resData) => {
//           console.log("updateCart save cart done", resData);

//           //create order for this cart
//           res.status(200).json(resData);
//         })
//         .catch((err) => {
//           console.log("Error ", err);
//           res.status(400).send("unable to save to database");
//         });
//     }
//   });
// });

export default cartRoutes;
