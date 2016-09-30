class BaseController {
    constructor(Model) {
        this.Model = Model;
    }

    getOne(req, res, next) {
        const id = req.params.id;

        return this.Model.findById(id)
            .then((instance) => {
                return res.status(200).send(instance);
            })
            .catch(next);
    }

    getAll(req, res, next) {
        return this.Model.find()
            .then((instances) => {
                return res.status(200).send(instances);
            })
            .catch(next);
    }


    create(req, res, next) {
        const data = req.body;

        return this.Model.create(data)
            .then((instance) => {
                return res.status(200).send(instance);
            })
            .catch(next);
    }

    update(req, res, next) {
        const id = req.params.id;
        const data = req.body;

        return this.Model.findById(id)
            .then((instance) => {
                const updatedInstance = Object.assign(instance, data);

                return updatedInstance.save();
            })
            .then((instance) => {
                return res.status(200).send(instance);
            })
            .catch(next);
    }

    remove(req, res, next) {
        const id = req.params.id;

        return this.Model.remove({ _id: id })
            .then((result) => {
                return res.status(200).send(result);
            })
            .catch(next);
    }
}
module.exports = BaseController;