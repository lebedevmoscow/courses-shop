const {Router} = require('express')
const shortid = require('shortid')
const config = require('config')
const authMiddleware = require('./../middleware/auth.middleware')
const Link = require('./../models/Link')

router = Router()

router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {to} = req.body
        //const {from} = req.body
        
        const code = shortid.generate()
        const existing = await Link.findOne({to})
        //const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const from = baseUrl + '/t/' + code
        //const to = baseUrl + '/t/' + code
        console.log('from', from)
        console.log('to', to)

        const link = new Link({code, to, from, owner: req.user.userId})
        await link.save()
        res.status(201).json({link})

    } catch (e) {
        console.log('e', e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте позже. (link.routes)'})
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте позже.'})
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте позже.'})
    }
})

module.exports = router