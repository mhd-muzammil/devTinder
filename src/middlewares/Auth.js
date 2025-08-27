const adminAuth = (req, res, next) => {

  console.log("Admin Auth is Getting Checked!!!");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

module.exports = { adminAuth };