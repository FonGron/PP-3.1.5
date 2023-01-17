package ru.kata.spring.boot_security.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository{
    @PersistenceContext
    @Resource
    private EntityManager entityManager;

    protected EntityManager getEntityManager() {
        return this.entityManager;
    }
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Transactional
    public void addUser(User user_reg) {
        User user = new User(user_reg.getFirstName(),user_reg.getLastName(), user_reg.getEmail(),
                passwordEncoder.encode(user_reg.getPassword()),user_reg.getRoles());
        getEntityManager().persist(user);
    }

    @Transactional
    public void editUser(User user) {
        entityManager.merge(user);
    }

    @Transactional
    public List<User> getAllUsers() {
        return getEntityManager()
                .createQuery("select u from User u", User.class)
                .getResultList();
    }

    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = entityManager.createQuery("SELECT u FROM User u join fetch u.roles where u.email = :name", User.class)
                .setParameter("name", username)
                .getSingleResult();
        return user;
    }

    @Transactional
    public User getUserById(Long id) {
        return getEntityManager().find(User.class, id);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = getEntityManager().find(User.class, id);
        this.entityManager.remove(user);
        this.entityManager.flush();
    }

}

