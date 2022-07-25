package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDAO {

    void saveUser(User user);

    void updateUser(User user);

    void deleteUser(long id);

    User getUserByLogin(String login);

    List<User> getAllUsers();

    User getUser(long id);
}