import mongoose from "mongoose";
import { ContactSchema } from "../models/modals";
import { json } from "body-parser";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

export const getSpecificContact = async (req, res) => {
  try {
    const SpeContact = await Contact.findById(req.params.contactId);
    res.json(SpeContact);
  } catch (error) {
    res.status(500).send(error);
    console.log(err);
  }
};

export const updateContact = async (req, res) => {
  try {
    const updateContact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );
    res.json(updateContact);
  } catch (error) {
    console.log(err);
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndRemove({ _id: req.params.contactId });
    res.json("Delete successful");
  } catch (error) {
    console.log(error);
  }
};
