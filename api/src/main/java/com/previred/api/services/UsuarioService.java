package com.previred.api.services;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.previred.api.dtos.ResponseDTO;
import com.previred.api.dtos.UsuarioDTO;
import com.previred.api.entities.Usuario;
import com.previred.api.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final Logger logger = LoggerFactory.getLogger(UsuarioService.class);
    private final UsuarioRepository usuarioRepository;
    private final ModelMapper modelMapper;

    public ResponseDTO crearUsuario(UsuarioDTO usuario) {
        logger.info("Creando nuevo usuario: {}", usuario);

        ResponseDTO response = esUsuarioUnico(usuario, null);
        if (response != null) {
            return response;
        }

        Usuario usuarioMap = modelMapper.map(usuario, Usuario.class);
        response = new ResponseDTO();
        response.setStatus(HttpStatus.CREATED.value());
        response.setMessage("Usuario creado con éxito");
        response.setData(modelMapper.map(usuarioRepository.save(usuarioMap), UsuarioDTO.class));
        return response;
    }

    public ResponseDTO obtenerTodosLosUsuarios() {
        logger.info("Obteniendo todos los usuarios");
        ResponseDTO response = new ResponseDTO();
        List<UsuarioDTO> usuarios = usuarioRepository.findAll().stream()
                .map(value -> modelMapper.map(value, UsuarioDTO.class))
                .collect(java.util.stream.Collectors.toList());
        if (usuarios.isEmpty()) {
            logger.warn("No hay usuarios en la base de datos");
            response.setMessage("No hay usuarios en la base de datos");
        } else {
            response.setMessage("Usuarios obtenidos con éxito");
            response.setData(usuarios);
        }
        response.setStatus(HttpStatus.OK.value());
        return response;
    }

    public ResponseDTO obtenerUsuarioPorId(Long id) {
        logger.info("Obteniendo usuario con ID: {}", id);
        return usuarioRepository.findById(id)
                .map(value -> modelMapper.map(value, UsuarioDTO.class))
                .map(value -> new ResponseDTO(HttpStatus.OK.value(), "Usuario encontrado", value))
                .orElseGet(() -> {
                    logger.warn("Usuario con ID {} no encontrado", id);
                    return new ResponseDTO(HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
                });
    }

    public ResponseDTO actualizarUsuario(Long id, UsuarioDTO usuario) {
        logger.info("Actualizando usuario con ID: {}", id);
        ResponseDTO response = obtenerUsuarioPorId(id);
        if (response.getData() != null) {
            usuario.setId(id);

            UsuarioDTO usuarioEncontrado = (UsuarioDTO) response.getData();

            ResponseDTO usuarioUnico = esUsuarioUnico(usuario, usuarioEncontrado);
            if (usuarioUnico != null) {
                return usuarioUnico;
            }

            usuarioEncontrado.setNombres(Optional.ofNullable(usuario.getNombres())
                    .orElse(usuarioEncontrado.getNombres()));
            usuarioEncontrado.setApellidos(Optional.ofNullable(usuario.getApellidos())
                    .orElse(usuarioEncontrado.getApellidos()));
            usuarioEncontrado.setRut(Optional.ofNullable(usuario.getRut())
                    .orElse(usuarioEncontrado.getRut()));
            usuarioEncontrado.setDv(Optional.ofNullable(usuario.getDv())
                    .orElse(usuarioEncontrado.getDv()));
            usuarioEncontrado.setFechaNacimiento(Optional.ofNullable(usuario.getFechaNacimiento())
                    .orElse(usuarioEncontrado.getFechaNacimiento()));
            usuarioEncontrado.setCorreoElectronico(Optional.ofNullable(usuario.getCorreoElectronico())
                    .orElse(usuarioEncontrado.getCorreoElectronico()));
            usuarioEncontrado.setContrasena(Optional.ofNullable(usuario.getContrasena())
                    .orElse(usuarioEncontrado.getContrasena()));

            Usuario usuarioMap = modelMapper.map(usuarioEncontrado, Usuario.class);
            response = new ResponseDTO();
            response.setStatus(HttpStatus.OK.value());
            response.setMessage("Usuario actualizado con éxito");
            response.setData(modelMapper.map(usuarioRepository.save(usuarioMap), UsuarioDTO.class));
            return response;
        }
        logger.warn("Usuario con ID {} no encontrado", id);
        response.setStatus(HttpStatus.NOT_FOUND.value());
        response.setMessage("Usuario con ID " + id + " no encontrado");
        return response;
    }

    public ResponseDTO eliminarUsuario(Long id) {
        logger.info("Eliminando usuario con ID: {}", id);
        ResponseDTO response = new ResponseDTO();
        response = obtenerUsuarioPorId(id);
        if (response.getData() == null) {
            logger.warn("Usuario con ID {} no encontrado", id);
            response.setStatus(HttpStatus.NOT_FOUND.value());
            response.setMessage("Usuario con ID " + id + " no encontrado");
            return response;
        }
        usuarioRepository.deleteById(id);
        response.setStatus(HttpStatus.OK.value());
        response.setMessage("Usuario eliminado con éxito");
        return response;
    }

    private ResponseDTO esUsuarioUnico(UsuarioDTO usuario, UsuarioDTO usuarioEncontrado) {
        logger.info("Verificando unicidad de usuario");
        ResponseDTO response = new ResponseDTO();
        if (usuarioRepository.existsByCorreoElectronico(usuario.getCorreoElectronico()) &&
                (usuarioEncontrado == null
                        || !usuario.getCorreoElectronico().equals(usuarioEncontrado.getCorreoElectronico()))) {
            logger.warn("Usuario con correo {} ya existe", usuario.getCorreoElectronico());
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            response.setMessage("Usuario con correo " + usuario.getCorreoElectronico() + " ya existe");
            return response;
        }

        if (usuarioRepository.existsByRut(usuario.getRut()) &&
                (usuarioEncontrado == null || !usuario.getRut().equals(usuarioEncontrado.getRut()))) {
            logger.warn("Usuario con rut {} ya existe", usuario.getRut());
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            response.setMessage("Usuario con rut " + usuario.getRut() + " ya existe");
            return response;
        }

        return null;
    }
}
