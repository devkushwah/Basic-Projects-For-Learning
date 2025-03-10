const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
 
  CREATETODO_API: BASE_URL + "/create",
  UPDATETODO_API: BASE_URL + "/update/:id",
  GETTODO_API: BASE_URL + "/getTodo",
  GETTODOBYID_API: BASE_URL + "/getTodo/:id",
  DELETETODO_API: BASE_URL + "/delete/:id",
  
}
