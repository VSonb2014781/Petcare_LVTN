import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialtyadmin();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};


let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
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
let deleteSpecialtyById = async (req, res) => {
  try {
      let data = await specialtyService.deleteSpecialtyById(req.query.id);
      return res.status(200).json(data);
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          errCode: -1,
          message: 'Error from server...',
      });
  }
}
let editSpecialtyById = async (req, res) => {
  try {
      let data = await specialtyService.editSpecialtyById(req.query.id, req.body);

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
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  deleteSpecialtyById:deleteSpecialtyById,
  editSpecialtyById:editSpecialtyById
};
