package com.previred.api.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UsuarioDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private Long rut;
    private String dv;
    private String fechaNacimiento;
    private String correoElectronico;
    private String contrasena;
}
