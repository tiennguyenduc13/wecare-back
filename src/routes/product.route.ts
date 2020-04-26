import express from "express";
import _ from "lodash";
import Product from "../models/Product";

const productRoutes = express.Router();

productRoutes.route("/").get((req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.log(err);
    } else {
      res.json(products);
    }
  });
});

productRoutes.route("/:productId").get((req, res) => {
  const productId = req.params.productId;
  if (productId) {
    console.log("Find product : ", productId);
    Product.findById(productId, (err, product) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Found product : ", product);
        res.json(product);
      }
    });
  } else {
    res.json({});
  }
});

export default productRoutes;
