// ContactPage.js
import React from 'react';
import { FormattedMessage } from 'react-intl';
import './ContactPage.scss'; // Tạo file CSS tương ứng nếu cần
import HomeHeader from '../HomePage/HomeHeader';
import Footer from '../Footer/Footer';

const ContactPage = () => {
  return (
    <div className="contact-page-container">
      <HomeHeader />
      <div className="contact-page-body">
        <div className="contact-info">
          <h1>
            <FormattedMessage
              id="contact.title"
              defaultMessage="Thông Tin Liên Hệ"
            />
          </h1>
          <p>
            <FormattedMessage
              id="contact.description"
              defaultMessage="Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn. Dưới đây là thông tin liên hệ của chúng tôi."
            />
          </p>

          <div className="contact-details">
            <h3>
              <FormattedMessage
                id="contact.phone"
                defaultMessage="Số Điện Thoại:"
              />
            </h3>
            <p>(+84) 123-456-789</p>

            <h3>
              <FormattedMessage
                id="contact.email"
                defaultMessage="Email:"
              />
            </h3>
            <p>info@petscare.com</p>

            <h3>
              <FormattedMessage
                id="contact.address"
                defaultMessage="Địa Chỉ:"
              />
            </h3>
            <p>123 Đường ABC, Quận 1, TP.HCM</p>

            <h3>
              <FormattedMessage
                id="contact.workingHours"
                defaultMessage="Giờ Làm Việc:"
              />
            </h3>
            <p>Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
            <p>Thứ Bảy - Chủ Nhật: 9:00 - 14:00</p>
          </div>

          <h2>
            <FormattedMessage
              id="contact.formTitle"
              defaultMessage="Gửi Thông Tin Liên Hệ"
            />
          </h2>
          <form className="contact-form">
            <label>
              <FormattedMessage
                id="contact.name"
                defaultMessage="Họ và Tên:"
              />
              <input type="text" placeholder="Nhập họ và tên" required />
            </label>
            <label>
              <FormattedMessage
                id="contact.message"
                defaultMessage="Tin Nhắn:"
              />
              <textarea placeholder="Nhập tin nhắn" required></textarea>
            </label>
            <button type="submit">
              <FormattedMessage
                id="contact.submit"
                defaultMessage="Gửi"
              />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
