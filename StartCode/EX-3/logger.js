import { format } from 'date-fns';

const logger = (req, res, next) => {
    const timestamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    const method = req.method;
    const path = req.originalUrl;
    const query = JSON.stringify(req.query);

    console.log(`[${timestamp}] ${method} ${path} Query: ${query}`);
    next();
};

export default logger;