const User = require("../models/User");

const getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const createUser = async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        let totalProgress = 0;

        if (user.skills.length > 0) {

            user.skills.forEach((skill) => {
                totalProgress += skill.progress;
            });

        }

        const completionPercentage =
            user.skills.length > 0
            ? totalProgress / user.skills.length
            : 0;

        res.json({

            name: user.name,
            email: user.email,
            role: user.role,
            skills: user.skills,
            weakAreas: user.weakAreas,
            assignments: user.assignments,
            completionPercentage

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateLearningProgress = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.skills = req.body.skills || user.skills;

        user.weakAreas = req.body.weakAreas || user.weakAreas;

        user.assignments =
            req.body.assignments || user.assignments;

        const updatedUser = await user.save();

        res.json(updatedUser);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getRecommendations = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        let recommendations = [];

        user.skills.forEach((skill) => {

            if (skill.progress < 50) {

                recommendations.push(
                    `Improve ${skill.skill} by practicing more projects`
                );

            }

        });

        user.weakAreas.forEach((area) => {

            recommendations.push(
                `Focus on improving weak area: ${area}`
            );

        });

        user.assignments.forEach((assignment) => {

            if (assignment.status === "Pending") {

                recommendations.push(
                    `Complete assignment: ${assignment.title}`
                );

            }

        });

        res.json({
            recommendations
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getDashboard,
    updateLearningProgress,
    getRecommendations
};