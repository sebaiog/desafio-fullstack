import React, { useState, useEffect } from 'react';
import { Usuario } from '../interfaces/Usuario';
import { getAllUsers, deleteUser } from '../services/userService';
import UserForm from './UserForm';
import { Table, Space, Button, Row, Col, message, Popconfirm, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                if (response.status === 200) {
                    let data: Usuario[] = response.data as unknown as Usuario[];
                    setUsers(data)
                } else {
                    message.warning(response.message);
                }
            } catch (err) {
                message.error('Error al cargar usuarios');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteUser(id);
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== id));
                message.success("Usuario eliminado correctamente");
            } else {
                message.warning(response.message);
            }
        } catch (err) {
            message.error('Error al eliminar usuario');
        }
    };

    const handleEdit = (user: Usuario) => {
        setEditingUser(user);
        showDrawer();
    };

    const handleUserAdded = (newUser: Usuario) => {
        if (users === null) {
            setUsers([newUser]);
        } else {
            setUsers([...users, newUser]);
        }
    };

    const handleUserUpdated = (updatedUser: Usuario) => {
        const updatedUsers = users.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setEditingUser(null);
    };

    const columns = [
        {
            title: 'Nombres',
            dataIndex: 'nombres',
            key: 'nombres',
        },
        {
            title: 'Apellidos',
            dataIndex: 'apellidos',
            key: 'apellidos',
        },
        {
            title: 'RUT',
            dataIndex: 'rut',
            key: 'rut',
        },
        {
            title: 'DV',
            dataIndex: 'dv',
            key: 'dv',
        },
        {
            title: 'Fecha de Nacimiento',
            dataIndex: 'fechaNacimiento',
            key: 'fechaNacimiento',
            render: (text: moment.MomentInput) => {
                return moment(text).format('YYYY-MM-DD');
            },
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'correoElectronico',
            key: 'correoElectronico',
        },
        {
            title: 'Contraseña',
            dataIndex: 'contrasena',
            key: 'contrasena',
            hidden: true,
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (record: Usuario) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title={`¿Estás seguro de que quieres eliminar ${record.nombres}?`}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Sí"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Row justify="end" style={{ marginBottom: '16px' }}>
                <Col>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        Crear Usuario
                    </Button>
                </Col>
            </Row>
            {loading && <Spin size="large" />}
            {!loading && (
                <Table dataSource={users} columns={columns} rowKey={(record) => record.id} />
            )}
            <UserForm
                open={open}
                onClose={onClose}
                user={editingUser}
                onUserAdded={handleUserAdded}
                onUserUpdated={handleUserUpdated}
            />
        </div>
    );
};

export default UserList;