import { addNewContact } from "../controllers/controller.js";
import {
  getContacts,
  getSpecificContact,
  updateContact,
  deleteContact,
} from "../controllers/controller.js";
import {
  login,
  register,
  loginRequired,
} from "../controllers/userController.js";
("../controllers/userController.js");

const routes = (app) => {
  app
    .route("/contact")

    //get all contacts
    .get(
      (req, res, next) => {
        //middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts
    )

    //post new contact
    .post(loginRequired, addNewContact);

  app
    .route("/contact/:contactId")

    //get specific contact
    .get(loginRequired, getSpecificContact)

    //update contact
    .put(loginRequired, updateContact)

    //delet contact based on id
    .delete(loginRequired, deleteContact);

  //registration route
  app.route("/auth/register").post(register);

  //login route
  app.route("/login").post(login);
};

export default routes;
