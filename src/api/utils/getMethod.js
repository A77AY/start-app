import structure from '../structure'

export default (url, content) => {
    const urlParts = url.split('/').slice(1);
    let caller = structure;
    for (const urlPart of urlParts) {
        if (caller[urlPart]) {
            caller = caller[urlPart];
        } else {
            return new Promise((res, rej)=>{
                res({
                    error: 'not found'
                });
            });
        }
    }
    return typeof caller === 'function'
        ?  caller(content)
        : new Promise((res, rej)=>{
        res({
            error: 'you to use ' + urlParts[urlParts.length - 1] + ' api'
        });
    });
}