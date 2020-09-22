const db = require('../models/con')
const express = require('express'),
    router = express.Router(); //First two lines of all routes

const listModel = require('../models/listModel');


router.get('/:id?', async (req, res) => {
    const singleData = await listModel.getOne(req.params.id);
    console.log(singleData)
    // const statusData = await languageModel.getAllStatus();
    
    return res.render('template', {
        locals: {
            title: `Today's list`,
            data: singleData,
            is_logged_in: req.session.is_logged_in,
            // statusData: statusData,
        },
        partials: {
            partial: 'partial-business'
        }
        })
});

router.post('/:id?', async (req, res) =>{
    // const reviewer_id = req.session.user_id
    const{task, due_date} = req.body;
    
    await listModel.addReview(task, due_date);
    console.log(req.body);
    // console.log(req.session.user_id);
    res.redirect('back');
});

module.exports = router;  //last line of all routes