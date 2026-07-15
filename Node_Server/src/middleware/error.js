import winston from 'winston';
export function error(err, req, res, next) {
    // console.log(err);
    winston.error(err.message, err);
    //loging level
    //error, warn, info, verbose, debug, silly
    res.status(500).send('Internal Server Error');
}