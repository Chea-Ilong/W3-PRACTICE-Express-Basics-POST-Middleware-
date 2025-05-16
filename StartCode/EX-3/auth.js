const auth = (req, res, next) => {
    const { token } = req.query;
    const VALID_TOKEN = 'xyz123'; 

    if (!token || token !== VALID_TOKEN) {
        return res.status(401).json({
            error: 'Unauthorized: Invalid or missing token'
        });
    }

    next();
};

export default auth;