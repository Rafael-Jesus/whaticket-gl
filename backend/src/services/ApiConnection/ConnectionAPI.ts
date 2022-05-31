import { Request, Response } from "express";
// import {useState} from "../../../../frontend/react";
import { ResultSetHeader } from "mysql2";
import { Console } from "console";
const axios = require("axios");
const mysql = require("mysql2")
const mysql2 = require("mysql2/promise")

interface Coonnection{
  nome: string,
  msgI: string,
  msgF: string,
  nWA: string,
  akWA: string,
  fila: string,
  statusConn: string
}

interface EditCoonnection{
  id: number,
  nome: string,
  msgI: string,
  msgF: string,
  nWA: string,
  akWA: string,
  fila: string
}

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "whaticket"
})

const db2 = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "whaticket"
})

export const connection = async (conn: Coonnection, req: Request, res: Response) => {
  const query = "INSERT INTO connectionAPI (nome, msginicio, msgfinal, numwhatsapp, apikey, fila, statusConn) VALUES(?,?,?,?,?,?,?)"
  if(db.query(query,[conn.nome, conn.msgI, conn.msgF, conn.nWA, conn.akWA, conn.fila, conn.statusConn])){
    return {"msg":"success"}
  }
  else{
    return {"msg": "error on inserction in BDD"}
  }
}

export const listConnection = async (req: Request, res:Response) => {
  const query = "SELECT * FROM connectionAPI";
  try {
    db.query(query, (err: Error, result: ResultSetHeader)=> {
      if(result != null){
        return res.status(200).json(result)
      }
      else{
        return {"msg": "error on list in BDD"}
      }
    })
  } catch (error) {
    console.log("teste")
  }
  
  
}

export const createConnection = async (connAPI: Coonnection, req: Request, res:Response) => {
  const tempoEpera = setTimeout(() => {
    const fetchData = async () => {
      try {
        const api = await axios({
            url: "configs/webhook",
            method: "post",
            baseURL: "https://waba.360dialog.io/v1/",
            headers: {
                "D360-API-KEY": connAPI.akWA,
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
            },
            data:{
              "url": "https://marked-potent-linen.glitch.me/webhook",
              "headers":{
                "Content-Type": "application/json",
                "D360-API-KEY": connAPI.akWA
            }
            }
        });
        const {data} = await api
        const statusC = "True";
        console.log(data)
        const query = "UPDATE connectionAPI SET statusConn = ? where apikey = ?";
        if(db.query(query,[statusC, connAPI.akWA])){
          return res.status(200).json(data);
        }
        else{
          return {"msg": "error on inserction in BDD"}
        }
       
        
      } catch (err) {
        console.log("testeee",err);
      }
    };
    fetchData();

  }, 500);
  
}


export const deleteConnection = async (id: number, req: Request, res: Response) => {
  const query = "DELETE FROM connectionAPI WHERE id = ?"
  if(await db2.query(query,[id])){
    return {"msg":"success"};
  }
  else{
    return {"msg": "error on inserction in BDD"}
  }
}


export const editConnection = async (id: string, req: Request, res:Response) => {
  const actualState = {
		id: "",
		nome: "",
		msgI: "",
		msgF: "",
		numwhatsapp: "",
		apikey: "",
		fila: "",
		statusconn: "false"
	};
  // const[resultData, setResultData] = useState(actualState)  
  const query = "SELECT * FROM connectionAPI where id = ?";
  
  try {
   db.query(query,id, (err: Error, result: JSON)=> {
      if(result != null){
        
        return res.status(200).json(result)
      }
      else{
        return {"msg": "error on list in BDD"}
      }
    })
  } catch (error) {
    console.log("teste831307")
  }
  
  
}

export const setEditConnection = (editConn: EditCoonnection, req: Request, res:Response) => {
  const query = "UPDATE connectionAPI SET nome = ? WHERE id = ?";
  const query2 = "UPDATE connectionAPI SET msginicio = ? WHERE id = ?";
  const query3 = "UPDATE connectionAPI SET msgfinal = ? WHERE id = ?";
  const query4 = "UPDATE connectionAPI SET numwhatsapp = ? WHERE id = ?";
  const query5 = "UPDATE connectionAPI SET apikey = ? WHERE id = ?";
  const query6 = "UPDATE connectionAPI SET fila = ? WHERE id = ?";


  const tempoEpera = setTimeout(() => {
    const fetchData = () => {
      try {
        if(db.query(query,[editConn.nome, editConn.id])){
          if(db.query(query2,[editConn.msgI, editConn.id])){
           if(db.query(query3,[editConn.msgF, editConn.id])){
            if(db.query(query4,[editConn.nWA, editConn.id])){
              if(db.query(query5,[editConn.akWA, editConn.id])){
                if(db.query(query6,[editConn.fila, editConn.id])){
                  return res.status(200).json({"msg": "success"});
        
                }
              }
            }
          }
        }
      }
        else{
          return {"msg": "error on inserction in BDD"}
        }
        
      } catch (err) {
        console.log("testeee",err);
      }
    };
    fetchData();

  }, 500);  
}
