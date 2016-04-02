function send(method, url, content) {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = () => {
            if (req.status == 200) {
                resolve(JSON.parse(req.response));
            }
            else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = () => {
            reject(Error("Network Error"));
        };
        req.send(JSON.stringify(content));
    });
}

export default (url, content = {}) => {
    return send('POST', '/api' + url, content);
};