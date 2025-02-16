package com.previred.api.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.previred.api.dtos.ResponseDTO;
import com.previred.api.dtos.UsuarioDTO;
import com.previred.api.services.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final Logger logger = LoggerFactory.getLogger(UsuarioController.class);
    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<ResponseDTO> crearUsuario(@RequestBody UsuarioDTO usuario) {
        logger.info("Creando nuevo usuario: {}", usuario);
        ResponseDTO response = usuarioService.crearUsuario(usuario);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping
    public ResponseEntity<ResponseDTO> obtenerTodosLosUsuarios() {
        logger.info("Obteniendo todos los usuarios");
        ResponseDTO response = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> obtenerUsuarioPorId(@PathVariable Long id) {
        logger.info("Obteniendo usuario por ID: {}", id);
        ResponseDTO response = usuarioService.obtenerUsuarioPorId(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO usuario) {
        logger.info("Actualizando usuario con ID: {}", id);
        ResponseDTO response = usuarioService.actualizarUsuario(id, usuario);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> eliminarUsuario(@PathVariable Long id) {
        logger.info("Eliminando usuario con ID: {}", id);
        ResponseDTO response = usuarioService.eliminarUsuario(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
