import { Container, ButtonPlus, Folder, StorageCount, ButtonInvisible } from './styles';
import logo from '../../assets/logo-black.png';
import folderSVG from '../../assets/folder-blue.svg';
import plusSVG from '../../assets/plus.svg';
import editSVG from '../../assets/edit.svg';
import trashSVG from '../../assets/trash.svg';
import profileImg from '../../assets/profile-user.svg';
import { useFiles } from '../../contexts/FilesContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import fileSize from 'filesize';
import Modal from 'react-modal';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { TableContainer } from '../Content/styles';

export interface IFolder {
    _id: string,
    folderSrc: string,
    name: string,
    createdAt: string,
}

interface Group {
    _id: string,
    users: [string],
    name: string,
    createdAt: string,
}

interface User {
    _id: string,
    name: string,
    email: string,
    isAdmin: string,
}

Modal.setAppElement('#root');

export function LeftSideBar() {
    useEffect(() => {
        getUsers();
    }, []);

    const { setGroupCallBack, getUsers, users, getFolders, setFolder, setIsLoading, handleRemoveGroup } = useFiles();
    const [countStorageUsed, setCountStorageUsed] = useState(0);
    const [groups, setGroups] = useState<Group[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    const [openFormFolder, setOpenFormFolder] = useState(false);
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
    const [inputFolderName, setInputFolderName] = useState('');
    const [isAdminState, setIsAdminState] = useState(false);
    const [groupSelected, setGroupSelected] = useState<Group>();
    const [editNameGroup, setEditNameGroup] = useState('');
    const [openEditGroup, setOpenEditGroup] = useState(false);
    const [usersAllowed, setUsersAllowed] = useState(['']);
    const [isChecked, setIsChecked] = useState(
        new Array(users.length).fill(false)
    );

    useEffect(() => {
        if (users) {
            setIsChecked(new Array(users.length).fill(false));
        }
    }, [users])


    useEffect(() => {
        if (sessionStorage.getItem('@mgtrafos/isAdmin') === '"true"') {
            setIsAdminState(true);
        }

        getGroups();
        getUsers();
        getFolders();
    }, []);

    useEffect(() => {
        filterGroups();
    }, [groups]);

    async function getGroups() {
        setIsLoading(true);
        const { data } = await api.get('/groups');
        if (data) {
            setGroups(data.sort((a: Group, b: Group) => {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }));

            setIsLoading(false);
        }
    }

    function filterGroups() {
        const userId = sessionStorage.getItem('@mgtrafos/user_id');
        const filteredGroupsAux: Group[] = [];

        groups.map((group: Group) => {
            group.users.map((id: string) => {
                if (`"${id}"` === userId) {
                    filteredGroupsAux.push(group);
                }
            })
        });

        setFilteredGroups(filteredGroupsAux);
    }

    async function handleCreateNewGroup() {
        if (!inputFolderName) {
            return toast.error('Preencha o nome do Grupo');
        }

        await api.post('/groups', {
            name: inputFolderName,
            users: usersAllowed,
        })

        getGroups();
        setOpenFormFolder(false);
        setInputFolderName('');
        setUsersAllowed(['']);
        return toast.success('Grupo criado com sucesso');
    }

    async function handleDeleteGroup(id: string) {
        await handleRemoveGroup(id);
        setGroups((state) => state.filter((group) => group._id !== id));
        return toast.success('Pasta deletada!');
    }

    async function handleEditGroup() {
        if (groupSelected) {
            await api.put('/groups', {
                name: groupSelected.name,
                newName: editNameGroup,
                users: usersAllowed,
            });
            setOpenEditGroup(false);
            return toast.success('Grupo editado');
        }
    }

    function handleOnChange(userId: string, position: number) {
        console.log(isChecked);
        const updatedCheckedState = isChecked.map((item, index) =>
            index === position ? !item : item
        );

        setIsChecked(updatedCheckedState);

        if (!isChecked[position]) {
            setUsersAllowed([...usersAllowed, userId]);
        } else {
            setUsersAllowed((state) => state.filter((id) => userId !== id));
        }

        console.log(usersAllowed);

    }

    return (
        <Container>
            <div>
                <img src={logo} alt="logo" />
                <ToastContainer />
                {
                    isAdminState ? (
                        <ButtonPlus onClick={() => setOpenFormFolder(!openFormFolder)}>
                            <img src={plusSVG} alt="plus" />
                            <span>Gerenciar Grupos</span>
                        </ButtonPlus>
                    ) : <ButtonInvisible />
                }
            </div>

            <div style={{
                flex: 1,
                width: "100%",
                padding: "0.5rem",
                overflow: 'auto',
                maxHeight: '50vh',
            }}>

                <span>Grupos</span>

                {filteredGroups.map((group: Group) => (
                    <Folder key={group._id} onClick={() => {
                        setFolder({
                            _id: group._id,
                            folderSrc: 'raiz',
                            name: group.name,
                            createdAt: group.createdAt
                        });

                        setGroupCallBack({
                            _id: group._id,
                            folderSrc: 'raiz',
                            name: group.name,
                            createdAt: group.createdAt
                        });
                    }}>
                        <img src={folderSVG} alt="folder" width="16" height="16" />
                        <span>{group.name}</span>
                    </Folder>
                ))}
            </div>



            {openFormFolder && (
                <Modal
                    isOpen={openFormFolder}
                    onRequestClose={() => setOpenFormFolder(false)}
                    overlayClassName="react-modal-overlay"
                    className="react-modal-content"
                >
                    <div className="containerModalFolderCreate">
                        {groups.map((group: Group) => (
                            <div key={group._id} className="containerFoldersDelete">
                                <div>
                                    <img src={folderSVG} alt="pasta" width="20" height="20" />
                                    <span>{group.name}</span>
                                </div>

                                <div>
                                    <img src={editSVG} alt="lixo"
                                        style={{ cursor: "pointer" }} width="20" height="20"
                                        onClick={() => {
                                            setOpenEditGroup(true);
                                            setOpenCreateGroupModal(false);
                                            setOpenFormFolder(false);
                                            setGroupSelected(group);
                                        }}
                                    />

                                    <img src={trashSVG} alt="lixo"
                                        style={{ cursor: "pointer" }} width="20" height="20"
                                        onClick={() => {
                                            window.confirm(`Tem certeza que deseja excluir a pasta: ${group.name}?`) &&
                                                handleDeleteGroup(group._id);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="containerModalFolderCreate">
                        <div className="containerButton">
                            <button onClick={() => setOpenFormFolder(false)}>Cancelar</button>
                            <button
                                style={{ background: "#30E383", color: "#ffff", borderColor: "#30E383" }}
                                onClick={() => {
                                    setOpenFormFolder(false);
                                    setOpenCreateGroupModal(true);
                                }}>
                                Criar Grupo
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <Modal
                isOpen={openCreateGroupModal}
                onRequestClose={() => setOpenCreateGroupModal(false)}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >

                <div className="containerModalFolderCreate">
                    <div className="containerInput">
                        <img src={folderSVG} alt="pasta" width="20" height="20" />
                        <input
                            type="text"
                            placeholder="Nome do Grupo"
                            onChange={event => setInputFolderName(event.target.value)} />
                    </div>

                    <div style={{ width: '100%', marginBottom: '2rem' }}>
                        <TableContainer>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Permitir Usuário</th>
                                    </tr>
                                </thead>

                                <tbody style={{ overflow: 'auto' }}>
                                    {users.map((user: User, index) => (
                                        <tr key={user._id}>
                                            <td><img src={profileImg} width={20} height={20} alt="profile" /></td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td><input type="checkbox"
                                                onChange={() => handleOnChange(user._id, index)} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </TableContainer>
                    </div>

                    <div className="containerButton">
                        <button onClick={() => {
                            setOpenCreateGroupModal(false)
                            setIsChecked(new Array(users.length).fill(false))
                            setUsersAllowed([''])
                        }}>
                            Cancelar
                        </button>

                        <button
                            style={{ background: "#30E383", color: "#ffff", borderColor: "#30E383" }}
                            onClick={() => {
                                handleCreateNewGroup();
                                setOpenCreateGroupModal(false)
                            }}>
                            Criar Grupo
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={openEditGroup}
                onRequestClose={() => setOpenEditGroup(false)}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >

                <div className="containerModalFolderCreate">
                    <div className="containerInput">
                        <img src={folderSVG} alt="pasta" width="20" height="20" />
                        <input
                            type="text"
                            placeholder="Nome do Grupo"
                            onChange={event => setEditNameGroup(event.target.value)}
                            value={editNameGroup}
                        />
                    </div>

                    <div style={{ width: '100%', marginBottom: '2rem' }}>
                        <TableContainer>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Permitir Usuário</th>
                                    </tr>
                                </thead>

                                <tbody style={{ overflow: 'auto' }}>
                                    {users.map((user: User, index) => (
                                        <tr key={user._id}>
                                            <td><img src={profileImg} width={20} height={20} alt="profile" /></td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td><input type="checkbox"
                                                checked={isChecked[index]}
                                                onChange={() => handleOnChange(user._id, index)}
                                            /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </TableContainer>
                    </div>

                    <div className="containerButton">
                        <button onClick={() => {
                            setOpenEditGroup(false)
                            setIsChecked(new Array(users.length).fill(false))
                            setUsersAllowed(['']);
                        }}>Cancelar</button>
                        <button
                            style={{ background: "#30E383", color: "#ffff", borderColor: "#30E383" }}
                            onClick={() => {
                                handleEditGroup();
                                setOpenCreateGroupModal(false);
                            }}>
                            Salvar
                        </button>
                    </div>
                </div>
            </Modal>

            <StorageCount>
                <span><strong>{fileSize(Math.round(countStorageUsed))} </strong>of 5GB</span>
                <div>
                    <div style={{ width: `${(countStorageUsed / 1024) / 1024 / 1024 * 20}%` }} />
                </div>
                <span>Individual</span>
                <span>Conta</span>
            </StorageCount>

        </Container>
    )
}