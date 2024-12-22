// StaffTeam.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import './StaffTeamPage.scss'; // Đổi tên file SCSS nếu cần
import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../Footer/Footer';

const StaffTeam = () => {
  return (
    <div className="staff-team-container">
      <HomeHeader />
      <div className="staff-team-body">
        <div className="description-staff-team">
          <h1>
            <FormattedMessage
              id="staff.title"
              defaultMessage="Đội Ngũ Nhân Viên"
            />
          </h1>
          <p>
            <FormattedMessage
              id="staff.description"
              defaultMessage="Trang này mô tả đội ngũ nhân viên chăm sóc thú cưng của chúng tôi."
            />
          </p>

          {/* Thông tin về Đội ngũ Nhân viên */}
          <div className="staff-member">
            <h3 className="staff-name">
              <FormattedMessage
                id="staff.member1.title"
                defaultMessage="Bác sĩ thú y 1"
              />
            </h3>
            <p>
              Thông tin về bác sĩ thú y 1...
            </p>
          </div>

          <div className="staff-member">
            <h3 className="staff-name">
              <FormattedMessage
                id="staff.member2.title"
                defaultMessage="Bác sĩ thú y 2"
              />
            </h3>
            <p>
              Thông tin về bác sĩ thú y 2...
            </p>
          </div>

          {/* Thêm các thành viên khác của đội ngũ tại đây */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffTeam;
