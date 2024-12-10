import express, { Request, Response } from 'express'; // Import Express and types for Request and Response
import bodyParser from 'body-parser'; // Import body-parser for parsing JSON requests
import cors from 'cors'; // Import CORS middleware
import { PrismaClient } from '@prisma/client'; // Import Prisma Client for database operations

// Initialize Express and Prisma Client
const app = express();
const prisma = new PrismaClient();

// Middleware for CORS and JSON request parsing
app.use(cors());
app.use(bodyParser.json());

app.post('/zcom/banner', async (req, res) => {
  var title = req.body.title
  var banner = req.body.banner
  console.log(req.body)
  if (banner) {
    const result = await prisma.zcom_banner.create({
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

// Define the server's port
const PORT = process.env.PORT || 8080;

// Start the server and log the running port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
