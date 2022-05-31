import express from "express";
import isAuth from "../middleware/isAuth";

import * as WhatsAppController from "../controllers/WhatsAppController";

import * as WhatsAppAPIController from "../controllers/WhatsAppAPIController";

const whatsappRoutes = express.Router();

whatsappRoutes.get("/connectionapi/listconn", isAuth, WhatsAppAPIController.listConn);

whatsappRoutes.post("/connectionapi/createconn", isAuth, WhatsAppAPIController.createConn);

whatsappRoutes.post("/connectionapi/deleteconn", isAuth, WhatsAppAPIController.deleteConn);

whatsappRoutes.get("/connectionapi/editconn:idConn", isAuth, WhatsAppAPIController.editConn);

whatsappRoutes.put("/connectionapi/editconn/setvalues", WhatsAppAPIController.setEditConn);

whatsappRoutes.post("/whatsappapi/conn", isAuth, WhatsAppAPIController.conn);

whatsappRoutes.get("/whatsappapi/", isAuth, WhatsAppAPIController.index);

whatsappRoutes.post("/whatsapp/", isAuth, WhatsAppController.store);

whatsappRoutes.get("/whatsapp/:whatsappId", isAuth, WhatsAppController.show);

whatsappRoutes.put("/whatsapp/:whatsappId", isAuth, WhatsAppController.update);

whatsappRoutes.delete(
  "/whatsapp/:whatsappId",
  isAuth,
  WhatsAppController.remove
);

export default whatsappRoutes;
