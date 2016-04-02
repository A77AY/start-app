import getMethod from './utils/getMethod'

const route = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    getMethod(req.url, req.body).then((result)=>{
        res.status(200).send(result);
    });
};

export default {
    route
}