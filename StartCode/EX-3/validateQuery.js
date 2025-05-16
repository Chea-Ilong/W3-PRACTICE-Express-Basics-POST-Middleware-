const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    // Validate if minCredits and maxCredits are valid integers
    if (minCredits && isNaN(parseInt(minCredits))) {
        return res.status(400).json({
            error: 'minCredits must be a valid integer'
        });
    }

    if (maxCredits && isNaN(parseInt(maxCredits))) {
        return res.status(400).json({
            error: 'maxCredits must be a valid integer'
        });
    }

    // Validate credit range
    if (minCredits && maxCredits) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (min > max) {
            return res.status(400).json({
                error: 'Invalid credit range: minCredits cannot be greater than maxCredits'
            });
        }
    }

    next();
};

export default validateQuery;