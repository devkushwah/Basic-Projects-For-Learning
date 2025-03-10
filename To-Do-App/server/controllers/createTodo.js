const TODO = require('../models/todos');

exports.createTodo = async(req,res) => {

    try {
        const { title, description } = req.body;
    
        if(!title || !description) {
            return res.status(400).json({    
                sucees: false,            
                message: 'Please provide title and description'
            })
    
        }
        const response = await TODO.create({ title, description });        
        res.status(200).json({
            success: true,
            data: response,
            message: 'Todo created successfully'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}