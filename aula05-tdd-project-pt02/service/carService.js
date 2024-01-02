const BaseRepository = require('./base/baseRepository');

class CarService {
      constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
      }
      
    getRandomPositionFromArray(list) {
        const listLength = list.length;
        return Math.floor(
          Math.random() * (listLength - 1) + 1)
    };
      async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory);
        const cars = this.carRepository.find(carId);
        const availableCar = cars.find(car => car.available && carCategory.carIds.includes(car.id));
        return availableCar;
      }
}

module.exports = CarService;