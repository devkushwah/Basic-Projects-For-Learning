const TODO = require('../models/todos');

exports.getTodo = async (req, res) => {
    try {
        const todo = await TODO.find();
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
        res.status(200).json({
            success: true,
            data: todo,
            message: 'Todo fetched successfully'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Server Error'
        })
    }
}

exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await TODO.findById(id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
        res.status(200).json({
            success: true,
            data: todo,
            message: 'Todo fetched successfully'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Server Error'
        })
    }
}