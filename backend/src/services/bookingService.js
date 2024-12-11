const db = require("../models");

let getAllBooking = () => {
    
      
  };
  let getDetailBookingById = (inputId) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!inputId) {
          resolve({
            errCode: 1,
            errMessage: "Missing required parameter",
          });
        } else {
          let booking = await db.Booking.findOne({
            where: { id: inputId },
            include: [
              {
                model: db.User,
                as: "patientData",
                attributes: ["id", "firstName", "lastName", "email", "phone"],
              },
              {
                model: db.Allcode,
                as: "timeTypeDataPatient",
                attributes: ["keyMap", "valueVi", "valueEn"],
              },
            ],
          });
  
          if (booking) {
            resolve({
              errCode: 0,
              errMessage: "Ok!",
              data: booking,
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Booking not found",
            });
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  let deleteBookingById = async (inputId) => {
    try {
      if (!inputId) {
        return {
          errCode: 1,
          message: 'Missing required parameters!',
        };
      } else {
        await db.Booking.destroy({
          where: {
            id: inputId,
          },
        });
  
        return {
          errCode: 0,
          message: 'Delete booking successfully!',
        };
      }
    } catch (error) {
      return {
        errCode: -1,
        message: 'Error from server...',
      };
    }
  };
  let getListPatientForDoctor1 = ( date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if ( !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {  date: date },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phonenumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!data) {
          data = {};
        }

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
  module.exports = {
    getAllBooking:getAllBooking,
    getDetailBookingById:getDetailBookingById,
    deleteBookingById:deleteBookingById
  };
  