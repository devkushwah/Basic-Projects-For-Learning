const Todo = require('../models/todos');

exports.updateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;

        if(!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title and description'
            })
        }
        const response = await Todo.findByIdAndUpdate(
                                                        { _id: id },
                                                        { title, description, updatedAt: Date.now() },
                                                        { new: true }
                                                        );

       if (!response) {
           return res.status(404).json({
               success: false,
               message: 'Todo not found'
           })
       }              
       res.status(200).json({
           success: true,
           data: response,
           message: 'Todo updated successfully'
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