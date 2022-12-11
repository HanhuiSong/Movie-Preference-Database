const User = require('../models/user');

module.exports = function(router) {
    const userRoute = router.route('/users');

    userRoute.get(async (req, res) => {
        try {
            let {where, sort, select, skip, limit, count} = req.query;
            where = where ? JSON.parse(where) : {};
            sort = sort ? JSON.parse(sort) : {};
            select = select ? JSON.parse(select) : {};
            skip = skip ? Number(skip) : 0;
            limit = limit ? Number(limit) : Number.MAX_SAFE_INTEGER;
            count = (count === 'true');
            let users;
            if (count) {
                users = await User.count(where).sort(sort).select(select).skip(skip).limit(limit);
            } else {
                users = await User.find(where).sort(sort).select(select).skip(skip).limit(limit);
            }

            res.status(200).json({message: "OK", "data": users});
        } catch (error) {
            res.status(500).json({message: "Server error!"});
        }
    });

    userRoute.post(async (req, res) => {
        const user = new User(req.body);
        try {
            const data = await user.save();
            res.status(201).json({message: "User created!", "data": data});
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({message: "Failed to create user, please try a different username or email!"});
            } else {
                res.status(400).json({message: "Failed to create user, username and password required!"});
            }
        }
    });

    const userIdRoute = router.route("/users/:id");

    userIdRoute.get(async (req, res) => {
        try {
            let select = req.query.select;
            select = select ? JSON.parse(select) : {};
            const user = await User.findById(req.param.id).select(select);

            if (user === null) {
                res.status(404).json({message: "User not found!"});
            } else {
                res.status(200).json({message: "OK", "data": user});
            }
        } catch (error) {
            res.status(404).json({message: "User not found!"});
        }
    });

    userIdRoute.put(async (req, res) => {
        try {
            const id = req.params.id;
            const update = req.body;

            const user = await User.findByIdAndUpdate(
                id, update, {new: true}
            );

            if (user === null) {
                res.status(404).json({message: "User not found!"});
            } else {
                res.status(200).json({message: "User updated!", "data": user});
            }
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({message: "Failed to update user, please try a different username or email!"});
            } else {
                res.status(404).json({message: "User not found!"});
            }
        }
    });

    userIdRoute.delete(async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndDelete(id);
            res.status(200).json({message: `User '${user.username}' has been deleted.`});
        } catch (error) {
            res.status(404).json({message: "User not found!"});
        }
    });

    return router;
}
