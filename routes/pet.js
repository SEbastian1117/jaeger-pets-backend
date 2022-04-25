const { Router } = require('express')
const { createPet, checkPets, checkPet, updatePet, deletePet } = require('./../controllers/pet')
const router = Router()

router.post('/new-pet', createPet)

router.get('/new-pet/check', checkPets)

router.get('/new-pet/:id' , checkPet)

router.put('/update/:id', updatePet)

router.delete('/delete/:id', deletePet)

module.exports = router

