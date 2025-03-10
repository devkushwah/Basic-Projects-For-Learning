const TODO = require('../models/todos');

exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await TODO.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
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