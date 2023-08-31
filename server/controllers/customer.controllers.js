const { customerSchema } = require("../helpers/joi_schemas");
const {
  internalServerError,
  badRequest,
} = require("../middlewares/handleError");

const customerServices = require("../services/customer.services");
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "daexxhimb",
  api_key: "928598793819699",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getCustomerInfo = async (req, res, next) => {
  try {
    // Lay id tu params
    const customerId = req.params.id;
    const customerInfo = await customerServices.getById(customerId);
    if (customerInfo === 0) {
      return next(internalServerError("Customer model bi loi"));
    } else {
      res.status(200).json(customerInfo);
    }
  } catch (err) {
    return next(internalServerError("Customer Controller bi loi"));
  }
};

const addNewCustomer = async (req, res, next) => {
  try {
    // Lay thong tin customer tu body
    const { name, phoneNumber, address, email, accountId } = req.body;
    // Lay thong tin tai khoan customer
    // Lay avatar
    const avatarBuffer = req.file.buffer;
    // xac thuc thong tin
    try {
      const customerInfo = await customerSchema.validateAsync({
        name,
        phoneNumber,
        address,
        email,
      });
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
                accountId,
              };
              const modelResult = await customerServices.insert(
                newInfo.name,
                newInfo.phoneNumber,
                newInfo.address,
                newInfo.email,
                newInfo.avatar,
                newInfo.accountId
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
    } catch (err) {
      console.log(err);
      return next(badRequest("Thong tin nhap vao khong dung."));
    }
  } catch (err) {
    return next(internalServerError("Customer controller bi loi"));
  }
};

const getCustomers = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      err: -1,
      message: "get customers",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: 1,
      message: "Internal server error",
    });
  }
};

const updateCustomerInfo = async (req, res, next) => {
  const { name, phoneNumber, address, email } = req.body;
  const avatarBuffer = req.file.buffer;
  const accountId = req.params.id;
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
            res.status(500).json({
              success: false,
              err: 1,
              message: "Error! Uploading image fail.",
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
            const modelResult = await customerServices.update(
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
    res.status(500).json({
      success: false,
      err: 1,
      message: "Internal server error: Customer controller",
    });
  }
};
module.exports = {
  getCustomerInfo,
  addNewCustomer,
  getCustomers,
  updateCustomerInfo,
};
