'use strict'
const db = require ('./con')
const bcrypt = require('bcryptjs')

class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
//private Method can use double under ___checkPassword
    async checkPassword(hashedPassword) {
    //returns true/false
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async save() {
        try{
            const response = await db.one('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;', [this.name, this.email, this.password])
            return response;

        } catch (error) {
            console.error("Error", error.message);
            return error.message;
        }
    }

    async login() {
        try {
            const response = await db.one(`SELECT id, name, email, password FROM users WHERE email = $1`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            if(!!isValid) {
                //if(isValid === absolutely, completely, totally, like really, really true)
                const { name, id } = response;
                return { isValid, name, user_id: id }        
            } else {
                return { isValid }
            }
        } catch (error) {
            console.error("ERROR:", error.message);
            return error.message;
        }
    }
}

module.exports = UserModel;