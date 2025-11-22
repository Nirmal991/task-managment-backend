import { Router } from "express";
import data from "./data.routes";

const $ = Router();

$.use(data);

export default $;
