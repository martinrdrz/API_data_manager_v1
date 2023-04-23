const error = (message) => ({
    response: "Error",
    message: message,
});

const ok = (message = "", data = {}) => ({
    response: "OK",
    message: message,
    data: data,
});

module.exports = {
    ok,
    error,
};
