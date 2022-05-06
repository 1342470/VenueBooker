
const updateByid = (theId, newUsername, newLastName, NewContact, newGender, newDate, newVenue, newTimeSlot, arr) => {
    const requiredIndex = arr.findIndex(el => {
        return el.id === Number(theId);
    });
    if (requiredIndex === -1) {
        return false;
    };
    if (arr[requiredIndex].id === theId) {
        if (newUsername != null) {
            arr[requiredIndex].first_name = newUsername;
            return;
        }
    }
    if (arr[requiredIndex].id === theId) {
        if (newLastName != null) {
            arr[requiredIndex].last_name = newLastName;
            return;
        }
    }
    if (arr[requiredIndex].id === theId) {
        if (NewContact != null) {
            arr[requiredIndex].contact = NewContact;
            return;
        }
    }
    if (arr[requiredIndex].id === theId) {
        if (newGender != null) {
            arr[requiredIndex].gender = newGender;
            return;
        }
    }
    if (jsonObj[requiredIndex].id === theId) {
        if (newDate != null) {
            arr[requiredIndex].date = newDate;
            return;
        }
    }
    if (arr[requiredIndex].id === theId) {
        if (newVenue != null) {
            arr[requiredIndex].venue = newVenue;
            return;
        }
    }
    if (arr[requiredIndex].id === theId) {
        if (newTimeSlot != null) {
            arr[requiredIndex].timeSlot = newTimeSlot;
            return;
        }
    }
};

module.exports = { updateByid };




