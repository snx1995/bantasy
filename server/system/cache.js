// TODO use redis

const storage = {}

module.exports = {
    store(id, data, update = true) {
        // id = storeId, data = data to store
        // update = update data or not when id already exists
        // id and data can not be null
        if (!id || !data || !update && storage[id]) return;
        storage[id] = data;
    },
    load(id) {
        return storage[id];
    }
}