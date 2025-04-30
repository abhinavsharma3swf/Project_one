package com.bridge.example.projectone.service;

import com.bridge.example.projectone.entity.Car;
import com.bridge.example.projectone.repository.CarRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

public class CarServiceTest {
    @Mock
    CarRepository carRepository;

    @InjectMocks
    CarService carService;

    Car car1;
    Car car2;
    List<Car> cars;

    @BeforeEach
    void setUp(){
        car1 = new Car("Toyota", "Rav4", 3, 4, false);
        car1.setId(1L);
        car2 = new Car("Honda", "Civic", 5, 40, true);
        cars = new ArrayList<>(List.of(car1,car2));
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldFetchAllCars(){
        when(carRepository.findAll()).thenReturn(cars);
        List<Car> carList = carService.fetchAllCars();
        verify(carRepository,times(1)).findAll();
        assertThat(carList).isEqualTo(cars);
    }

    @Test
    void shouldCreateNewCar(){
        when(carRepository.save(car1)).thenReturn(car1);
        Car actualCar = carService.createNewCar(car1);
        verify(carRepository,times(1)).save((any(Car.class)));
        assertThat(actualCar).isEqualTo(car1);
    }

    @Test
    void shouldDeleteCarWithAnId(){
        when(carRepository.existsById(1L)).thenReturn(true);
        carService.deleteCarById(1L);
        verify(carRepository).deleteById(1L);
    }

    @Test
    void shouldAcceptRequestToEditTheCar() {
        Car updateCar = new Car("VW", "GTI", 4, 5, true);
        updateCar.setId(1L);
        Mockito.when(carRepository.existsById(1L)).thenReturn(true);
        Mockito.when(carRepository.findById(1L)).thenReturn(Optional.of(car1));
        Mockito.when(carRepository.save(any(Car.class))).thenReturn(updateCar);
        Optional<Car> result = carService.updateCarItem(updateCar, 1L);
        assertThat(result.get()).isEqualTo(updateCar);
        verify(carRepository, times(1)).save(any(Car.class));
    }
}
