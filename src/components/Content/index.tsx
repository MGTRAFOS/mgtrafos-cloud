import { Header } from '../Header';
import {
    Container,
    TableContainer,
    ActionsContainer,
    ContainerEditProfile,
    CheckBoxContainer,
    HeaderEditProfile,
    FooterEditProfile,
} from './styles';
import { QuickAccess } from '../../components/QuickAccess';
import { FilesList } from '../../components/FilesList';
import { UploadModal } from '../../components/UploadModal';
import { useEffect, useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';
import Modal from 'react-modal';

import listSVG from '../../assets/list.svg';
import gridSVG from '../../assets/grid.svg';
import folderSVG from '../../assets/folder-blue.svg'
import settingsPNG from '../../assets/settings.png';
import profileImg from '../../assets/profile-user.svg';
import editSVG from '../../assets/edit.svg';
import trashSVG from '../../assets/trash.svg';
import arrowBack from '../../assets/arrow.svg';
import disketteSVG from '../../assets/diskette.svg';

import api from '../../services/api';

Modal.setAppElement('#root');

interface IFolder {
    _id: string,
    folderSrc: string;
    name: string,
    user: string,
    createdAt: string,
}

interface User {
    _id: string,
    name: string,
    email: string,
    group_administrativo: string,
    group_comercial: string,
    group_contratos: string,
    group_financeiro: string,
    group_fotos: string,
    group_meioAmbiente: string,
    group_pedreira: string,
    group_seguranca: string,
    group_tecnico: string,
    isAdmin: string,
}

export function Content() {
    const { users } = useFiles();
    const [isNewUploadModalOpen, setIsNewUploadModalOpen] = useState(false);
    const { setUploadedFiles, folder } = useFiles();
    const [isList, setIsList] = useState(true);
    const [user, setUser] = useState<User>();
    const [openFormSubFolder, setOpenFormSubFolder] = useState(false);
    const [openManagementUsers, setOpenManagementUsers] = useState(false);
    const [openModalEditUser, setOpenModalEditUser] = useState(false);
    const [inputSubFolderName, setInputSubFolderName] = useState('');
    const [updateListIndex, setUpdateListIndex] = useState(0);
    const [isAdminState, setIsAdminState] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('@mgtrafos/isAdmin') === '"true"') {
            setIsAdminState(true);
        }
    }, []);

    function handleEditUser(user: User) {
        setOpenManagementUsers(false);
        setOpenModalEditUser(true);
        setUser(user);
    }

    function handleBackToUsers() {
        setOpenManagementUsers(true);
        setOpenModalEditUser(false);
    }

    function handleOpenNewUploadModal() {
        setIsNewUploadModalOpen(true);
    }

    function handleCloseNewUploadModal() {
        setIsNewUploadModalOpen(false);
        setUploadedFiles([]);
    }

    async function handleCreateNewSubFolder() {
        console.log(inputSubFolderName, folder?._id);
        await api.post('/folders', {
            folderSrc: folder?._id,
            name: inputSubFolderName,
        });
        setOpenFormSubFolder(false);
        setInputSubFolderName('');
        let index = updateListIndex + 1;
        setUpdateListIndex(index);
    }

    return (
        <Container>
            { openModalEditUser && (
                <Modal
                    isOpen={openModalEditUser}
                    onRequestClose={() => setOpenModalEditUser(false)}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content-users"
                >
                    <ContainerEditProfile>
                        <HeaderEditProfile>
                            <img src={profileImg} alt="profile" />

                            <div>
                                <span>{user?.name}</span>
                                <span>{user?.email}</span>
                            </div>
                        </HeaderEditProfile>

                        <FooterEditProfile>
                            <button onClick={handleBackToUsers}>
                                <img src={arrowBack} alt="voltar" />
                                <span>Voltar</span>
                            </button>
                            <button>
                                <img src={disketteSVG} alt="salvar" />
                                <span>Salvar</span>
                            </button>
                        </FooterEditProfile>
                    </ContainerEditProfile>
                </Modal>

            )}

            { openManagementUsers && (
                <Modal
                    isOpen={openManagementUsers}
                    onRequestClose={() => setOpenManagementUsers(false)}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content-users"
                >
                    <TableContainer>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user: User) => (
                                    <tr key={user._id}>
                                        <td><img src={profileImg} width={20} height={20} alt="profile" /></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <ActionsContainer>
                                                <img src={editSVG} alt="edit" onClick={() => handleEditUser(user)} />
                                                <img src={trashSVG} alt="trash" />
                                            </ActionsContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TableContainer>
                </Modal>
            )}

            { openFormSubFolder && (
                <Modal
                    isOpen={openFormSubFolder}
                    onRequestClose={() => setOpenFormSubFolder(false)}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <div className="containerModalFolderCreate">
                        <div className="containerInput">
                            <img src={folderSVG} alt="pasta" width="20" height="20" />
                            <input
                                type="text"
                                placeholder="Nome da pasta"
                                onChange={event => setInputSubFolderName(event.target.value)} />
                        </div>
                        <div className="containerButton">
                            <button onClick={() => setOpenFormSubFolder(false)}>Cancelar</button>
                            <button
                                style={{ background: "#30E383", color: "#ffff", borderColor: "#30E383" }}
                                onClick={handleCreateNewSubFolder}>
                                Criar
                        </button>
                        </div>
                    </div>
                </Modal>
            )}

            <Header onOpenNewUploadModal={handleOpenNewUploadModal} />

            <div className="modeDisplay">
                {folder ? <span>{folder.name}</span> : <span>   </span>}
                <div>
                    {isAdminState && (
                        <button onClick={() => setOpenManagementUsers(true)}>
                            <img src={settingsPNG} alt="gerenciar usuario" />
                        Gerenciar Usuários
                        </button>
                    )}

                    <button onClick={() => setOpenFormSubFolder(true)}>
                        <img src={folderSVG} alt="subpasta" />
                        Criar Subpasta
                    </button>
                    {isList ? (<button onClick={() => setIsList(true)} className="active">
                        <img src={listSVG} alt="List" />
                    </button>) : (<button onClick={() => setIsList(true)}>
                        <img src={listSVG} alt="List" />
                    </button>)}

                    {!isList ? (<button onClick={() => setIsList(false)} className="active">
                        <img src={gridSVG} alt="Grid" />
                    </button>) : (<button onClick={() => setIsList(false)}>
                        <img src={gridSVG} alt="Grid" />
                    </button>)}
                </div>
            </div>

            {isList ? <FilesList folderSrc={folder?._id} updateListIndex={updateListIndex} /> : <QuickAccess />}

            <UploadModal
                isOpen={isNewUploadModalOpen}
                onRequestClose={handleCloseNewUploadModal}
            />
        </Container>
    )
}