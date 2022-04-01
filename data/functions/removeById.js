/**
 * 
 * @param {*} arr get the json arrar that you wish to get the data to remove
 * @param {*} id is the id that will be serached for in the arrar to be removed
 * @returns if not found function will either return false if id is not found or true if found which will then remove the object with a matching id.
 */
const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
        return el.id === Number(id);
    });
    if (requiredIndex === -1) {
        return false;
    };
    return !!arr.splice(requiredIndex, 1);
};

module.exports = { removeById };