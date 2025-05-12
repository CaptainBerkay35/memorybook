import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js';


const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts',postRoutes);


const CONNECTION_URL =
  "mongodb+srv://kaptanberkay35:lkPtMnVmIBjYjUC6@cluster0.nt2htoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`)))
  .catch((error) => console.log(error.message));


