import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getAllSpecialty, deleteSpecialtyById } from '../../../services/userService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './ListSpecialty.scss';

class ListSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: [],
        };
    }

    async componentDidMount() {
        this.fetchSpecialtys();
    }

    fetchSpecialtys = async () => {
        let res = await getAllSpecialty();
        if (res.errCode === 0 && res.data) {
            this.setState({
                specialties: res.data,
            });
        }
    };

    idFromParient = (specialty) => {
        if (this.props.handleEditSpecialty) {
          const specialtyWithImage = {
            ...specialty,
            imageBase64: specialty.image || "", // Truyền URL nếu có
          };
          this.props.handleEditSpecialty(specialtyWithImage);
        }
      };      
    
    handleDeleteSpecialty = async (id) => {
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
                await deleteSpecialtyById(id);
                this.fetchSpecialtys();
                toast.success('Xóa dịch vụ thành công!');
            } catch (error) {
                toast.error('Lỗi xóa!');
            }
        }
    };

    render() {
        const { specialties } = this.state;

        return (
            <div className="list-specialty-container">
                <table className="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TÊN DỊCH VỤ</th>
                            <th scope="col">HÌNH ẢNH</th>
                            <th scope="col">THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialties.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>
                                    {item.image && (
                                        <img className="img-thumbnail" src={item.image} alt={item.name} style={{ width: "50px", height: "auto" }} />
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.idFromParient(item)}
                                        className="btn-edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        onClick={() => this.handleDeleteSpecialty(item.id)}
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

export default withRouter(ListSpecialty);
