import React, { useState} from "react";

import  'bootstrap/dist/css/bootstrap.min.css' ;

import  { Button, Form }  from  'react-bootstrap' ;

import "./style.css";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import {
	Dialog,
	DialogTitle,
} from "@material-ui/core";

import api from "../../services/api";
import { i18n } from "../../translate/i18n";

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

const WhatsAppModal = ({ open, onClose, whatsAppId }) => {
	
	const[nome, setNome] = useState(whatsAppId.nome);
	const[msgI, setmsgI] = useState(whatsAppId.msginicio);
	const[msgF, setmsgF] = useState(whatsAppId.msgfinal);
	const[nWA, setnWA] = useState(whatsAppId.numwhatsapp);
	const[akWA, setakWA] = useState(whatsAppId.apikey);
	const[fila, setfila] = useState(whatsAppId.fila);

	const classes = useStyles();

	const handleClose = () => {
		onClose();
	};

	const saveConnection = async () => {
			const conn = {
				"id":whatsAppId.id,
				"nome": nome,
				"msgI": msgI,
				"msgF": msgF,
				"nWA": nWA,
				"akWA": akWA,
				"fila": fila
			}
			
			try {
				const result = await api.put("/connectionapi/editconn/setvalues", conn)
				if(result.data.msg == "success"){
					window.location.reload(true);	
										
				}else{
					console.log(result.data.msg)
				}
				
			} catch (err) {
				console.log(err)
			}
			onClose();
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
					{i18n.t("Editar WhatsApp")}
				</DialogTitle>
					<form className="formConnection">
						<div className="formInputs">
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control className="input" id="nome" type="text" placeholder="Nome" name="nome" defaultValue={whatsAppId.nome} onChange={(e) => setNome(e.target.value)}  />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control className="input" id="msgI" type="text" placeholder="Mensagem de Início" name="msgI" defaultValue={whatsAppId.msginicio} onChange={(e) => setmsgI(e.target.value)} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control className="input"type="text" id="msgF" placeholder="Mensagem de Finalização" name="msgF" defaultValue={whatsAppId.msgfinal} onChange={(e) => setmsgF(e.target.value)}/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control className="input" id="nWA" type="text" placeholder="Número WhatsApp" name="nWA" defaultValue={whatsAppId.numwhatsapp} onChange={(e) => setnWA(e.target.value)}/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control className="input" id="akWA" type="text" placeholder="API-KEY WhatsApp" name="akWA" defaultValue={whatsAppId.apikey} onChange={(e) => setakWA(e.target.value)}/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control className="input" id="fila" type="text" placeholder="Fila" name="fila" defaultValue={whatsAppId.fila} onChange={(e) => setfila(e.target.value)}/>
							</Form.Group>
							<div className="formButtons">
								<Button variant="danger" onClick={handleClose} type="button">Cancelar</Button>	
								<Button variant="primary" onClick={saveConnection}>Adicionar</Button>	
							</div>	
						</div>
					</form>
			</Dialog>
		</div>
	);
};

export default React.memo(WhatsAppModal);
