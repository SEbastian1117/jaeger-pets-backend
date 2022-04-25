const Pet = require('./../models/Pet')
const { response } = require('express')

//crear nueva mascota
const createPet = async(req, res = response) => {
    const {name} = req.body
    try {
        let myPet = await Pet.findOne( { name } )
        if(myPet) return res.status(400).json({
            ok: false,
            msg: 'The pet is already exist!'
        })
        myPet = new Pet(req.body)
        await myPet.save()
        res.status(200).json({
            ok: true,
            msg: 'The pet has been create succesfuly'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred, please contact to support'
        })
    }
}

//consultar mascotas
const checkPets = async(req, res = response) => {
    try {
        const myPet = await Pet.find()
        if(myPet) return res.json({
            ok: true,
            myPet
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'We did not find any pets'
        })
    }
}

const checkPet = async(req, res = response) => {
    try {
        const myPet = await Pet.findById(req.params.id)
        if(!myPet) return res.status(400).json({
            ok: false,
            msg: 'The pet doesnt exist in our system'
        })
        res.status(200).json({
            ok: true,
            myPet
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'We did not find any pets'
        })
    }
}

//actualizar mascota
const updatePet = async(req, res = response) => {
    const { photo } = req.body
    try {
        
        let myPet = await Pet.findById(req.params.id)

        if(!myPet) return res.status(404).json({
            ok: false,
            msg: 'There is no any pet to update'
        })

        myPet.photo = photo
        myPet = await Pet.findOneAndUpdate({_id: req.params.id} , myPet, {new: true})
        res.status(200).json({
            ok: true,
            myPet
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred, please contact to support'
        })
    }
}

//eliminar mascota
const deletePet = async(req, res = response) => {
    try {
        const pet = await Pet.findById(req.params.id)
        if(!pet) return res.status(404).json({
            ok: false,
            msg: 'The pet doesnt exist in our system!'
        })
        await Pet.findByIdAndRemove({_id: req.params.id})
        res.json({
            ok: true,
            msg: 'The pet has been deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'An error has ocurred, please contact to support'
        })
    }
}

module.exports = {
    createPet,
    checkPets,
    checkPet,
    updatePet,
    deletePet
}