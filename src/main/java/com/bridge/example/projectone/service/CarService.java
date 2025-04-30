package com.bridge.example.projectone.service;

import com.bridge.example.projectone.entity.Car;
import com.bridge.example.projectone.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> fetchAllCars() {
        return carRepository.findAll();
    }

    public Car createNewCar (Car newCar){
        return carRepository.save(newCar);
    }

    public void deleteCarById(Long id) {
//        if(!carRepository.existsById(id))
//            throw new EntityNotFoundException("Car not found with this id: " + id);
        carRepository.deleteById(id);
    }

    public Optional<Car> updateCarItem(Car carWithNewValue, Long id){
        if(carRepository.existsById(id)){
            Car tempCar = carRepository.findById(id).orElse(null);
            tempCar.setMake(carWithNewValue.getMake());
            tempCar.setModel(carWithNewValue.getModel());
            tempCar.setPrice(carWithNewValue.getPrice());
            tempCar.setYear(carWithNewValue.getYear());
            tempCar.setUsed(carWithNewValue.isUsed());
            return Optional.of(carRepository.save(tempCar));
        }
        return Optional.of(carWithNewValue);
    }
}
