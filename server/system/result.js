const Result = {
    success(data) {
        return {
            code: 200,
            data: data ? data : "success"
        }
    },
    lackParam(param) {
        return {
            code: 400,
            data: `lack necessary param ${param}`
        }
    },
    forbidden(msg) {
        return {
            code: 403,
            data: msg
        }
    },
    error(msg) {
        return {
            code: 500,
            data : `error ${msg}`
        }
    }
}

module.exports = Result;