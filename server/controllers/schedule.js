const setEventInfo = require('../helpers').setEventInfo;

const Calendar = require('../models/calendar'),
  Event = require('../models/event'),
  User = require('../models/user');

exports.getCalendarEvents = function (req, res, next) {
  Event.find({})
    .exec((err, events) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
      const eventsToReturn = setEventInfo(events);
      console.log(events)
      return res.status(200).json({ events: eventsToReturn });
      console.log(res.eventsToReturn)
    });
};

exports.getCalendars = function (req, res, next) {
  Calendar.find({})
    .exec((err, calendars) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ calendars });
    });
};

exports.deleteEvent = function (req, res, next) {
  const id = req.params.id;
  Event.findByIdAndRemove(id)
    .exec((err) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json(err);
    });
};


exports.getCalendarEventsById = function (req, res, next) {
  const authorId = req.params.userId;
  Event.find({ authorId })
    .exec((err, events) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ events });
    });
};

exports.newCalendar = function (req, res, next) {
  calendar.save((err, newCalendar) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const event = new Calendar({
      calName: req.body.name,
      participants: req.body.participantsId
    });

    event.save((err, newCalendar) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      return res.status(200).json({ event: 'Calendar created!', calendarId: calendar._id });
    });
  });
};

exports.newEvent = function (req, res, next) {
  const addEventById = new Event({
    calendarId: req.body.calendarId,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    hashtags: req.body.hashtags,
    people: req.body.people,
    owner: req.body.owner,
    hexColor: req.body.hexColor,
  });

  addEventById.save((err, eventAdded) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ event: 'Event successfully added!' });
  });
};

exports.newEventById = function (req, res, next) {
  const addEventById = new Event({
    calendarId: req.params.calendarId,
    name: req.body.eventName,
    start: req.body.eventStart,
    end: req.body.eventEnd,
    // author: req.user._id
  });

  addEventById.save((err, eventAddedById) => {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    return res.status(200).json({ event: 'Event successfully added!' });
  });
};
