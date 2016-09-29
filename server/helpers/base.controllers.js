class BaseController {
    constructor(Model) {
        this.Model = Model;
    }

    getOne(req, res, next) {
        const id = req.params.id;

        return this.Model.findById(id)
            .then((flow) => {
                return res.status(200).send(flow);
            })
            .catch(next);
    }

    getAll(req, res, next) {
        return this.Model.find()
            .then((flows) => {
                return res.status(200).send(flows);
            })
            .catch(next);
    }


    create(req, res, next) {
        const flow = req.body;

        return this.Model.create(flow)
            .then((flow) => {
                return res.status(200).send(flow);
            })
            .catch(next);
    }

    update(req, res, next) {
        const id = req.params.id;
        const data = req.body;

        return this.Model.findById(id)
            .then((flow) => {
                const updatedInstance = Object.assign(flow, data);

                return updatedInstance.save();
            })
            .then((flow) => {
                return res.status(200).send(flow);
            })
            .catch(next);
    }

    remove(req, res, next) {
        const id = req.params.id;

        return this.Model.remove({ _id: id })
            .then((flow) => {
                return res.status(200).send(flow);
            })
            .catch(next);
    }
}
module.exports = BaseController;