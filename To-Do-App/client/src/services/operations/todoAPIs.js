import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
    CREATETODO_API,
    UPDATETODO_API,
    GETTODO_API,
    GETTODOBYID_API,
    DELETETODO_API,
} = endpoints

export const createTodo = async (title, description) => {
    try {
        const response = await apiConnector.post(CREATETODO_API, { title, description })
        return response
    } catch (error) {
        return error
    }
}

export const updateTodo = async (id, title, description) => {
    try {
        const response = await apiConnector.put(UPDATETODO_API.replace(':id', id), { title, description })
        return response
    } catch (error) {
        return error
    }
}

export const getTodo = async () => {
    try {
        const response = await apiConnector.get(GETTODO_API)
        return response
    } catch (error) {
        return error
    }
}

export const getTodoById = async (id
) => {
    try {
        const response = await apiConnector.get(GETTODOBYID_API.replace(':id', id))
        return response
    } catch (error) {
        return error
    }
}

export const deleteTodo = async (id) => {
    try {
        const response = await apiConnector.delete(DELETETODO_API.replace(':id', id))
        return response
    } catch (error) {
        return error
    }
}

