package com.bridge.example.projectone.controller;

import com.bridge.example.projectone.entity.Car;
import com.bridge.example.projectone.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public List<Car> fetchAllCars(){
        return carService.fetchAllCars();
    }

    @PostMapping
    public ResponseEntity<Car> createCar(@RequestBody Car newCar){
        return new ResponseEntity<>(carService.createNewCar(newCar), HttpStatus.CREATED);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Car> deleteCarById(@PathVariable Long id){
        carService.deleteCarById(id);
        return ResponseEntity.noContent().build();
    }
}
