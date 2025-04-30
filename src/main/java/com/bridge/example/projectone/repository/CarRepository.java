package com.bridge.example.projectone.repository;

import com.bridge.example.projectone.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {

}
