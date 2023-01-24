const url = process.env.COMP_URL

module.exports = {
    index
};

function index(req, res, next) {
    fetch("https://kontests.net/api/v1/all")
        .then(res => res.json())
        .then(compInfo => {
            let value = 3600;
            res.render('competitions/index', { title: 'Code Universe', compInfo, value })
        });
}