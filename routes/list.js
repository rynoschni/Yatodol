const db = require('../models/con')
const express = require('express'),
    router = express.Router(); //First two lines of all routes

const listModel = require('../models/listModel');


router.get('/', async (req, res) => {
    const listData = await listModel.getAll();
    console.log(listData)
    // const statusData = await languageModel.getAllStatus();
    
    return res.render('template', {
        locals: {
            title: `Today's list`,
            data: listData,
            is_logged_in: req.session.is_logged_in,
            // statusData: statusData,
        },
        partials: {
            partial: 'partial-list'
        }
        })
});

router.post('/', async (req, res) =>{
    // const reviewer_id = req.session.user_id
    const{task, due_date} = req.body;
    
    await listModel.addTask(task, due_date, req.session.user_id);
    console.log(req.body);
    console.log(req.session.user_id);
    res.redirect('/list');
});

// router.post('/', async (req, res) =>{
//     // const reviewer_id = req.session.user_id
//     const{task, due_date} = req.body;
    
//     await listModel.addTask(task, due_date, req.session.user_id);
//     console.log(req.body);
//     // console.log(req.session.user_id);
//     res.redirect('/list');
// });

module.exports = router;  //last line of all routes