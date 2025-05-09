import Notification from "../models/notification.model.js"; // Import the Notification model

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "title")
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getUserNotifications controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findByIdAndUpdate(
      { _id: notificationId },
      { read: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error in markNotificationsAsRead controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    console.error("Error in deleteNotification controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};