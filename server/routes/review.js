const Review = require("../models/review");
const User = require("../models/user");

module.exports = function (router) {
    const reviewRoute = router.route("/reviews");

    reviewRoute.get(async (req, res) => {
        try {
            let {where, sort, select, skip, limit, count} = req.query;
            where = where ? JSON.parse(where) : {};
            sort = sort ? JSON.parse(sort) : {};
            select = select ? JSON.parse(select) : {};
            skip = skip ? Number(skip) : 0;
            limit = limit ? Number(limit) : Number.MAX_SAFE_INTEGER;
            count = (count === 'true');
            let reviews;
            if (count) {
                reviews = await Review.count(where).sort(sort).select(select).skip(skip).limit(limit);
            } else {
                reviews = await Review.find(where).sort(sort).select(select).skip(skip).limit(limit);
            }
            res.status(200).json({message: "OK", "data": reviews});
        } catch (error) {
            res.status(500).json({message: "Server error!"});
        }
    });

    reviewRoute.post(async (req, res) => {
        const review = new Review(req.body);
        try {
            const data = await review.save();
            if (data.username !== "unassigned" || data.userID !== "") {
                let filter;
                if (data.username !== "unassigned") {
                    filter = {username: data.username};
                } else {
                    filter = {_id: data.userID};
                }
                const user = await User.findOne(filter);
                const updateReview = {
                    userID: user._id,
                    username: user.username
                };
                const review = await Review.findByIdAndUpdate(
                    data._id, updateReview, {new: true}
                );
                const updateUser = {
                    "$addToSet": {"reviews": review._id}
                };
                await User.findOneAndUpdate(filter, updateUser);
            }
            res.status(201).json({message: "Review created!", "data": data});
        } catch (error) {
            res.status(400).json({message: "Failed to create review"});
        }
    });

    const reviewIdRoute = router.route("/review/:id");

    reviewIdRoute.get(async (req, res) => {
        try {
            let select = req.query.select;
            select = select ? JSON.parse(select) : {};
            const review = await Review.findById(req.params.id).select(select);

            if (review === null) {
                res.status(404).json({message: "Review not found!"});
            } else {
                res.status(200).json({message: "OK", "data": review});
            }
        } catch (error) {
            res.status(404).json({message: "Review not found!"});
        }
    });

    reviewIdRoute.put(async (req, res) => {
        try {
            const id = req.params.id;
            const update = req.body;

            let review = await Review.findByIdAndUpdate(
                id, update, {new: true}
            );

            if (review.username !== "unassigned" || review.userID !== "") {
                let filter;
                if (review.username !== "unassigned") {
                    filter = {username: review.username};
                } else {
                    filter = {_id: review.userID};
                }
                const user = await User.findOne(filter);
                const updateReview = {
                    userID: user._id,
                    username: user.name
                };
                review = await Review.findByIdAndUpdate(
                    id, updateReview, {new: true}
                );
                const updateUser = {
                    "$pull": {"reviews": review._id}
                };
                await User.findOneAndUpdate(filter, updateUser);
            } else {
                const updateReview = {
                    userID: "",
                    username: "unassigned"
                };
                review = await Review.findByIdAndUpdate(
                    id, updateReview, {new: true}
                );
            }

            if (review === null) {
                res.status(404).json({message: "Review not found!"});
            } else {
                res.status(200).json({message: "Review updated!", "data": review});
            }
        } catch (error) {
            res.status(404).json({message: "Review not found!"});
        }
    });

    reviewIdRoute.delete(async (req, res) => {
        try {
            const id = req.params.id;
            const review = await Review.findByIdAndDelete(id);
            if (review.username !== "unassigned") {
                const filter = {name: review.username};
                const update = {"$pull": {"reviews": review._id}};
                await User.findOneAndUpdate(filter, update);
            }
            res.status(200).json({message: `Review '${id}' has been deleted!`});
        } catch (error) {
            res.status(404).json({message: "Review not found!"});
        }
    });

    return router;
}
