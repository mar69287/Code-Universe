const url = process.env.NEWS_URL

module.exports = {
    index
};

function index(req, res, next) {
    fetch("https://newsapi.org/v2/everything?q=Programming&from=2023-01-01&sortBy=relevancy&apiKey=e57c19337c124e52a59bc9d832327d12")
        .then(res => res.json())
        .then(newsInfo =>
            // console.log(info.articles[0].author)
            res.render('index', { title: 'Code Universe', newsInfo }));
    // res.render('index', { title: 'Code Universe' })
}

