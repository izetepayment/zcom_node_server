import { Prisma, PrismaClient } from "@prisma/client";
import express from 'express'
import cors from "cors"
import https from 'https';
import multer from 'multer';
import fs from 'fs'
import moment from 'moment-timezone'

var path = require('path');
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true, }))
var router = express.Router();
//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "networkgroups.in",
  preflightContinue: false,
};
router.use(cors(options));
router.options('*', cors(options));

app.get("/health_check", (_, res) => {
  res.status(200).end();
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test API is working!' });
});

const SAdminJwt = "Bearer 5e4aba774effe088d9cd99c434c0f240"

app.post('/zcom/admin_register', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header("jwt")
  var name = req.body.name
  var phone = req.body.phone
  var email = req.body.email
  var password = req.body.password
  var address = req.body.address
  console.log(jwt)
  console.log(req.body)
  if (jwt == SAdminJwt) {
    if (name && phone && email && password && address) {
      const resultUser = await prisma.zcom_admin.findFirst({
        where: { phone: phone }
      });
      if (!resultUser) {
        const authkey = require('crypto').randomBytes(16).toString('hex')
        const result = await prisma.zcom_admin.create({
          data: { aId: "-", name: name, phone: phone, email: email, password: password, address: address, auth_key: authkey }
        });
        if (result) {
          const resultUpdate = await prisma.zcom_admin.update({
            where: { id: result.id },
            data: { aId: "S00" + result.id + "" }
          });
          res.json({ "data": resultUpdate, "message": "Sub Admin successfully created", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      } else {
        res.json({ "message": "Phone number is already in use. current user", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/admin', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header("jwt")
  var aId = req.body.aId
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  var address = req.body.address
  var id = req.body.id
  console.log(req.body)
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_admin.update({
        where: { id: Number(id) },
        data: { aId: aId, name: name, email: email, password: password, address: address }
      });
      if (result) {
        res.json({ "message": "Admin successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.post('/zcom/login', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header("jwt");
  var phone = req.body.mobile
  var password = req.body.password
  console.log(jwt)
  console.log(req.body)
  if (jwt == SAdminJwt) {
    if (phone && password) {
      if (phone == "9876543210" && password == "12345678") {
        res.json({ "name": "SAdmin", "authKey": "", "role": "superAdmin", "message": "Welcome to zcom.", "success": true });
      } else {
        const result = await prisma.zcom_admin.findFirst({
          where: { phone: phone }
        });
        if (result) {
          const resultPassword = await prisma.zcom_admin.findFirst({
            where: { AND: [{ phone: phone }, { password: password }] }
          });
          if (resultPassword) {
            console.log(resultPassword.auth_key)
            res.json({ name: resultPassword.name, "authKey": resultPassword.auth_key, "role": "subAdmin", "message": "Welcome to zcom.", "success": true });
          } else {
            res.json({ "message": "Unauthorized credential", "success": false });
          }
        } else {
          res.json({ "message": "User not found.", "success": false });
        }
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/admin', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header("jwt");
  var id = req.query.id
  var phone = req.query.phone
  // console.log(req.query)
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_admin.findMany({
      where: { AND: [id ? { id: Number(id) } : {}, phone ? { phone: phone + "" } : {}] },
      orderBy: { id: "asc" },
    });
    if (result) {
      res.json({ "data": result, "message": "successfully Fetched.", "success": 1 });
    } else {
      res.json({ "message": "No admin found.", "success": 0 });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/admin', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  console.log(jwt)
  console.log(req.query)
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_admin.deleteMany({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "Admin successfully deleted.", "success": true });
      } else {
        res.json({ "message": "No admin found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

// app.post('/zcom/user_register', async (req, res) => {
  // await executeLatinFunction()
//   var name = req.body.name
//   var cc = req.body.cc
//   var phone = req.body.phone
//   var email = req.body.email
//   var password = req.body.password
//   var otp = Math.floor(1000 + Math.random() * 9000);
//   console.log(req.body)
//   if (name && cc && phone && email && password) {
//     const resultUser = await prisma.zcom_user.findFirst({
//       where: { phone: phone }
//     });
//     if (!resultUser) {
//       const authkey = require('crypto').randomBytes(16).toString('hex')
//       const result = await prisma.zcom_user.create({
//         data: { name: name, cc: cc, phone: phone, email: email, password: password, otp: otp + "", auth_key: authkey }
//       });
//       if (result) {
//         res.json({ "message": "OTP: " + result.otp, "success": true })
//       } else {
//         res.json({ "message": "Oops! An error occurred.", "success": false })
//       }
//     } else {
//       const oldUser = await prisma.zcom_user.findFirst({
//         where: { phone: phone }
//       });
//       if (oldUser.status == "created") {
//         res.json({ "message": "OTP: " + oldUser.otp, "success": true })
//       } else {
//         res.json({ "message": "Phone number is already in use. current user", "success": false })
//       }
//     }
//   } else {
//     res.json({ "message": "Required fields missing", "success": false });
//   }
// })

app.post('/zcom/user_verify_otp', async (req, res) => {
  // await executeLatinFunction()
  var phone = req.body.phone
  var otp = req.body.otp
  console.log(req.body)
  if (phone && otp) {
    const resultUser = await prisma.zcom_user.findFirst({
      where: { phone: phone + "" }
    });
    if (resultUser) {
      const resultOtp = await prisma.zcom_user.findFirst({
        where: { AND: [{ phone: phone + "" }, { otp: otp + "" }] }
      });
      if (resultOtp) {
        const updateUser = await prisma.zcom_user.update({
          where: { id: resultOtp.id },
          data: { otp: otp + "", status: "verified" }
        })
        res.json({ "data": updateUser, "message": "User successfully registered.", "success": true });
      } else {
        res.json({ "message": "Invalid OTP", "success": false });
      }
    } else {
      res.json({ "message": "User not found.", "success": false });
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

// app.post('/zcom/user_login', async (req, res) => {
// await executeLatinFunction()
//   var phone = req.body.phone
//   var password = req.body.password
//   console.log(req.body)
//   if (phone && password) {
//     const result = await prisma.zcom_user.findFirst({
//       where: { AND: [{ phone: phone }, { password: password }] },
//     });
//     if (result) {
//       res.json({ "name": result.name, "phone": result.phone, "userId": result.id, "email": result.email, "message": "Welcome to zcom.", "success": true });
//     } else {
//       res.json({ "message": "Invalid Password.", "success": false });
//     }
//   } else {
//     res.json({ "message": "Required fields missing", "success": false });
//   }
// })

app.post('/zcom/user_login', async (req, res) => {
  // await executeLatinFunction()
  var phone = req.body.phone
  var password = req.body.password
  console.log(req.body)
  if (phone && password) {
    const result = await prisma.zcom_user.findFirst({
      where: { phone: phone }
    });
    if (result) {
      const resultstatus = await prisma.zcom_user.findFirst({
        where: { AND: [{ phone: phone }, { status: "otpVerified" }] }
      });
      if (resultstatus) {
        const resultPassword = await prisma.zcom_user.findFirst({
          where: { AND: [{ phone: phone }, { password: password }] }
        });
        if (resultPassword) {
          res.json({ "data": resultPassword, "message": "Welcome to zcom.", "success": true });
        } else {
          res.json({ "message": "Incorrect password", "success": false });
        }
      } else {
        res.json({ "message": "OTP not confirmed. Verify your OTP before logging in.", "success": false });
      }
    } else {
      res.json({ "message": "User not found.", "success": false });
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

app.get('/zcom/user', async (req, res) => {
  // await executeLatinFunction()
  var id = req.query.id
  var phone = req.query.phone
  console.log(req.query)
  const result = await prisma.zcom_user.findMany({
    where: { AND: [id ? { id: Number(id) } : {}, phone ? { phone: phone + "" } : {}] },
    orderBy: { id: "asc" },
  });
  if (result) {
    res.json({ "data": result, "message": "successfully Fetched.", "success": 1 });
  } else {
    res.json({ "message": "No User found.", "success": 0 });
  }
})

app.delete('/zcom/user', async (req, res) => {
  // await executeLatinFunction()
  var id = req.query.id
  if (id) {
    const result = await prisma.zcom_user.delete({
      where: { id: Number(id) }
    });
    if (result) {
      res.json({ "message": "User successfully deleted.", "success": true });
    } else {
      res.json({ "message": "No user found.", "success": false });
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

app.post('/zcom/categories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var category = req.body.category
  var image = req.body.image
  console.log(req.body)
  if (jwt == SAdminJwt) {
    if (category && image) {
      const result = await prisma.zcom_categories.create({
        data: { category: category, image: image }
      });
      if (result) {
        res.json({ "data": result, "message": "categories successfully created.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/categories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var category = req.body.category
  var image = req.body.image
  var id = req.body.id
  if (jwt == SAdminJwt) {
    console.log(req.body)
    if (id) {
      const result = await prisma.zcom_categories.update({
        where: { id: Number(id) },
        data: { category: category, image: image }
      });
      if (result) {
        res.json({ "message": "categories successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/categories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_categories.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    });
    res.json({ "data": result, "message": "categories successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/categories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (id) {
      const result = await prisma.zcom_categories.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "categories successfully deleted.", "success": true });
      } else {
        res.json({ "message": "No categories found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.post('/zcom/subcategories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var categoryId = req.body.categoryId
  var subCategory = req.body.subCategory
  console.log(req.body)
  if (jwt == SAdminJwt) {
    if (categoryId && subCategory) {
      const result = await prisma.zcom_subcategories.create({
        data: { categoryId: categoryId, subCategory: subCategory }
      });
      if (result) {
        res.json({ "data": result, "message": "Sub categories successfully created.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/subcategories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var categoryId = req.body.categoryId
  var subCategory = req.body.subCategory
  var id = req.body.id
  if (jwt == SAdminJwt) {
    console.log(req.body)
    if (Number(id)) {
      const result = await prisma.zcom_subcategories.update({
        where: { id: Number(id) },
        data: { categoryId: categoryId, subCategory: subCategory }
      });
      if (result) {
        res.json({ "message": "Sub categories successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/subcategories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  console.log(jwt)
  console.log("cat")
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_subcategories.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    });
    res.json({ "data": result, "message": "Sub categories successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/subcategories', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (id) {
      const result = await prisma.zcom_subcategories.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "Sub categories successfully deleted.", "success": true });
      } else {
        res.json({ "message": "No Sub categories found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})
app.get('/zcom/trending_subcat', async (req, res) => {
  await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  console.log(jwt)
  console.log("cat")
  // if (jwt == SAdminJwt) {
  const result = await prisma.zcom_subcategories.findMany({
    where: id ? { id: Number(id) } : {},
    orderBy: { id: "desc" }
  });
  res.json({ "data": result, "message": "Sub categories successfully Fetched.", "success": true });
  // } else {
  //   res.json({ "message": "JWT does not match", "success": false });
  // }
})
app.post('/zcom/stock', async (req, res) => {
  // await executeLatinFunction()
  var vendorId = req.body.vendorId
  var categoryId = req.body.categoryId
  var subcategoryId = req.body.subcategoryId
  var sku = req.body.sku
  var productName = req.body.productName
  var image = req.body.image
  var price = req.body.price
  var strikePrice = req.body.strikePrice
  var qty = req.body.qty
  var discount = req.body.discount
  var coupon = req.body.coupon
  var shipPrice = req.body.shipPrice
  var stockUpdate = req.body.stockUpdate
  var spec = req.body.spec
  var description = req.body.description
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (vendorId && categoryId && subcategoryId && sku && productName && image && price && strikePrice && qty && discount && coupon &&
      shipPrice && stockUpdate && spec) {
      const result = await prisma.zcom_stock.create({
        data: {
          vendorId: vendorId, categoryId: categoryId, subcategoryId: subcategoryId, sku: sku, productName: productName, image: image,
          price: price, strikePrice: strikePrice, qty: qty, discount: discount, coupon: coupon, shipPrice: shipPrice, stockUpdate: stockUpdate,
          spec: spec, description: description
        }
      });
      if (result) {
        res.json({ "data": result, "message": "Product successfully Added.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/stock', async (req, res) => {
  // await executeLatinFunction()
  var vendorId = req.body.vendorId
  var categoryId = req.body.categoryId
  var subcategoryId = req.body.subcategoryId
  var sku = req.body.sku
  var productName = req.body.productName
  var image = req.body.image
  var price = req.body.price
  var strikePrice = req.body.strikePrice
  var qty = req.body.qty
  var discount = req.body.discount
  var coupon = req.body.coupon
  var shipPrice = req.body.shipPrice
  var stockUpdate = req.body.stockUpdate
  var spec = req.body.spec
  var description = req.body.description
  var id = req.body.id
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_stock.update({
        where: { id: Number(id) },
        data: {
          vendorId: vendorId, categoryId: categoryId, subcategoryId: subcategoryId, sku: sku, productName: productName, image: image,
          price: price, strikePrice: strikePrice, qty: qty, discount: discount, coupon: coupon, shipPrice: shipPrice, stockUpdate: stockUpdate,
          spec: spec, description: description
        }
      });
      if (result) {
        res.json({ "message": "Product successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/stock', async (req, res) => {
  // await executeLatinFunction()
  var vendorDet = new Map();
  var categoryDet = new Map();
  var subcatDet = new Map();
  (await prisma.zcom_admin.findMany()).forEach((element) => {
    vendorDet.set(element.id + "", element.name)
  });
  (await prisma.zcom_categories.findMany()).forEach((element) => {
    categoryDet.set(element.id + "", element.category)
  });
  (await prisma.zcom_subcategories.findMany()).forEach((element) => {
    subcatDet.set(element.id + "", element.subCategory)
  });
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    const result = (await prisma.zcom_stock.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    })).map(function (val, index) {
      return {
        "id": val.id,
        "vendor": vendorDet.has(val.vendorId) ? vendorDet.get(val.vendorId) : "NA",
        "category": categoryDet.has(val.categoryId) ? categoryDet.get(val.categoryId) : "NA",
        "subcategory": subcatDet.has(val.subcategoryId) ? subcatDet.get(val.subcategoryId) : "NA",
        "sku": val.sku, "productName": val.productName, "image": val.image, "price": val.price,
        "strikePrice": val.strikePrice, "qty": val.qty, "discount": val.discount, "coupon": val.coupon,
        "shipPrice": val.shipPrice, "stockUpdate": val.stockUpdate, "spec": val.spec,
        "description": val.description, "createdOn": val.createdOn
      }
    });
    res.json({ "data": result, "message": "Product successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/stock', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_stock.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "Product successfully deleted.", "success": true });
      } else {
        res.json({ "message": "No Product found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/feature_product', async (req, res) => {
  // await executeLatinFunction()
  await executeUtfFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  // if (jwt == SAdminJwt) {
  const result = await Promise.all((await prisma.zcom_stock.findMany({
    select: { id: true, productName: true, image: true, price: true, strikePrice: true, rating: true, discount: true, },
    orderBy: { id: "asc" }
  })).map(async function (val, index) {
    const totalreview = await prisma.zcom_rating.count({
      where: { stockId: id + "" }
    })
    return {
      "id": val.id, "productName": val.productName, "image": val.image, "price": val.price,
      "strikePrice": val.strikePrice, "discount": val.discount, "rating": val.rating, "reviews": totalreview
    }
  }));
  res.json({ "data": result, "message": "Product successfully Fetched.", "success": true });
  // } else {
  //   res.json({ "message": "JWT does not match", "success": false });
  // }
})

app.get('/zcom/limited_product', async (req, res) => {
  // await executeLatinFunction()
  await executeUtfFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  var subcategoryId = req.query.subcategoryId
  // if (jwt == SAdminJwt) {
  const result = await Promise.all((await prisma.zcom_stock.findMany({
    where: { subcategoryId: subcategoryId + "" },
    select: { id: true, productName: true, image: true, price: true, strikePrice: true, rating: true, discount: true, },
    orderBy: { id: "asc" }
  })).map(async function (val, index) {
    const totalreview = await prisma.zcom_rating.count({
      where: { stockId: id + "" }
    })
    return {
      "id": val.id, "productName": val.productName, "image": val.image, "price": val.price,
      "strikePrice": val.strikePrice, "discount": val.discount, "rating": val.rating, "reviews": totalreview
    }
  }));
  res.json({ "data": result, "message": "Product successfully Fetched.", "success": true });
  // } else {
  //   res.json({ "message": "JWT does not match", "success": false });
  // }
})

app.post('/zcom/cart', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var userId = req.body.userId
  var userName = req.body.userName
  var phone = req.body.phone
  var email = req.body.email
  var stockId = req.body.stockId
  if (jwt == SAdminJwt) {
    if (userId && userName && phone && email && stockId) {
      const resultfind = await prisma.zcom_cart.findFirst({ where: { userId: userId } });
      if (resultfind) {
        const result = await prisma.zcom_cart.update({
          where: { id: resultfind.id },
          data: { userName: userName, phone: phone, email: email, stockId: stockId }
        });
        if (result) {
          res.json({ "message": "Cart successfully updated.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      } else {
        const result = await prisma.zcom_cart.create({
          data: { userId: userId, userName: userName, phone: phone, email: email, stockId: stockId }
        });
        if (result) {
          res.json({ "message": "Cart successfully created.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.post('/zcom/cart_app', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var userId = req.body.userId
  var userName = req.body.userName
  var phone = req.body.phone
  var email = req.body.email
  var stockId = req.body.stockId
  var isAdd = req.body.isAdd
  if (jwt == SAdminJwt) {
    if (userId && userName && phone && email && stockId) {
      const resultfind = await prisma.zcom_cart.findFirst({ where: { userId: userId } });
      if (resultfind) {
        var proDet = JSON.parse(resultfind.stockId)
        if (isAdd == 'add') {
          proDet.push(stockId)
        } else if (isAdd == 'delete') {
          proDet = proDet.filter((item: { id: any; }) => item.id !== stockId.id);
        } else if (isAdd == 'replace' && proDet.length > 0) {
          try {
            const objectToReplace = proDet.find((arrayItem: { id: any; }) => arrayItem.id === stockId.id);
            Object.assign(objectToReplace, stockId);
          } catch (e) {
            console.log(e)
          }
        }
        const result = await prisma.zcom_cart.updateMany({
          where: { userId: userId },
          data: { userId: userId, userName: userName, phone: phone, email: email, stockId: JSON.stringify(proDet) }
        });
        if (result) {
          res.json({ "message": "Cart successfully updated.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      } else {
        const result = await prisma.zcom_cart.create({
          data: { userId: userId, userName: userName, phone: phone, email: email, stockId: "[" + JSON.stringify(stockId) + "]" }
        });
        if (result) {
          res.json({ "message": "Cart successfully created.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get("/zcom/cart", async (req, res) => {
  // await executeLatinFunction();
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    var userId = req.query.userId
    const result = await prisma.zcom_cart.findFirst({
      where: { userId: userId + "" }
    });
    if (result) {
      res.json({ "data": result, "message": "successfully Fetched.", "success": true });
    } else {
      res.json({ "message": "cart empty", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
});

app.post('/zcom/order', async (req, res) => {
  // await executeLatinFunction()
  var userId = req.body.userId
  var vendorId = req.body.vendorId
  var items = req.body.items
  var sku = req.body.sku
  var category = req.body.category
  var productName = req.body.productName
  var image = req.body.image
  var username = req.body.username
  var phone = req.body.phone
  var email = req.body.email
  var addressId = req.body.addressId
  var payMode = req.body.payMode
  var payId = req.body.payId
  var price = req.body.price
  var coupon = req.body.coupon ?? ""
  var couponCost = req.body.couponCost ?? ""
  var discount = req.body.discount ?? ""
  var shipPrice = req.body.shipPrice ?? ""
  var deliveryCharge = req.body.deliveryCharge ?? ""
  var packCharge = req.body.packCharge ?? ""
  var total = req.body.total
  var status = req.body.status
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (userId && vendorId && items && sku && category && productName && image && username && phone && email && addressId && payMode &&
      payId && price && total && status) {
      const result = await prisma.zcom_order.create({
        data: {
          userId: userId, vendorId: vendorId, items: items, sku: sku, category: category, productName: productName, image: image,
          username: username, phone: phone, email: email, addressId: addressId, payMode: payMode, payId: payId, price: price,
          coupon: coupon, couponCost: couponCost, discount: discount, shipPrice: shipPrice,
          deliveryCharge: deliveryCharge, packCharge: packCharge, total: total, status: status
        }
      });
      if (result) {
        res.json({ "data": result, "message": "Order successfully placed.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/order', async (req, res) => {
  // await executeLatinFunction()
  var id = req.query.id
  const result = await prisma.zcom_order.findMany({
    where: id ? { id: Number(id) } : {},
    orderBy: { id: "desc" }
  });
  res.json({ "data": result, "message": "Order successfully Fetched.", "success": true });
})

app.delete('/zcom/order', async (req, res) => {
  // await executeLatinFunction()
  var id = req.query.id
  if (id) {
    const result = await prisma.zcom_order.delete({
      where: { id: Number(id) }
    });
    if (result) {
      res.json({ "message": "Order successfully deleted.", "success": true });
    } else {
      res.json({ "message": "No order found.", "success": false });
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

app.post('/zcom/vendor', async (req, res) => {
  // await executeLatinFunction()
  var vendorName = req.body.vendorName
  var phone = req.body.phone
  var email = req.body.email
  var shopName = req.body.shopName
  var shopImg = req.body.shopImg
  var address = req.body.address
  var latlong = req.body.latlong
  var aadhaarNo = req.body.aadhaarNo
  var aadhaarImg = req.body.aadhaarImg
  var panNo = req.body.panNo
  var panImg = req.body.panImg
  var gstNo = req.body.gstNo
  var status = req.body.status
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (vendorName && phone && email && shopName && shopImg && address && latlong && aadhaarNo && aadhaarImg && panNo && panImg &&
      gstNo && status) {
      const findVendor = await prisma.zcom_vendor.findFirst({ where: { phone: phone } });
      if (!findVendor) {
        const result = await prisma.zcom_vendor.create({
          data: {
            vendorName: vendorName, phone: phone, email: email, shopName: shopName, shopImg: shopImg, address: address,
            latlong: latlong, aadhaarNo: aadhaarNo, aadhaarImg: aadhaarImg, panNo: panNo, panImg: panImg, gstNo: gstNo, status: status
          }
        });
        if (result) {
          res.json({ "data": result, "message": "Vendor successfully register.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      } else {
        res.json({ "message": "Vendor mobile number already taken.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/vendor', async (req, res) => {
  // await executeLatinFunction()
  var vendorName = req.body.vendorName
  var phone = req.body.phone
  var email = req.body.email
  var shopName = req.body.shopName
  var shopImg = req.body.shopImg
  var address = req.body.address
  var latlong = req.body.latlong
  var aadhaarNo = req.body.aadhaarNo
  var aadhaarImg = req.body.aadhaarImg
  var panNo = req.body.panNo
  var panImg = req.body.panImg
  var gstNo = req.body.gstNo
  var status = req.body.status
  var id = req.body.id
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_vendor.update({
        where: { id: Number(id) },
        data: {
          vendorName: vendorName, phone: phone, email: email, shopName: shopName, shopImg: shopImg, address: address,
          latlong: latlong, aadhaarNo: aadhaarNo, aadhaarImg: aadhaarImg, panNo: panNo, panImg: panImg, gstNo: gstNo, status: status
        }
      });
      if (result) {
        res.json({ "message": "Vendor details successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/vendor', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_vendor.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    });
    res.json({ "data": result, "message": "Vendor successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/vendor', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_vendor.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "Vendor successfully Removed.", "success": true });
      } else {
        res.json({ "message": "No vendor found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})


app.post('/zcom/staff', async (req, res) => {
  // await executeLatinFunction()
  var empId = req.body.empId
  var role = req.body.role
  var empName = req.body.empName
  var phone = req.body.phone
  var email = req.body.email
  var address = req.body.address
  var aadhaarNo = req.body.aadhaarNo
  var joinDate = req.body.joinDate
  var status = req.body.status
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (empId && role && empName && phone && email && address && aadhaarNo && joinDate) {
      const findStaff = await prisma.zcom_staff.findFirst({ where: { phone: phone } });
      if (!findStaff) {
        const result = await prisma.zcom_staff.create({
          data: {
            empId: empId, role: role, empName: empName, phone: phone, email: email, address: address,
            aadhaarNo: aadhaarNo, joinDate: joinDate, status: status
          }
        });
        if (result) {
          res.json({ "data": result, "message": "staff successfully register.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      } else {
        res.json({ "message": "staff mobile number already taken.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/staff', async (req, res) => {
  // await executeLatinFunction()
  var empId = req.body.empId
  var role = req.body.role
  var empName = req.body.empName
  var phone = req.body.phone
  var email = req.body.email
  var address = req.body.address
  var aadhaarNo = req.body.aadhaarNo
  var joinDate = req.body.joinDate
  var status = req.body.status
  var id = req.body.id
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_staff.update({
        where: { id: Number(id) },
        data: {
          empId: empId, role: role, empName: empName, phone: phone, email: email, address: address,
          aadhaarNo: aadhaarNo, joinDate: joinDate, status: status
        }
      });
      if (result) {
        res.json({ "message": "staff details successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/staff', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_staff.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    });
    res.json({ "data": result, "message": "staff successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/staff', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_staff.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "staff successfully Removed.", "success": true });
      } else {
        res.json({ "message": "No staff found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.post('/zcom/dPartner', async (req, res) => {
  // await executeLatinFunction()
  var dPartnerId = req.body.dPartnerId
  var vendorShop = req.body.vendorShop
  var name = req.body.name
  var phone = req.body.phone
  var email = req.body.email
  var address = req.body.address
  var aadhaarNo = req.body.aadhaarNo
  var drivingLicense = req.body.drivingLicense
  var joinDate = req.body.joinDate
  var status = req.body.status
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (dPartnerId && vendorShop && name && phone && email && address && aadhaarNo && drivingLicense && joinDate) {
      const findStaff = await prisma.zcom_delivery_partner.findFirst({ where: { phone: phone } });
      if (!findStaff) {
        const result = await prisma.zcom_delivery_partner.create({
          data: {
            dPartnerId: dPartnerId, vendorShop: vendorShop, name: name, phone: phone, email: email, address: address,
            aadhaarNo: aadhaarNo, drivingLicense: drivingLicense, joinDate: joinDate, status: status
          }
        });
        if (result) {
          res.json({ "data": result, "message": "Deliver Partner successfully register.", "success": true })
        } else {
          res.json({ "message": "Oops! An error occurred.", "success": false })
        }
      } else {
        res.json({ "message": "Deliver Partner mobile number already taken.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/dPartner', async (req, res) => {
  // await executeLatinFunction()
  var dPartnerId = req.body.dPartnerId
  var vendorShop = req.body.vendorShop
  var name = req.body.name
  var phone = req.body.phone
  var email = req.body.email
  var address = req.body.address
  var aadhaarNo = req.body.aadhaarNo
  var drivingLicense = req.body.drivingLicense
  var joinDate = req.body.joinDate
  var status = req.body.status
  var id = req.body.id
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_delivery_partner.update({
        where: { id: Number(id) },
        data: {
          dPartnerId: dPartnerId, vendorShop: vendorShop, name: name, phone: phone, email: email, address: address,
          aadhaarNo: aadhaarNo, drivingLicense: drivingLicense, joinDate: joinDate, status: status
        }
      });
      if (result) {
        res.json({ "message": "Deliver Partner details successfully updated.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/dPartner', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_delivery_partner.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    });
    res.json({ "data": result, "message": "Deliver Partner successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/dPartner', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_delivery_partner.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "Deliver Partner successfully Removed.", "success": true });
      } else {
        res.json({ "message": "No Deliver Partner found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.post('/zcom/rating', async (req, res) => {
  // await executeLatinFunction()
  var userId = req.body.userId
  var username = req.body.username
  var userImg = req.body.userImg
  var stockId = req.body.stockId
  var productImg = req.body.productImg
  var title = req.body.title
  var review = req.body.review
  var rating = req.body.rating
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (userId && username && userImg && Number(stockId) && productImg && title && review && Number(rating)) {
      const result = await prisma.zcom_rating.create({
        data: {
          userId: userId, username: username, userImg: userImg, stockId: stockId, productImg: productImg, title: title,
          review: review, rating: Number(rating)
        }
      });
      if (result) {
        const finalRating = await prisma.zcom_rating.aggregate({
          where: { stockId: stockId },
          _avg: { rating: true },
        });
        await prisma.zcom_stock.update({
          where: { id: Number(stockId) },
          data: { rating: finalRating._avg.rating + "" }
        });
        res.json({ "data": result, "message": "Rating successfully added.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.put('/zcom/rating', async (req, res) => {
  // await executeLatinFunction()
  var useful = req.body.useful
  var id = req.body.id
  console.log(req.body)
  var jwt = req.header('jwt')
  if (jwt == SAdminJwt) {
    if (id && useful) {
      const result = await prisma.zcom_rating.update({
        where: { id: Number(id) },
        data: { useful: useful == "true" ? { increment: 1 } : { decrement: 1 } }
      });
      if (result) {
        res.json({ "data": result, "message": "Rating successfully added.", "success": true })
      } else {
        res.json({ "message": "Oops! An error occurred.", "success": false })
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.get('/zcom/rating', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    const result = await prisma.zcom_rating.findMany({
      where: id ? { id: Number(id) } : {},
      orderBy: { id: "desc" }
    });
    res.json({ "data": result, "message": "Rating successfully Fetched.", "success": true });
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.delete('/zcom/rating', async (req, res) => {
  // await executeLatinFunction()
  var jwt = req.header('jwt')
  var id = req.query.id
  if (jwt == SAdminJwt) {
    if (Number(id)) {
      const result = await prisma.zcom_rating.delete({
        where: { id: Number(id) }
      });
      if (result) {
        res.json({ "message": "Rating successfully Removed.", "success": true });
      } else {
        res.json({ "message": "No rating found.", "success": false });
      }
    } else {
      res.json({ "message": "Required fields missing", "success": false });
    }
  } else {
    res.json({ "message": "JWT does not match", "success": false });
  }
})

app.post('/zcom/banner', async (req, res) => {
  // await executeLatinFunction()
  var title = req.body.title
  var banner = req.body.banner
  console.log(req.body)
  if (title && banner) {
    const result = await prisma.zcom_banner.create({
      data: { title: title, banner: banner }
    });
    if (result) {
      res.json({ "data": result, "message": "Banner successfully created.", "success": true })
    } else {
      res.json({ "message": "Oops! An error occurred.", "success": false })
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

app.put('/zcom/banner', async (req, res) => {
  // await executeLatinFunction()
  var title = req.body.title
  var banner = req.body.banner
  var id = req.body.id
  console.log(req.body)
  if (id) {
    const result = await prisma.zcom_banner.update({
      where: { id: Number(id) },
      data: { title: title, banner: banner }
    });
    if (result) {
      res.json({ "message": "Banner successfully updated.", "success": true })
    } else {
      res.json({ "message": "Oops! An error occurred.", "success": false })
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

app.get('/zcom/banner', async (req, res) => {
  // await executeLatinFunction()
  var id = req.query.id
  const result = await prisma.zcom_banner.findMany({
    where: id ? { id: Number(id) } : {},
    orderBy: { id: "desc" }
  });
  res.json({ "data": result, "message": "Banner successfully Fetched.", "success": true });
})

app.delete('/zcom/banner', async (req, res) => {
  // await executeLatinFunction()
  var id = req.query.id
  if (id) {
    const result = await prisma.zcom_banner.delete({
      where: { id: Number(id) }
    });
    if (result) {
      res.json({ "message": "Banner successfully deleted.", "success": true });
    } else {
      res.json({ "message": "No banner found.", "success": false });
    }
  } else {
    res.json({ "message": "Required fields missing", "success": false });
  }
})

// app.post('/zcom/blog', async (req, res) => {
//   // await executeLatinFunction()
//   var image = req.body.image
//   var title = req.body.title
//   var content = req.body.content
//   console.log(req.body)
//   var jwt = req.header('jwt')
//   if (jwt == SAdminJwt) {
//     if (image && title && content) {
//       const result = await prisma.zcom_blog.create({
//         data: { image: image, title: title, content: content }
//       });
//       if (result) {
//         res.json({ "data": result, "message": "Blog successfully added.", "success": true })
//       } else {
//         res.json({ "message": "Oops! An error occurred.", "success": false })
//       }
//     } else {
//       res.json({ "message": "Required fields missing", "success": false });
//     }
//   } else {
//     res.json({ "message": "JWT does not match", "success": false });
//   }
// })

// app.put('/zcom/blog', async (req, res) => {
//   // await executeLatinFunction()
//   var image = req.body.image
//   var title = req.body.title
//   var content = req.body.content
//   var id = req.body.id
//   console.log(req.body)
//   var jwt = req.header('jwt')
//   if (jwt == SAdminJwt) {
//     if (Number(id)) {
//       const result = await prisma.zcom_blog.update({
//         where: { id: Number(id) },
//         data: { image: image, title: title, content: content }
//       });
//       if (result) {
//         res.json({ "data": result, "message": "Blog successfully updated.", "success": true })
//       } else {
//         res.json({ "message": "Oops! An error occurred.", "success": false })
//       }
//     } else {
//       res.json({ "message": "Required fields missing", "success": false });
//     }
//   } else {
//     res.json({ "message": "JWT does not match", "success": false });
//   }
// })

// app.get('/zcom/blog', async (req, res) => {
//   // await executeLatinFunction()
//   var jwt = req.header('jwt')
//   var id = req.query.id
//   if (jwt == SAdminJwt) {
//     const result = await prisma.zcom_blog.findMany({
//       where: id ? { id: Number(id) } : {},
//       orderBy: { id: "desc" }
//     });
//     res.json({ "data": result, "message": "Blog successfully Fetched.", "success": true });
//   } else {
//     res.json({ "message": "JWT does not match", "success": false });
//   }
// })

// app.delete('/zcom/blog', async (req, res) => {
//   await executeLatinFunction()
//   var jwt = req.header('jwt')
//   var id = req.query.id
//   if (jwt == SAdminJwt) {
//     if (Number(id)) {
//       const result = await prisma.zcom_blog.delete({
//         where: { id: Number(id) }
//       });
//       if (result) {
//         res.json({ "message": "Blog successfully Removed.", "success": true });
//       } else {
//         res.json({ "message": "No blog found.", "success": false });
//       }
//     } else {
//       res.json({ "message": "Required fields missing", "success": false });
//     }
//   } else {
//     res.json({ "message": "JWT does not match", "success": false });
//   }
// })

app.post('/zcom/fileUpload', async (req, res) => {
  // await executeLatinFunction()
  upload(req, res, (err) => {
    if (err) {
      res.json({ "error": false, "message": err.message });
    } else {
      res.json({ "error": true, "message": "Image uploaded successfully" });
    }
  });
})

app.get('/zcom/get_Images', async (req, res) => {
  // await executeLatinFunction()
  fs.readdir("./images", function (err, files) {
    if (err) {
      res.json();
    }
    let filesv = "";
    files.forEach(function (file) {
      filesv = filesv + file + ",";
    });
    res.json({ "files": filesv });
  });
})

app.delete('/zcom/fileDelete', async (req, res) => {
  // await executeLatinFunction()
  var name = req.query.name
  if (name) {
    fs.unlink('./images/' + name, (err) => {
      if (err) {
        res.json({ "message": "Error in delete", "success": 0 });
      }
      res.json({ "message": "File deleted", "success": 1 });
    });
  } else {
    res.json({ "message": "Required fields missing", "success": 0 });
  }
})

async function pushNotification(title: any, message: any, key: any) {
  const data = JSON.stringify({
    "to": '/topics/allDevices',
    "priority": "high",
    "data": { "title": title, "message": message }
  })
  const options = {
    hostname: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': key
    },
    timeout: 11000,
  }
  const req = https.request(options, (res) => {
    let data = '';
    console.log('Status Code:', res.statusCode);
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(data)
    });
  }).on("error", (err) => {
  });
  req.write(data);
  req.end();
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 1024
  }
}).single("image");

app.use(express.static(__dirname + '/zcom/images'));

app.get('/zcom/images/*', async (req, res) => {
  const search = "%20";
  const replacer = new RegExp(search, "g");
  // res.sendFile('C:/Users/intel/Desktop/zcom_node_server/' + req.path.replace("small/", "").replace("/zcom/", "").replace(replacer, " "))
  res.sendFile("/home/arthy" + req.path.replace("small/", "").replace(replacer, " "));
})

app.use((req: any, res: any) => {
  return res.status(404).json({
    status: false,
    message: `${req.method} at ${req.path} not found`,
  });
});

app.listen(8080, () => console.log(`Server ready at: http://localhost:8080`)).on("error", err => {
  console.log(err)
})

async function executeLatinFunction() {
  await prisma.$executeRaw(Prisma.sql`SET NAMES latin1`);
  await prisma.$executeRaw(Prisma.sql`SET CHARACTER SET latin1`);
  await prisma.$executeRaw(Prisma.sql`SET character_set_connection=latin1`);
}

async function executeUtfFunction() {
  await prisma.$executeRaw(Prisma.sql`SET NAMES utf8`);
  await prisma.$executeRaw(Prisma.sql`SET CHARACTER SET utf8`);
  await prisma.$executeRaw(Prisma.sql`SET character_set_connection=utf8`);
}