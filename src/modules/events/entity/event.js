const { v4: uuidV4 } = require('uuid');

class Event {
    constructor(name, date, startTime, endTime, price, capacity, province, county, district, street, description, categoryId, producerId) { 
        if (!this.id) {
            this.id = uuidV4();
        }
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.photo = "events.png";
        this.capacity = capacity;
        this.province = province;
        this.county = county;
        this.street = street;
        this.district = district;
        this.description = description;
        this.categoryId = categoryId;
        this.producerId = producerId;
        this.createdAt = new Date();
    }

    setValues(id, name, date, startTime, endTime, price, capacity, province, county, district, street, description, categoryId, producerId, createdAt) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.capacity = capacity;
        this.province = province;
        this.county = county;
        this.district = district;
        this.street = street;
        this.description = description;
        this.categoryId = categoryId;
        this.producerId = producerId;
        this.createdAt = createdAt;
    }
}

module.exports = Event;