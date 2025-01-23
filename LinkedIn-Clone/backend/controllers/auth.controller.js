export const signup = async (req, res) => {
  res.status(200).json({ message: "Signup route" });
};

export const login = async (req, res) => {
  res.status(200).json({ message: "Login route" });
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "Logout route" });
};
