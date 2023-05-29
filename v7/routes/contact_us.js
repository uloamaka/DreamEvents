const router = require("express").Router();
  (Joi = require("joi")),
  (Event = require("../models/contact")),
  (nodemailer = require("nodemailer")), // Import the Event model and the nodemailer library
  (config = require("../config")),
  ({ google } = require("googleapis"));

// Define the validation schema using Joi
const eventValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().min(5).max(255).required(),
  phone: Joi.string().min(10).max(20).required(),
  eventType: Joi.string().min(5).max(255).required(),
  requestedDate: Joi.date().required(),
  estimatedGuestCount: Joi.number().min(1).required(),
  additionalNote: Joi.string().max(1000),
});

// Add a event
router.get("/", (req, res) => {
  try {
    res.render("contact/form");
  } catch (err) {
    const message = err.message || "Error rendering new contact form";
    req.flash("error", message);
    res.status(500).redirect("/");
  }
});

// Get all events
router.get("/requests", async (req, res) => {
  try {
    const events = await Event.find();
    res.render("contact/index", { events });
  } catch (err) {
    const message = err.message || "Error retrieving event requests";
    req.flash("error", message);
    res.status(500).redirect("/");
  }
});

// Get a single event by ID
// router.get("/:id", async (req, res) => {
//   const event = await Event.findById(req.params.id);
//   if (!event) return res.status(404).send("Event not found");
//   res.send(event);
// });
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      req.flash("error", "Event not found");
      return res.status(404).redirect("/events");
    }
    res.render("events/show", { event });
  } catch (err) {
    const message = err.message || "Error retrieving event";
    req.flash("error", message);
    res.status(500).redirect("/events");
  }
});

/* // Create a new event
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = eventValidationSchema.validate(req.body);
    if (error) {
      req.flash("error", error.details[0].message);
      return res.status(400).redirect("/contact");
    }

    // Create a new event object
    const event = new Event({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      eventType: req.body.eventType,
      requestedDate: req.body.requestedDate,
      estimatedGuestCount: req.body.estimatedGuestCount,
      additionalNote: req.body.additionalNote,
    });

    // Save the event object to the database
    await event.save();
    req.flash("success", "Request submitted successfully!");
    res.redirect("../");
  } catch (err) {
    req.flash("error", "Error submitting request: " + err.message);
    res.redirect("../contact/");
  }
}); */
//====================================================================

const OAuth2_client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);
OAuth2_client.setCredentials({ refresh_token: config.refresh_token });
// Define a function to send an email
async function sendEmail(event) {
  const accessToken = await OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.client_id,
      clientSecret: config.client_secret,
      refreshToken: config.refresh_token,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Define your email options
  const mailOptions = {
    from: "Yoma Eventzzz! <your-email-address@gmail.com>",
    to: "godsgiftuloamaka235@gmail.com",
    subject: "New event request",
    html: `
      <p>A new event has been requested:</p>
      <ul>
        <li>Name: ${event.name}</li>
        <li>Email: ${event.email}</li>
        <li>Phone: ${event.phone}</li>
        <li>Event type: ${event.eventType}</li>
        <li>Date: ${event.requestedDate}</li>
        <li>Guest count: ${event.estimatedGuestCount}</li>
        <li>Additional Note: ${event.additionalNote}</li>
      </ul>
    `,
  };

  // Send the email and log any errors or success messages
  try {
    await transport.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log("Email error:", error);
  }
}

// Define your route to handle form submissions
router.post("/", async (req, res) => {
  try {
    // Create a new Event instance with the submitted data
    const event = new Event({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      eventType: req.body.eventType,
      requestedDate: req.body.requestedDate,
      estimatedGuestCount: req.body.estimatedGuestCount,
      additionalNote: req.body.additionalNote,
    });

    // Save the event to the database
    const savedEvent = await event.save();

    // Send an email with the saved event data
    await sendEmail(savedEvent);

    req.flash("success", "Request submitted successfully!");
    return res.redirect("../");
  } catch (err) {
    req.flash("error", "Error submitting request: " + err.message);
    return res.redirect("../contact/");
  }
});

module.exports = router;
