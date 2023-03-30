import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import fileUpload from "express-fileupload";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogsRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import writerRouter from "./routes/writterRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(fileUpload({ useTempFiles: true }));

// "http://127.0.0.1:5173"  is the localhost of React+Vite App we are allowing this by now to use our APIS
app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5173", "https://res.cloudinary.com"],
  })
);

// There is one more middleware we need to build to check for the approvedWritters
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/writer", writerRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/comment", commentRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
