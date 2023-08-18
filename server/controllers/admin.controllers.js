const { adminSchema } = require("../helpers/joi_schemas");
const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleError");
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "daexxhimb",
  api_key: "928598793819699",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const adminServices = require("../services/admin.services");

const getAllAdmins = async (req, res, next) => {
  try {
    const adminList = await adminServices.getAll();
    if (adminList === 0) {
      return next(internalServerError("Admin Model bi loi"));
    }
    res.status(200).json(adminList);
  } catch (err) {
    return next(internalServerError("Admin controller bi loi"));
  }
};

const addNewAdmin = async (req, res, next) => {
  try {
    // Lay thong tin admin tu body
    const { name, phoneNumber, address, email } = req.body;
    // Lay thong tin tai khoan admin
    const adminAccountId = parseInt(req.accountData.accountId);
    // xac thuc thong tin
    try {
      const adminInfo = await adminSchema.validateAsync({
        name,
        phoneNumber,
        address,
        email,
      });
      // Neu xac thuc thanh cong thi Goi den model de dien thong tin vao
      const newAdmin = await adminServices.insert(adminInfo, adminAccountId);
      if (newAdmin === 0) {
        return next(internalServerError("Model admin bi loi"));
      } else {
        res.status(200).json(newAdmin);
      }
    } catch (err) {
      return next(badRequest("Thong tin nhap vao khong dung."));
    }
  } catch (err) {
    return next(internalServerError("Admin controller bi loi"));
  }
};

const updateAdminInfo = async (req, res, next) => {
  const { username, phoneNumber, address, email } = req.body;
  const avatarBuffer = req.file.buffer;

  try {
    const result = await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "raw",
          width: 200, // Chiều rộng sau khi tải lên
          height: 200, // Chiều cao sau khi tải lên
          crop: "fill", // Cắt và điều chỉnh để đảm bảo kích thước
          quality: "auto:good", // Chất lượng ảnh
          format: "jpg", // Định dạng ảnh
        },
        async (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            res
              .status(500)
              .json({ error: "An error occurred while uploading." });
          } else {
            // Lưu thông tin vào cơ sở dữ liệu hoặc xử lý theo ý muốn
            // Trả về dữ liệu đã lưu trong cơ sở dữ liệu (nếu cần)
            res.json({
              username,
              phoneNumber,
              address,
              email,
              avatarUrl: result.secure_url,
            });
          }
        }
      )
      .end(avatarBuffer); // Kết thúc việc tải lên bằng cách truyền dữ liệu tệp
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "An error occurred while uploading." });
  }
};
module.exports = {
  getAllAdmins,
  addNewAdmin,
  updateAdminInfo,
};
