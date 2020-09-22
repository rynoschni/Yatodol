const { static } = require('express');
const { query } = require('./con');
const db = require('./con');

class TaskList {
    constructor (task, due_date, completed, repeat, user_id) {
        this.task = task;
        this.due_date = due_date;
        this.completed = completed;
        this.repeat = repeat;
        this.user_id = user_id;
    }

    static async getAll() {
        try {
            const response = await db.any(`SELECT * FROM task_list;`);
            return response;
        } catch(error) {
            return error.message;
        }
    }

    // static async getOne(slug){
    //     try{
    //         const response = await db.one(`SELECT * FROM restaurant WHERE slug = '${slug}';`);
    //         return response;

    //     } catch(error){
    //         console.error('Error: ', error);
    //         return error;
    //     }
    // }

    static async addTask(task, due_date) {
        try {
            const response = await db.result(`INSERT INTO task_list (task, due_date) VALUES ($1, $2);`, [task, due_date]);
            return response;
        } catch(error){
            console.log("Error:", error);
        }
    }
}



module.exports = TaskList;
