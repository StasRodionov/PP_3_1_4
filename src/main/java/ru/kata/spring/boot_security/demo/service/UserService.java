package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {

    void saveUser(User user);

    void updateUser(User user);

    void deleteUser(long id);

    User getUserByLogin(String login);

    List<User> getAllUsers();

    User getUser(long id);

}
