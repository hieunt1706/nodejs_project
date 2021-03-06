const express = require('express')
const categoryModel=require('../models/category.model')
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const categories = await categoryModel.find()
        res.render('categories/list', {categories: categories})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async(req, res) => {
    try {
        const categoryNew = new categoryModel({
            name: req.body.name,
        })
        await categoryNew.save()
        res.redirect('/category')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/add', async(req, res) => {
    const category=new categoryModel()
    res.render('categories/add',{category:category})
})

router.get('/edit/:id', async(req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id)
        res.render('categories/edit', { category: category })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.put('/:id', async(req, res) => {
    try {
        let category = await categoryModel.findById(req.params.id)
        category.name = req.body.name
        await category.save()
        res.redirect('/category')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id)
        await category.remove()
        res.redirect('/category')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router