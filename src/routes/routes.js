import { addNewContact } from "../controllers/controller.js";
import {
  getContacts,
  getSpecificContact,
  updateContact,
  deleteContact,
} from "../controllers/controller.js";

const routes = (app) => {
  app
    .route("/contact")

    //get all contacts
    .get((req, res, next) => {
      //middleware
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getContacts);

  app
    .route("/contact/:contactId")

    //get specific contact
    .get(getSpecificContact)

    //post new contact
    .post(addNewContact)

    //update contact
    .put(updateContact)

    //delet contact based on id
    .delete(deleteContact);
};

export default routes;
