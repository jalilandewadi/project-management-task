const { Project, DailyReport } = require("../models");

exports.createProject = async (req, res) => {

  try {

    const { name, description, start_date, end_date } = req.body;

    const project = await Project.create({
      name,
      description,
      start_date,
      end_date,
      created_by: req.user.id
    });

    res.status(201).json({
      message: "Project created",
      projectId: project.id
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.findAll();

    res.json(projects);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


exports.getProjectById = async (req, res) => {

  try {

    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: DailyReport
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.updateProject = async (req, res) => {

  try {

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.update(req.body);

    res.json({ message: "Project updated" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.deleteProject = async (req, res) => {

  try {

    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();

    res.json({ message: "Project deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};