package ru.kata.spring.boot_security.demo.repository;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

@Component
public interface UserRepository extends UserDetailsService {
    List<User> getAllUsers();
    User getUserById(Long id);
    void deleteUser(Long id);
    void addUser(User user);
    void editUser(User user);
}

