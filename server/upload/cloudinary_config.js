import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "daexxhimb",
  api_key: "928598793819699",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
