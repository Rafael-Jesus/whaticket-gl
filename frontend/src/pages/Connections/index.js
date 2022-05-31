import React, { useState, useCallback, useContext, useEffect} from "react";
import { toast } from "react-toastify";

import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import {
	Button,
	TableBody,
	TableRow,
	TableCell,
	Table,
	TableHead,
	Paper,
} from "@material-ui/core";

import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";
import TableRowSkeleton from "../../components/TableRowSkeleton";

import api from "../../services/api";
import WhatsAppModal from "../../components/WhatsAppModal";
import WhatsAppModalEdit from "../../components/WhatsAppModalEdit";
import ConfirmationModal from "../../components/ConfirmationModal";
import QrcodeModal from "../../components/QrcodeModal";
import { i18n } from "../../translate/i18n";
import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";
import toastError from "../../errors/toastError";

// import api2 from '../../components/TicketsList/api'


import axios from 'axios';

const api2 = require("../../components/TicketsList/api").default

const useStyles = makeStyles(theme => ({
	mainPaper: {
		flex: 1,
		padding: theme.spacing(1),
		overflowY: "scroll",
		...theme.scrollbarStyles,
	},
	customTableCell: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	tooltip: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		fontSize: theme.typography.pxToRem(14),
		border: "1px solid #dadde9",
		maxWidth: 450,
	},
	tooltipPopper: {
		textAlign: "center",
	},
	buttonProgress: {
		color: green[500],
	},
}));

const Connections = () => {
	const [dataAPI, setDataAPI] = useState({});
	const [listEdit, setListEdit] = useState({});
	const [dataConn, setDataConn] = useState({});
	const [dataConnID, setDataConnID] = useState({});
	
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const fetchData = async () => {
				try {
					const {data} = await api.get("/connectionapi/listconn")
					setDataAPI(data);
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}, 500);
	}, []);

	


	const classes = useStyles();

	const {loading } = useContext(WhatsAppsContext);
	const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
	const [qrModalOpen, setQrModalOpen] = useState(false);
	const [selectedWhatsApp, setSelectedWhatsApp] = useState(null);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);

	const [whatsAppModalEditOpen, setWhatsAppModalEditOpen] = useState(false);
	const confirmationModalInitialState = {
		action: "",
		title: "",
		message: "",
		whatsAppId: "",
		open: false,
	};
	const [confirmModalInfo, setConfirmModalInfo] = useState(
		confirmationModalInitialState
	);

	const handleOpenWhatsAppModal = () => {
		setWhatsAppModalOpen(true);
	};	

	const handleCloseWhatsAppModal = useCallback(() => {
		setWhatsAppModalOpen(false);
	}, [setSelectedWhatsApp, setWhatsAppModalOpen]);

	
	function handleOpenWhatsAppModalEdit (idConn) {
		for(let i = 0; i < dataAPI.length; i++){
			if(dataAPI[i].id === idConn){
				setListEdit(dataAPI[i])
		 		
		 	}
		}
		
		setWhatsAppModalEditOpen(true);
	};

	const handleCloseWhatsAppEditModal = useCallback(() => {
		setWhatsAppModalEditOpen(false);
	}, [ setWhatsAppModalEditOpen]);

	const handleOpenQrModal = whatsApp => {
		setSelectedWhatsApp(whatsApp);
		setQrModalOpen(true);
	};

	const handleCloseQrModal = useCallback(() => {
		setSelectedWhatsApp(null);
		setQrModalOpen(false);
	}, [setQrModalOpen, setSelectedWhatsApp]);

	const handleSubmitConfirmationModal = async () => {
		if (confirmModalInfo.action === "disconnect") {
			try {
				await api.delete(`/whatsappsession/${confirmModalInfo.whatsAppId}`);
			} catch (err) {
				toastError(err);
			}
		}

		if (confirmModalInfo.action === "delete") {
			try {
				await api.delete(`/whatsapp/${confirmModalInfo.whatsAppId}`);
				toast.success(i18n.t("connections.toasts.deleted"));
			} catch (err) {
				toastError(err);
			}
		}

		setConfirmModalInfo(confirmationModalInitialState);
	};

	async function deleteConnection(id) {
		const idC = {
			"idConn": id
		}
		try {
			const data = await api.post("/connectionapi/deleteconn", idC)
			
			if(data){
				window.location.reload(true);	
										
			}else{
				console.log(dataConn.data.msg)
			}
			
		} catch (error) {
				console.log(error);
		}	
	}

	const [teste, setTeste] = useState(null)


		const tesetDELAY = setTimeout(() => {
			const fetchData = async () => {
				try {
					const data = await api2					
					setTeste("teste",data)
					console.log(data)
				} catch (error) {
					console.log("AOBBABABA");
				}
			};
			fetchData();
		}, 500);

		
	// useEffect(() => {
		
	//   }, []);
	// const TE = setTimeout ( () => {
	// 	const fetchData =  async () => {
	// 		const {data} = await api2

	// 		setTeste(data)

	// 	};
	// 	fetchData();
	// 	// console.log(fetchData())

	// }, 500);
	//   console.log(teste);



	return (
		<MainContainer>
			<ConfirmationModal
				title={confirmModalInfo.title}
				open={confirmModalOpen}
				onClose={setConfirmModalOpen}
				onConfirm={handleSubmitConfirmationModal}
			>
				{confirmModalInfo.message}
			</ConfirmationModal>
			<QrcodeModal
				open={qrModalOpen}
				onClose={handleCloseQrModal}
			/>
			<WhatsAppModal
				open={whatsAppModalOpen}
				onClose={handleCloseWhatsAppModal}
			/>
			<WhatsAppModalEdit
				whatsAppId={listEdit}
				open={whatsAppModalEditOpen}
				onClose={handleCloseWhatsAppEditModal}
			/>
			<MainHeader>
				<Title>{i18n.t("connections.title")}</Title>
				<MainHeaderButtonsWrapper>
					<Button
						variant="contained"
						color="primary"
						onClick={handleOpenWhatsAppModal}
					>
						{i18n.t("connections.buttons.add")}
					</Button>
				</MainHeaderButtonsWrapper>
			</MainHeader>
			<Paper className={classes.mainPaper} variant="outlined">
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell align="center">
								{i18n.t("ID")}
							</TableCell>
							<TableCell align="center">
								{i18n.t("Nome")}
							</TableCell>
							<TableCell align="center">
								{i18n.t("Número WhatsApp")}
							</TableCell>
							<TableCell align="center">
								{i18n.t("API-KEY")}
							</TableCell>
							<TableCell align="center">
								{i18n.t("Status da Conexão")}
							</TableCell>
							<TableCell align="center">
								{i18n.t("Ações")}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading ? (
							<TableRowSkeleton />
						) : (
							<>
								{dataAPI?.length > 0 &&
									dataAPI.map((whatsApp) => (
										<TableRow key={whatsApp.id}>
											<TableCell align="center">{"ola"+teste}</TableCell>
											<TableCell align="center">{whatsApp.nome}</TableCell>
											<TableCell align="center">{whatsApp.numwhatsapp}</TableCell>
											<TableCell align="center">{whatsApp.apikey}</TableCell>
											<TableCell align="center">{whatsApp.statusConn}</TableCell>
											<TableCell align="center">
												<Button onClick={() => handleOpenWhatsAppModalEdit(whatsApp.id)} type="button"><EditIcon style={{color: "grey"}}/></Button>
												<Button onClick={() => deleteConnection(Number(whatsApp.id))}type="button"><DeleteForeverSharpIcon style={{color: "red"}}/></Button>
											</TableCell>
										</TableRow>
									))}
							</>
						)}
					</TableBody>
				</Table>
			</Paper>
		</MainContainer>
	);
};

export default Connections;
