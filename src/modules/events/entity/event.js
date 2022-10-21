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
        this.createAt = new Date();
    }

    setValues(id, name, date, startTime, endTime, price, photo, capacity, province, county, district, street, description, categoryId, producerId, createAt) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.photo = photo;
        this.capacity = capacity;
        this.province = province;
        this.county = county;
        this.district = district;
        this.street = street;
        this.description = description;
        this.categoryId = categoryId;
        this.producerId = producerId;
        this.createAt = createAt;
    }
}

module.exports = Event;