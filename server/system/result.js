const Result = {
    success(data) {
        return {
            code: 0,
            data: data ? data : "success"
        }
    },
    lackParam(param) {
        return {
            code: 1,
            data: `lack necessary param ${param}`
        }
    },
    forbidden(msg) {
        return {
            code: 2,
            data: msg
        }
    },
    error(msg) {
        return {
            code: -1,
            data : "error" + (msg ? ` ${msg}` : "")
        }
    }
}

module.exports = Result;