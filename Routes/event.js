import express from 'express';
import events from '../Controllers/event';


const eventRouter = express.Router();

eventRouter.post(
    '/add',
    events.addEvent
);

eventRouter.get('/', events.getEvents);

eventRouter.get('/Q', events.getQuestions);

eventRouter.get('/:eid', events.getSingleEvent);

// only admin can delete
eventRouter.delete(
    '/delete/:id',

    events.deleteEvent,
);

eventRouter.patch('/edit/:id', events.editEvent);

export default eventRouter;