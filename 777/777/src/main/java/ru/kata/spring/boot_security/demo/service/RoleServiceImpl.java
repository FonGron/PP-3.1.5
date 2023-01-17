package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService{

    private final RoleRepository RR;

    public RoleServiceImpl(RoleRepository rr) {
        RR = rr;
    }

    @Override
    public Role getRoleByName(String name) {
        return RR.getRoleByName(name);
    }
}
