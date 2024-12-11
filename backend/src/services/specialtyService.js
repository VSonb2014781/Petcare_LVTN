const db = require("../models");

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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

let getAllSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();

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

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown","name","image"],
        });

        if (data) {
          //do something
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            //find by location
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
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

let deleteSpecialtyById = async (inputId) => {
  try {
      if (!inputId) {
          return {
              errCode: 1,
              message: 'Missing required parameters!',
          }
      } else {
          await db.Specialty.destroy({
              where: {
                  id: inputId
              },
          })

          return {
              errCode: 0,
              message: 'Delete specialty successfully!',
          }
      }
  } catch (error) {
      return {
          errCode: -1,
          message: 'Error from server...',
      };
  }
}
let editSpecialtyById = async (inputId, data) => {
  try {
      if (!inputId) {
          return {
              errCode: 1,
              message: 'Missing required parameters!'
          };
      } else {
          let res = await db.Specialty.findOne({
              where: {
                  id: inputId
              },
              raw: false
          });

          if (res && res.image) {
              res.image = data.image;
              res.name = data.name;
              res.descriptionHTML = data.descriptionHTML;
              res.descriptionMarkdown = data.descriptionMarkdown;

              await res.save();
              return {
                  errCode: 0,
                  message: 'Specialty updated successfully',
                  data: res
              };
          }
      }
  } catch (error) {
      return { errCode: -1, message: 'Error from server...' };
  }
};
let getAllSpecialtyadmin = async () => {
  try {
      let res = await db.Specialty.findAll();
      if (res && res.length > 0) {
          res.map(item => {
              item.image = new Buffer.from(item.image, 'base64').toString('binary');
              return item;
          })
      }
      return {
          errCode: 0,
          message: 'OK',
          data: res
      }

  } catch (error) {
      return {
          errCode: -1,
          message: 'Error from server...',
      };
  }
}


module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  deleteSpecialtyById:deleteSpecialtyById,
  editSpecialtyById:editSpecialtyById,
  getAllSpecialtyadmin:getAllSpecialtyadmin
};
