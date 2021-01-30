const express = require('express');
const multer = require('multer');


const Post = require('./../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, './backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.') + ext; 
    }
}); 


router.post('', multer(storage).single('image'),(req, res, next) => {
    Post.create(req.body).then(() => {
        res.status(201).json({
            message: 'Post added successfully'
        })
    });
})

router.get('', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.sort({createdAt: -1}).then(documents => {
       console.log(documents); 
       res.status(200).json({
           message: 'Posts fetched successfully',
           posts: documents
       });
    });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({message: 'Post deleted!!!'}) 
    }) 
});

router.put('/:id', (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, req.body).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Updated successfully',
            postAfterEdit: req.body
    });
    })
})


module.exports = router;