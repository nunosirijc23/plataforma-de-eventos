function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":");
    return Number((hour * 60) + minutes);
}

module.exports = { convertHoursToMinutes };