import bookingService from "../services/bookingService";
const db = require("../models");
let getAllBooking = async (req, res) => {
    try {
      let bookings = await bookingService.getAllBooking();
      return res.status(200).json(bookings);
    } catch (e) {
      console.error("Error while getting all bookings:", e);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Error from server...",
      });
    }
  };
  
  // Lấy chi tiết cuộc hẹn theo ID
  let getDetailBookingById = async (req, res) => {
    let inputId = req.params.id; // Lấy ID từ params
    try {
      let booking = await bookingService.getDetailBookingById(inputId);
      return res.status(200).json(booking);
    } catch (e) {
      console.error("Error while getting booking by id:", e);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Error from server...",
      });
    }
  };
  
  // Xóa cuộc hẹn theo ID
  let deleteBookingById = async (req, res) => {
    let inputId = req.params.id; // Lấy ID từ params
    try {
      let result = await bookingService.deleteBookingById(inputId);
      return res.status(200).json(result);
    } catch (e) {
      console.error("Error while deleting booking:", e);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Error from server...",
      });
    }
  };
  
  // Cập nhật cuộc hẹn theo ID
  let updateBookingById = async (req, res) => {
    let inputId = req.params.id; // Lấy ID từ params
    let data = req.body; // Lấy dữ liệu từ body (ví dụ statusId, doctorId, etc.)
    
    try {
      let result = await bookingService.updateBookingByIdService(inputId, data);
      return res.status(200).json(result);
    } catch (e) {
      console.error("Error while updating booking:", e);
      return res.status(500).json({
        errCode: -1,
        errMessage: "Error from server...",
      });
    }
  };

const getAllUserBooking = async (req, res) => {
  try {
    const { userId } = req.query; // Lấy userId từ query params

    if (!userId) {
      return res.status(400).json({
        errCode: 1,
        message: "Missing userId",
      });
    }

    // Tìm tất cả booking của user
    const bookings = await db.Booking.findAll({
      where: { patientId: userId },
      include: [
        {
          model: db.User,
          as: "patientData",
          attributes: ["id", "firstName", "lastName", "email", "address"],
        },
        {
          model: db.Allcode,
          as: "timeTypeDataPatient",
          attributes: ["keyMap", "valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "statusIdDataPatient",
          attributes: ["keyMap", "valueEn", "valueVi"],
        },
        {
          model: db.Doctor_Infor,
          as: "doctorData",
          attributes: ["doctorId", "specialtyId", "clinicId"],
        },
      ],
    });

    return res.status(200).json({
      errCode: 0,
      message: "OK",
      data: bookings,
    });
  } catch (error) {
    console.error("Error in getAllUserBooking:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

 

  
  module.exports = {
    getAllBooking,
    getDetailBookingById,
    deleteBookingById,
    updateBookingById,
    getAllUserBooking

  };