export interface Usuario {
    id: number;
    nombres: string;
    apellidos: string;
    rut: number;
    dv: string;
    fechaNacimiento: string;
    correoElectronico: string;
    contrasena: string;
}

export type UsuarioCreate = Omit<Usuario, 'id'>;