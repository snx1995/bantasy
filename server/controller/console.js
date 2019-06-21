
const Console = {
    "/console": {
        method: "GET",
        handler(req, res) {
            const ins = req.query.i;
            res.send({code: 0, data: `consoel ${ins}`})
        }
    }
}