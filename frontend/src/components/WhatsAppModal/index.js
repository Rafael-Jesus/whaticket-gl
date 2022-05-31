import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { toast } from "react-toastify";
import  'bootstrap/dist/css/bootstrap.min.css' ;

import {WhatsAppsAPI} from "../../context/WhatsAppConnAPI/WhatsAppAPIContext"

import  { Button, Form }  from  'react-bootstrap' ;

import "./style.css";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	CircularProgress,
	TextField,
	Switch,
	FormControlLabel,
} from "@material-ui/core";

import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import toastError from "../../errors/toastError";
import QueueSelect from "../QueueSelect";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},

	multFieldLine: {
		display: "flex",
		"& > *:not(:last-child)": {
			marginRight: theme.spacing(1),
		},
	},

	btnWrapper: {
		position: "relative",
	},

	buttonProgress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
}));

const SessionSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
});

const WhatsAppModal = ({ open, onClose, whatsAppId }) => {
	const classes = useStyles();
	const initialState = {
		name: "",
		greetingMessage: "",
		farewellMessage: "",
		isDefault: false,
	};
	const [whatsApp, setWhatsApp] = useState(initialState);
	const [selectedQueueIds, setSelectedQueueIds] = useState([]);


	const handleClose = () => {
		onClose();
		// setWhatsApp(initialState);
	};

	const[nome, setNome] = useState("");
	const[msgI, setmsgI] = useState("");
	const[msgF, setmsgF] = useState("");
	const[nWA, setnWA] = useState("");
	const[akWA, setakWA] = useState("");
	const[fila, setfila] = useState("");



	const saveConnection = async values => {
		if(nome != "" && msgI != "" && msgF != "" && nWA != "" && akWA != "" && fila != "") {
			const conn = {
				"nome": nome,
				"msgI": msgI,
				"msgF": msgF,
				"nWA": nWA,
				"akWA": akWA,
				"fila": fila,
				"statusConn": "False"
			}
			try {
				const connAPI = await api.post("/whatsappapi/conn",conn)
				const createResult = await api.post("/connectionapi/createconn", conn)
				// console.log("teste",connAPI);
				if(connAPI.data.msg == "success"){
					await api.get("/connectionapi/listconn")
					window.location.reload(true);	
										
				}else{
					console.log(connAPI.data.msg)
				}
				
			} catch (err) {
				console.log(err)
			}
			// console.log(conn)
			onClose();
		}
		else{
			console.log("preencha tudo")
		}
	}

	return (
		<div className={classes.root}>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="sm"
				fullWidth
				scroll="paper"
			>
				<DialogTitle>
					{whatsAppId
						? i18n.t("whatsappModal.title.edit")
						: i18n.t("whatsappModal.title.add")}
				</DialogTitle>

				
				<form className="formConnection">
					<div className="formInputs">

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Control className="input"type="text" placeholder="Nome da Conexão" name="nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							
							<Form.Control className="input" id="msgI" type="text" placeholder="Mensagem de Início" name="msgI" value={msgI} onChange={(e)=>setmsgI(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							 
							<Form.Control className="input"type="text" id="msgF" placeholder="Mensagem de Finalização" name="msgF" value={msgF} onChange={(e)=>setmsgF(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							
							<Form.Control className="input"type="text" placeholder="Número WhatsApp" name="nWA" value={nWA} onChange={(e)=>setnWA(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							
							<Form.Control className="input"type="text" placeholder="API-KEY WhatsApp" name="akWA" value={akWA} onChange={(e)=>setakWA(e.target.value)}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							
							<Form.Control className="input"type="text" placeholder="Fila" name="fila" value={fila} onChange={(e)=>setfila(e.target.value)}/>
						</Form.Group>
						<div className="formButtons">
							<Button variant="danger" onClick={handleClose} type="button">Cancelar</Button>	
							<Button variant="primary" onClick={saveConnection}>Adicionar</Button>	
						</div>	
					</div>
				</form>
				{/* </div> */}
			</Dialog>
		</div>
	);
};

export default React.memo(WhatsAppModal);
