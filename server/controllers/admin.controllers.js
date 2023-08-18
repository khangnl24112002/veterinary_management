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

const getAdminByAccountId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = await adminServices.getByAccountId(id);

    return res.status(200).json({ success: true, err: -1, message: admin });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, err: 1, message: "Internal server error" });
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
  const { name, phoneNumber, address, email } = req.body;
  const avatarBuffer = req.file.buffer;
  const accountId = req.accountData.accountId;
  try {
    // Goi upload_stream trong truong hop file anh duoc luu vao bo nho khi dung multer
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
            res.status(500).json({
              success: false,
              err: 1,
              message: "Loi khi upload anh len cloudinary!",
            });
          } else {
            // Luu thong tin nguoi dung vao co so du lieu
            const newInfo = {
              name,
              phoneNumber,
              address,
              email,
              avatar: result.secure_url,
            };
            const modelResult = await adminServices.update(
              newInfo.name,
              newInfo.phoneNumber,
              newInfo.address,
              newInfo.email,
              newInfo.avatar,
              accountId
            );
            if (modelResult !== 0)
              // tra ve ket qua cho nguoi dung
              res.json({
                err: -1,
                success: true,
                data: newInfo,
              });
          }
        }
      )
      .end(avatarBuffer); // Kết thúc việc tải lên bằng cách truyền dữ liệu tệp
  } catch (error) {
    res
      .status(500)
      .json({ success: false, err: 1, message: "Loi controller admin" });
  }
};
module.exports = {
  getAllAdmins,
  addNewAdmin,
  updateAdminInfo,
  getAdminByAccountId,
};
