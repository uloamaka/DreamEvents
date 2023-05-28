module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.session.returnTo = req.originalUrl;
      req.flash("error", "You have to login to do that!");
      res.redirect("/login");
    }
  },

  isAdmin: function (req, res, next) {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      req.flash(
        "error",
        "Access denied. You are not authorized to perform this operation."
      );
      res.status(403).redirect("/");
    }
  },
};

//==========================================================================
// async function getGallery(req, res, next) {
//   let gallery;
//   try {
//     gallery = await Gallery.findById(req.params.id);
//     if (gallery == null) {
//       return res.status(404).json({ message: "Gallery not found" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.gallery = gallery;
//   next();
// }

// module.exports = {
//   isLoggedIn: function (req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     } else {
//       req.flash("error", "You have to login to do that!");
//       res.redirect("/login");
//     }
//   },

//   isAdmin: function (req, res, next) {
//     if (req.user && req.user.isAdmin) {
//       next();
//     } else {
//       res
//         .status(403)
//         .send(
//           "Access denied. You are not authorized to perform this operation."
//         );
//     }
//   },

//   getGallery: getGallery,
// };

