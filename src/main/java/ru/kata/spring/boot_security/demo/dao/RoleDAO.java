package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleDAO {

    Role getByName(String name);

    List<Role> getAllRoles();

    List<Role> findRolesByName(String name);

}