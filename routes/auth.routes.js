const {Router}  = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Некорректно введен email адресс').isEmail(),
        check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, passowrd} = req.body

        const candidate = await User.findOne({email})
        if (candidate) {
            return res.statis(400).json({message: 'Такой пользователь уже существует... '})
        }

        const hashedPassword = await bcrypt.hash(passowrd, 12)
        const user = new User({email, hashedPassword})
        await user.save()

        res.status(201).json({message: 'Успешно! Пользователь создан!'})


    } catch (e) {
        res.status(500).json({message: 'Ошибка при регистраци... Попробуйте чуть позже.'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Введите корректно email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], 
    async (req, res) => {
    try {

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }
        
        const {email, password} = req.body
        
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'Пользователен не найден'})
        }
        const isMatch = await bcrypt.compare(password, user.passowrd)
        
        if (!isMatch) {
            return res.status(400).json({message: 'Неверные данные при входе'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        req.status(200).json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте позже.'})
    }
})

module.exports = router