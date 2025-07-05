
const authorizeRole = (allowedRoles) => {

    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {

            return res.status(403).json({ message: 'Acesso negado' });

        }

        next();

    };

};

export default authorizeRole;