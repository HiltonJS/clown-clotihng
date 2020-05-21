const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl1: { type: String, required: true },
  imageUrl2: { type: String, required: true },
  category: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);

// // const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Product {
//   constructor(
//     title,
//     imageUrl1,
//     imageUrl2,
//     price,
//     descripton,
//     category,
//     id,
//     userId
//   ) {
//     this.title = title;
//     this.price = price;
//     this.descripton = descripton;
//     this.imageUrl = imageUrl1;
//     this.imageUrl2 = imageUrl2;
//     this.category = category;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection('product')
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection('product').insertOne(this);
//     }

//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static featchAll() {
//     const db = getDb();
//     return db
//       .collection('product')
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection('product')
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((er) => {
//         console.log(err);
//       });
//   }

//   static deleteProduct(prodId) {
//     const db = getDb();
//     return db
//       .collection('product')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log('deleted');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
