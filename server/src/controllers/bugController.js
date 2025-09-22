import Bug from "../models/bugModel.js";

export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    console.error("❌ Error fetching bugs:", err.message);
    res.status(500).json({ message: "Failed to fetch bugs" });
  }
};

export const createBug = async (req, res) => {
  try {
    console.log("📩 Received bug data:", req.body);

    const bug = new Bug({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status?.toLowerCase() || "open",
      priority: req.body.priority || "low",
    });

    const saved = await bug.save();
    console.log("✅ Bug created:", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating bug:", err.message);
    res.status(500).json({ message: "Failed to create bug", error: err.message });
  }
};

export const updateBug = async (req, res) => {
  try {
    const updated = await Bug.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        status: req.body.status?.toLowerCase(),
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating bug:", err.message);
    res.status(500).json({ message: "Failed to update bug" });
  }
};

export const deleteBug = async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.json({ message: "Bug deleted" });
  } catch (err) {
    console.error("❌ Error deleting bug:", err.message);
    res.status(500).json({ message: "Failed to delete bug" });
  }
};
