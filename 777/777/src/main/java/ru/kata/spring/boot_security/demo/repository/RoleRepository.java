package ru.kata.spring.boot_security.demo.repository;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;

@Component
public interface RoleRepository {
    Role getRoleByName(String name);
}

