(function () {
    axios.get("/do/auth/info?id=5ceb8e3ef9e9283750d1d807")
        .then(res => {
            console.log(res);
        })
})();