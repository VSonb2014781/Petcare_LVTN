const db = require("../models");
require('dotenv').config();
const _ = require('lodash');
let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "Ok!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Ok!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "image",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          //do something
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "Ok!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteClinicById = async (inputId) => {
  try {
      if (!inputId) {
          return {
              errCode: 1,
              message: 'Missing required parameters!',
          }
      } else {
          await db.Clinic.destroy({
              where: {
                  id: inputId
              },
          })

          return {
              errCode: 0,
              message: 'Delete clinic successfully!',
          }
      }
  } catch (error) {
      return {
          errCode: -1,
          message: 'Error from server...',
      };
  }
}
let updateClinicByIdService = async (inputId, data) => {
  try {
      if (!inputId) {
          return {
              errCode: 1,
              message: 'Missing required parameters!'
          };
      } else {
          let res = await db.Clinic.findOne({
              where: {
                  id: inputId
              },
              raw: false
          });

          if (res && res.image) {
              res.image = data.image;
              res.name = data.name;
              res.address = data.address;
              res.descriptionHTML = data.descriptionHTML;
              res.descriptionMarkdown = data.descriptionMarkdown;

              await res.save();
              return {
                  errCode: 0,
                  message: 'Clinic updated successfully',
                  data: res
              };
          }
      }
  } catch (error) {
      return { errCode: -1, message: 'Error from server...' };
  }
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  deleteClinicById:deleteClinicById,
  updateClinicByIdService:updateClinicByIdService
};
