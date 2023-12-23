exports.requestMiddleware = (req, res, next) => {
    performTask1(req, res);
    next();
}

function performTask1(req, res) {
}