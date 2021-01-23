const express = require('express');
const multer = require('multer');


const Post = require('./../models/post');

const router = express.Router();



router.post('/api/posts', (req, res, next) => {
    Post.create(req.body).then(() => {
        res.status(201).json({
            message: 'Post added successfully'
        })
    });
})

router.get('/api/posts',(req, res, next) => {
    Post.find().sort({createdAt: -1}).then(documents => {
       console.log(documents); 
       res.status(200).json({
           message: 'Posts fetched successfully',
           posts: documents
       });
    });
});

router.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({message: 'Post deleted!!!'}) 
    }) 
});

router.put('/api/posts/:id', (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, req.body).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Updated successfully',
            postAfterEdit: req.body
    });
    })
})


module.exports = router;