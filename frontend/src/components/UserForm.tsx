import React, { useEffect } from 'react';
import { Usuario, UsuarioCreate } from '../interfaces/Usuario';
import { createUser, updateUser } from '../services/userService';
import { Drawer, Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';

interface Props {
    open: boolean;
    onClose: () => void;
    user: Usuario | null;
    onUserAdded: (newUser: Usuario) => void;
    onUserUpdated: (updatedUser: Usuario) => void;
}

const UserForm: React.FC<Props> = ({ open, onClose, user, onUserAdded, onUserUpdated }) => {
    const [form] = Form.useForm();

    const handleFinish = async (values: any) => {
        try {
            const formattedDate = values.fechaNacimiento.format('YYYY-MM-DD');
            const userData: UsuarioCreate = { ...values, fechaNacimiento: formattedDate };

            let response;
            if (user) {
                const userUpdate: Usuario = { ...userData, id: user.id };
                response = await updateUser(user.id, userUpdate);
                if (response.status === 200) {
                    message.success("Usuario actualizado correctamente");
                    onUserUpdated(response.data);
                } else {
                    message.error(response.message);
                    return;
                }
            } else {
                const newUser: UsuarioCreate = { ...userData };
                response = await createUser(newUser);
                if (response.status === 201) {
                    message.success("Usuario creado correctamente");
                    onUserAdded(response.data);
                } else {
                    message.error(response.message);
                    return;
                }
            }

            onClose();
            form.resetFields();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            message.error("Error al guardar usuario");
        }
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                nombres: user.nombres,
                apellidos: user.apellidos,
                rut: user.rut,
                dv: user.dv,
                fechaNacimiento: moment(user.fechaNacimiento),
                correoElectronico: user.correoElectronico,
                contrasena: user.contrasena
            });
        } else {
            form.resetFields();
        }
    }, [user, form]);

    return (
        <Drawer
            title={user ? "Editar Usuario" : "Crear Usuario"}
            placement="right"
            onClose={onClose}
            open={open}
            width={400}
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item name="nombres" label="Nombres"
                    rules={[{ required: true, message: 'Campo requerido!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="apellidos" label="Apellidos"
                    rules={[{ required: true, message: 'Campo requerido!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="rut" label="RUT"
                    rules={[{ required: true, message: 'Campo requerido!' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="dv" label="DV"
                    rules={[{ required: true, message: 'Campo requerido!' },
                    {
                        validator: (_, value) => {
                            const charCode = value.toUpperCase().charCodeAt(0);
                            if (
                                (charCode !== 75) && // 'K'
                                (charCode < 48 || charCode > 57) // '1' - '9'
                            ) {
                                return Promise.reject(new Error('Solo "k" o numeros del 0 al 9 son permitidos!'));
                            }
                            return Promise.resolve();
                        }
                    }]}>
                    <Input maxLength={1} />
                </Form.Item>
                <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento"
                    rules={[{ required: true, message: 'Campo requerido!' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="correoElectronico" label="Correo Electrónico"
                    rules={[{ required: true, type: 'email', message: 'El correo electronico no es valido!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="contrasena" label="Contraseña"
                    rules={[{ required: true, message: 'Campo requerido!' }]}>
                    <Input.Password placeholder="Crear tu contraseña" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {user ? "Actualizar" : "Crear"}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default UserForm;