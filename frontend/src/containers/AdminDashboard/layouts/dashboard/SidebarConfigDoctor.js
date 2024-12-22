// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigDoctor = [
  {
    title: "Quản lý Lich làm việc nhân viên",
    path: "/admin-dashboard/doctor/manage-schedule-doctor",
    icon: getIcon("healthicons:i-schedule-school-date-time"),
  },
  {
    title: "Quản lý đặt lịch",
    path: "/admin-dashboard/doctor/manage-patient",
    icon: getIcon("medical-icon:i-inpatient"),
  },
  {
    title: "Quản lý Bác sĩ và nhân viên",
    path: "/admin-dashboard/doctor/manage-doctor1",
    icon: getIcon("openmoji:male-doctor"),
  },
];

export default sidebarConfigDoctor;
