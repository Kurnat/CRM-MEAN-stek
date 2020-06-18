const Position = require('../models/Position');
const errorHendler = require('../utils/errorHendler');

module.exports.getByCategoryId = async (req, res) => {
    try{
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })

        res.status(200).json(positions)
    } catch(error) {
        errorHendler(respons, error);
    }
};

module.exports.create = async (req, res) => {
    try{
        const position = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save();

        res.status(200).json(position);
    } catch(error) {
        errorHendler(respons, error);
    }
};

module.exports.update = async (req, res) => {
    try{
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},   //  Find data by...
            {$set: req.body},   // Update data insade MongoDb
            {new: true} // Update data and only after this return data
            );
        res.status(200).json(position)
    } catch(error) {
        errorHendler(respons, error);
    }
};

module.exports.remove = async (req, res) => {
    try{
        await Position.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиція була успішно видалена'
        });
    } catch(error) {
        errorHendler(respons, error);
    }
};