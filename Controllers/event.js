import status from 'http-status';
import EventSchema from '../Models/eventSchema';

const getEvents = (req, res) => {
    const { sortDirection, sort, query, offset, number, intolerences } = req.param;
    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: process.env.rapidApi
    };

    // eslint-disable-next-line no-undef
    fetch(`https://api.apilayer.com/spoonacular/food/ingredients/search?sortDirection=${encodeURIComponent(sortDirection)}&sort=${encodeURIComponent(sort)}&query=${encodeURIComponent(query)}&offset=${encodeURIComponent(offset)}&number=${encodeURIComponent(number)}&intolerances=${encodeURIComponent(intolerences)}`, requestOptions)
        .then(response => response.text())

    .then(result => {
                console.log(result);
                res.status(status.OK).send({
                    // eslint-disable-next-line no-undef
                    result,
                    Message: 'Event Created Successfully',
                    type: status.Ok,
                });
            }

        )
        .catch(error => console.log('error', error));
};

const addEvent = (req, res) => {
    const { question, answers } = req.body;

    const event = new EventSchema({
        question,
        answers
    });
    event
        .save()
        .then(savedEvent => {
            res.status(status.OK).send({
                savedEvent,
                Message: 'Event Created Successfully',
                type: status.Ok,
            });
        })
        .catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: status.INTERNAL_SERVER_ERROR,
                err,
            });
        });
};

const deleteEvent = (req, res) => {
    const { id } = req.params;
    EventSchema.findByIdAndRemove(id, (err, result) => {
        if (result) {
            res.status(status.OK).send({
                Message: 'Event Deleted Successfully.',
            });
        } else {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Unable to Delete.',
                err,
            });
        }
    });
};

const editEvent = (req, res) => {
    const { id } = req.params;
    const query = { $set: req.body };
    EventSchema.findByIdAndUpdate(id, query, { new: true }, (err, result) => {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Unable to Update.',
            });
        } else {
            res.status(status.OK).send({
                Message: 'Successfully Updated.',
                result,
            });
        }
    });
};

const getSingleEvent = (req, res) => {
    const { eid } = req.params;

    EventSchema.findOne({ _id: eid })
        .then(event => {
            if (!event) {
                return res.status(status.NOT_FOUND).send({
                    Message: 'Boat not found',
                });
            }
            return res.status(status.OK).send(event);
        })
        .catch(err => {
            return res.status(status.INTERNAL_SERVER_ERROR).send({
                Message: 'Internal Server Error',
                err,
            });
        });
};

const getQuestions = (req, res) => {


    EventSchema.find()
        .then(event => {
            console.log(event);
            res.status(status.OK).send({
                // eslint-disable-next-line no-undef
                event,
                Message: 'Event Created Successfully',
                type: status.Ok,
            });

        }).catch(error => console.log('error', error));
};
export default { getEvents, addEvent, deleteEvent, editEvent, getSingleEvent, getQuestions };