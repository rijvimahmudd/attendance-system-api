const { addMinutes, isAfter } = require('date-fns');
const AdminAttendance = require('../models/AdminAttendance');
const error = require('../util/error');

const getEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: 'RUNNING' });
    if (running) {
      throw error('Already running', 400);
    }
    const attendance = new AdminAttendance({ ...req.body });
    await attendance.save();
    return res.status(201).json({ message: 'success', attendance });
  } catch (e) {
    return next(e);
  }
};
const getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: 'RUNNING' });
    if (!running) {
      throw error('Not running', 400);
    }

    running.status = 'COMPLETED';
    await running.save();
    return res.status(200).json(running);
  } catch (e) {
    return next(e);
  }
};
const getStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: 'RUNNING' });
    if (!running) {
      throw error('Not running', 400);
    }
    const started = addMinutes(new Date(running.createdAt), running.timeLimit);
    if (isAfter(new Date(), started)) {
      running.status = 'COMPLETED';
      await running.save();
    }

    return res.status(200).json(running);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getDisable, getEnable, getStatus,
};
