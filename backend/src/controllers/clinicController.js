import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let infor = await clinicService.getAllClinic();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let deleteClinicById = async (req, res) => {
  try {
      let data = await clinicService.deleteClinicById(req.query.id);
      return res.status(200).json(data);
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          errCode: -1,
          message: 'Error from server...',
      });
  }
}
let updateClinicById = async (req, res) => {
  try {
      let data = await clinicService.updateClinicByIdService(req.query.id, req.body);

      return res.status(200).json(data);
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          errCode: -1,
          message: 'Error from server...',
      });
  }
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  deleteClinicById:deleteClinicById,
  updateClinicById:updateClinicById
};
