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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
  var jwt = req.header("jwt");
  var phone = req.body.mobile
  var password = req.body.password
  console.log(jwt)
  console.log(req.body)
  if (jwt == SAdminJwt) {
    if (phone && password) {
      if (phone == "9876543210" && password == "12345678") {
        res.json({ name: "SAdmin", "authKey": "", "role": "superAdmin", "message": "Welcome to zcom.", "success": true });
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
//   await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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

app.post('/zcom/stock', async (req, res) => {
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
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

app.post('/zcom/banner', async (req, res) => {
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  await executeLatinFunction()
  var id = req.query.id
  const result = await prisma.zcom_banner.findMany({
    where: id ? { id: Number(id) } : {},
    orderBy: { id: "desc" }
  });
  res.json({ "data": result, "message": "Banner successfully Fetched.", "success": true });
})

app.delete('/zcom/banner', async (req, res) => {
  await executeLatinFunction()
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

app.post('/zcom/fileUpload', async (req, res) => {
  await executeLatinFunction()
  upload(req, res, (err) => {
    if (err) {
      res.json({ "error": true, "message": err.message });
    } else {
      res.json({ "error": false, "message": "Image uploaded successfully" });
    }
  });
})

app.get('/zcom/get_Images', async (req, res) => {
  await executeLatinFunction()
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
  await executeLatinFunction()
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
  // res.sendFile('C:/Users/Hp/Desktop/Network_api/zcom_api/' + req.path.replace("small/", "").replace("prisma/zcom/", "").replace(replacer, " "))
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