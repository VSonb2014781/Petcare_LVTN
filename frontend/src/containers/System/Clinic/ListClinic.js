import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getAllClinic, deleteClinicById } from '../../../services/userService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './ListClinic.scss';

class ListClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        };
    }

    async componentDidMount() {
        this.fetchClinics();
    }

    fetchClinics = async () => {
        let res = await getAllClinic();
        if (res.errCode === 0 && res.data) {
            this.setState({
                clinics: res.data,
            });
        }
    };

    idFromParent = (clinic) => {
        if (this.props.handleEditClinic) {
            const clinicWithImage = {
                ...clinic,
                imageBase64: clinic.image || "", // Truyền URL nếu có
            };
            this.props.handleEditClinic(clinicWithImage);
        }
    };

    handleDeleteClinic = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa?',
            text: `Dịch vụ với ID '${id}' sẽ bị xóa vĩnh viễn!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (result.isConfirmed) {
            try {
                await deleteClinicById(id);
                this.fetchClinics();
                toast.success('Xóa cơ sở thành công!');
            } catch (error) {
                toast.error('Lỗi xóa!');
            }
        }
    };

    render() {
        const { clinics } = this.state;

        return (
            <div className="list-clinic-container">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinics.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            className="img-thumbnail"
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: "50px", height: "auto" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.idFromParent(item)}
                                        className="btn-edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => this.handleDeleteClinic(item.id)}
                                        className="btn-delete"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(ListClinic);
