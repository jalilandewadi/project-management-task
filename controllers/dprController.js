const DailyReport = require("../models/dailyReport");

exports.createDPR = async (req, res) => {

  try {

    const projectId = req.params.id;

    const { date, work_description, weather, worker_count } = req.body;

    const report = await DailyReport.create({
      project_id: projectId,
      user_id: req.user.id,
      date,
      work_description,
      weather,
      worker_count
    });

    res.status(201).json({
      message: "DPR created successfully",
      dprId: report.id
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.getProjectDPR = async (req, res) => {

  try {

    const projectId = req.params.id;

    const reports = await DailyReport.findAll({
      where: { project_id: projectId }
    });

    res.json(reports);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};