export default function badRequest(log = '') {
    return new Promise((res, rej)=> {
        res({error: 'bad request'})
    });
}