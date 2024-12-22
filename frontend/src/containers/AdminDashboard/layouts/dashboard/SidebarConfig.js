import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Quản lý Nhân Viên",
    path: "/admin-dashboard/user",
    icon: getIcon("fluent:people-community-20-filled"), // Icon phù hợp hơn với quản lý nhân sự
  },
  {
    title: "Quản lý thông tin dịch vụ, cơ sở của nhân viên",
    path: "/admin-dashboard/manage-doctor",
    icon: getIcon("fluent:organization-20-filled"), // Icon liên quan đến bác sĩ
  },
  {
    title: "Quản lý Kế hoạch Dịch vụ",
    path: "/admin-dashboard/manage-schedule",
    icon: getIcon("ic:baseline-calendar-today"), // Icon lịch phù hợp với kế hoạch
  },
  {
    title: "Quản lý Cơ Sở Chăm sóc thú cưng",
    path: "/admin-dashboard/manage-clinic",
    icon: getIcon("mdi:paw-outline"), // Icon về thú cưng
  },
  {
    title: "Quản lý Dịch Vụ",
    path: "/admin-dashboard/manage-service",
    icon: getIcon("material-symbols:design-services-rounded"), // Icon dịch vụ tổng quát
  },
  {
    title: "Thống kê",
    path: "/admin-dashboard/app",
    icon: getIcon("carbon:chart-bar"), 
    children: [
      {
        title: "Lịch sử đặt lịch",
        path: "/admin-dashboard/manage-booking",
        icon: getIcon("carbon:chart-line"), // Icon cho doanh thu theo tháng
      },
      {
        title: "Doanh thu theo tháng",
        path: "/admin-dashboard/manage-statistical/s",
        icon: getIcon("carbon:chart-line"), // Icon cho doanh thu theo tháng
      },
    ]// Icon biểu đồ thống kê
  },
];

export default sidebarConfig;
