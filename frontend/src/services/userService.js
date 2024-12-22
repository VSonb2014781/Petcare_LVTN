import { id } from "date-fns/locale";
import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const getUserDetailsByEmail = (email) => {
  return axios.get(`/api/get-user-details?email=${email}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const deleteSpecialtyService = (specialtyId) => {
  return axios.delete("api/delete-specialty",{
    data:{
      id:specialtyId,
    }

  });
    
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const getAllSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const deleteSpecialtyById = (id) => {
  return axios.delete(`/api/delete-specialty-by-id?id=${id}`);
};

const editSpecialtyById = (id, data) => {
  return axios.put(`/api/edit-specialty-by-id?id=${id}`, data);
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};
const getAllBooking = () => {
  return axios.get(`/api/get-booking`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}}`);
};
const deleteClinicById = (clinicId) => {
  return axios.delete(`/api/delete-clinic-by-id?id=${clinicId}`);
}
const updateClinicByIdService = (clinicId, updatedData) => {
  return axios.put(`/api/update-clinic-by-id?id=${clinicId}`, updatedData);
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
}


const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const getListAppointmentsForUser = (data) => {
  return axios.get(
    `/api/get-list-patient-for-user?userId=${data.userId}`
  );
};



const getAllPatientForUser = (data) => {
  return axios.get(
    `/api/get-list-patient-for-user?userId=${data.userId}&date=${data.date}`
  );
};

const getAllPatientForDoctor1 = (data) => {
  return axios.get(
    `/api/get-list-patient?&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

const postCreateRemedy = (data) => {
  return axios.post("/api/create-remedy", data);
};

const cancelBooking = (data) => {
  return axios.post("/api/cancel-booking", data);
};

const postUserForgotPassword = (data) => {
  return axios.post("/api/user-forgot-password", data);
};

const postVerifyRetrievePassword = (data) => {
  return axios.post("/api/verify-retrieve-password", data);
};

//admin
const getWeeklyRevenue = () => {
  return axios.get(`/api/get-weekly-revenue`);
};

const getTotalNewUserDay = () => {
  return axios.get(`/api/get-total-new-user-day`);
};

const getTotalHealthAppointmentDone = () => {
  return axios.get(`/api/get-total-health-appointment-done`);
};

const getTotalDoctors = () => {
  return axios.get(`/api/get-total-doctor`);
};

const getTopThreeDoctorOfTheYear = () => {
  return axios.get(`/api/get-top-three-doctors-of-the-year`);
};

const getTopFourVipPatient = () => {
  return axios.get(`/api/get-top-four-vip-patient`);
};

const getMonthlyRevenueSpecialty = () => {
  return axios.get(`/api/get-monthly-revenue-specialty`);
};
const getUserByEmail = (data) => {
  return axios.get(`/get-user-by-email`);
};
export const getAllBookingsForUser = (userId) => {
  return axios.get(`/api/get-bookings-by-user?userId=${userId}`);
};

export const getListPatientForUser = (userId) => {
  return axios.get(`/api/get-list-patient-user1?userId=${userId}`);
};

export {
  deleteSpecialtyService,
  getMonthlyRevenueSpecialty,
  getTopFourVipPatient,
  getTotalDoctors,
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllSpecialtyById,
  deleteSpecialtyById,
  editSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllBooking,
  getAllDetailClinicById,
  deleteClinicById,
  updateClinicByIdService,
  getAllPatientForDoctor,
  postSendRemedy,
  postUserForgotPassword,
  postVerifyRetrievePassword,
  cancelBooking,
  postCreateRemedy,
  getWeeklyRevenue,
  getTotalNewUserDay,
  getTotalHealthAppointmentDone,
  getTopThreeDoctorOfTheYear,
  getUserDetailsByEmail,
  saveDetailDoctorService,
  getUserByEmail,
  getAllPatientForDoctor1,
  getAllPatientForUser,
  getListAppointmentsForUser,

};
