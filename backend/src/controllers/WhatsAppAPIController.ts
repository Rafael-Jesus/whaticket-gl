import { Request, Response} from "express";
import {connection, listConnection, createConnection, deleteConnection, editConnection, setEditConnection} from "../services/ApiConnection/ConnectionAPI"

const api2 = require("../services/ApiIXC/api");

export const index = async (req: Request, res: Response) => {
  const tempoEpera = setTimeout(() => {
    const fetchData = async () => {
      try {
        const { data } = await api2;
        
        console.log(data);

        return res.status(200).json(data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

  }, 500);
}

export const conn = async (req: Request, res: Response) => {
  const connAPI = req.body 
  const conn = await connection(connAPI, req,res)
  return res.status(200).json(conn) 
}

export const listConn = async (req: Request, res: Response) => {
  const conn = await listConnection(req, res)
  return conn;
}

export const createConn = async (req: Request, res: Response) => {
  const connAPI = req.body 
  const conn = await createConnection(connAPI, req, res)
  return conn;
}

export const deleteConn = async (req: Request, res: Response) => {
  const idConn = req.body
  const conn = await deleteConnection(idConn.idConn, req, res)
  return res.status(200).json(conn);
}

export const editConn = async (req: Request, res: Response) => {
  const { idConn } = req.params;
  const conn = await editConnection(idConn, req, res)
  return conn;
}

export const setEditConn = async(req: Request, res: Response) => {
  const connEdit = req.body;
  const conn = await setEditConnection(connEdit, req, res)
  console.log(conn)
  return conn;
}