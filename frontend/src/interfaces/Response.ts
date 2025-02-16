import { Usuario } from "./Usuario";

export interface Response {
    status: number;
    message: string;
    data: Usuario;
}