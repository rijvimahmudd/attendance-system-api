const { addMinutes, isAfter } = require('date-fns');
const AdminAttendance = require('../models/AdminAttendance');
const StudentAttendance = require('../models/StudentAttendance');
const error = require('../util/error');

const getAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw error('invalid attendance id', 400);
    }

    if (adminAttendance.status !== 'RUNNING') {
      throw error('Attendance already completed', 400);
    }

    let attendance = await StudentAttendance.findOne({ adminAttendance: id, user: req.user._id });
    if (attendance) {
      throw error('Attendance already completed', 400);
    }

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();

    return res.status(201).json(attendance);
  } catch (e) {
    return next(e);
  }
};

const getAttendanceStatus = async (_req, res, next) => {
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
  getAttendance, getAttendanceStatus,
};
