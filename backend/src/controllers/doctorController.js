import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit); //dau cộng để convert từ string sang kiểu số nguyên
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status.json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorService.saveDetailInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status.json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getExtraInforDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllAppointments = async (req, res) => {
  try {
    let infor = await doctorService.getAllAppointments();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getListAppointmentsForUser = async (req, res) => {
  try {
    let infor = await doctorService.getListAppointmentsForUser(
      req.query.userId,
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};



let getListPatientForDoctor1 = async (req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctor1(
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let sendRemedy = async (req, res) => {
  try {
    let infor = await doctorService.sendRemedy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let createRemedy = async (req, res) => {
  try {
    let infor = await doctorService.createRemedy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let cancelBooking = async (req, res) => {
  try {
    let infor = await doctorService.cancelBooking(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
  cancelBooking: cancelBooking,
  createRemedy: createRemedy,
  getAllAppointments,
  getListPatientForDoctor1:getListPatientForDoctor1,
  getListAppointmentsForUser:getListAppointmentsForUser,
  
};
