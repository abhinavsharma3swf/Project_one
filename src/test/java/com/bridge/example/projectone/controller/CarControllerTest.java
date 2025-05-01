package com.bridge.example.projectone.controller;
import com.bridge.example.projectone.entity.Car;
import com.bridge.example.projectone.repository.CarRepository;
import com.bridge.example.projectone.service.CarService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;



import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CarController.class)
public class CarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CarService carService;

    Car car1;
    Car savedCar;
    Car updatedCar;
    List<Car> cars = new ArrayList<>();

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp(){
        car1 = new Car("Toyota", "Rav4", 3, 4, false);
        savedCar = new Car("Honda", "Civic", 5, 400, true);
        savedCar.setId(1L);
        cars = new ArrayList<>(List.of(car1,savedCar));
        Mockito.when(carService.createNewCar(Mockito.any(Car.class))).thenReturn(savedCar);
        Mockito.when(carService.fetchAllCars()).thenReturn(cars);
    }

    @Test
    void shouldAcceptRequestToFetchAllCars() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/car"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldAcceptPostRequestToCreateCar() throws Exception{
        String savedCarJson = objectMapper.writeValueAsString(savedCar);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/car")
                .contentType(MediaType.APPLICATION_JSON)
                .content(savedCarJson))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.make").value("Honda"))
                .andExpect(jsonPath("$.model").value("Civic"))
                .andExpect(jsonPath("$.year").value(5))
                .andExpect(jsonPath("$.price").value(400))
                .andExpect(jsonPath("$.used").value(true));
    }

    @Test
    void shouldAcceptRequestToDeleteACar() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/car/1"))
                .andExpect(status().is2xxSuccessful());
        Mockito.verify(carService,times(1)).deleteCarById(1L);
    }

    @Test
    void shouldAcceptRequestToEditTheCar() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/car/1"))
                .andExpect(status().is2xxSuccessful());
    }
}
