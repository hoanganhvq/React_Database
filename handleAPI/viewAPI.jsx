import axios from "axios";
const ip = '192.168.1.30';
const port = 3000;


export const listUsers = async () => {
    try {
        const response = await axios.get(`http://${ip}:${port}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const findUserById = async (id) => {
    try {
        const respone = await axios.get(`http://${ip}:${port}/users/${id}`);
        return respone.data;
    } catch (err) {
        console.error(err);
    };
}

export const addUser = async (name, email, phone, password) => {
    try {
        const response = await axios.post(`http://${ip}:${port}/users`, { name, email, phone, password });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const update = async(id, name, email, phone) =>{
    try{
        const response = await axios.put(`http://${ip}:${port}/users/${id}`, {name, email, phone});
        return response.data;
    } catch (error){
        console.error(error);
    }
}

export const deleteUserOut = async(id) =>{
    try{
        const response = await axios.delete(`http://${ip}:${port}/users/${id}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
}