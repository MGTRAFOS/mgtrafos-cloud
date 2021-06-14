import { useEffect, useState } from 'react';
import { Container, ContainerTable } from './styles'
import { useFiles } from '../../contexts/FilesContext';
import { Dropdown } from '../Dropdown';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import filesize from "filesize";
import Loader from 'react-loader-spinner';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';
import ppt from '../../assets/ppt.svg';
import doc from '../../assets/doc.svg';
import folderSVG from '../../assets/folder-blue.svg';
import downArrowSVG from '../../assets/down-arrow.svg';
import trashSVG from '../../assets/trash.svg';
import editSVG from '../../assets/edit.svg';
import Modal from 'react-modal';

import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';

Modal.setAppElement('#root');

export interface IFile {
    id: string;
    name: string;
    readableSize: string;
    uploaded?: boolean;
    preview: string;
    file: File | null;
    progress?: number;
    error?: boolean;
    url: string;
}

interface IPost {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
    createdAt: string;
    user: string,
}

interface Props {
    folderSrc?: string,
    updateListIndex: number,
}

interface Subfolder {
    _id: string;
    name: string;
    folderSrc: string;
    user: string;
    createdAt: string;
}

export function FilesList({ folderSrc, updateListIndex }: Props) {
    const {
        getFiles,
        filteredFiles,
        searchString,
        uploadedFiles,
        isLoading,
        setOpenDropdown,
        openDropdown,
        setFolder,
        getUsers,
        users,
        folder
    } = useFiles();
    const [fileId, setFileId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [subfolders, setSubfolders] = useState<Subfolder[]>([]);
    const [filteredSubfolders, setFilteredSubfolders] = useState<Subfolder[]>([]);
    const [folderEditProps, setFolderEditProps] = useState<Subfolder>();
    const [folderEditNewName, setFolderEditNewName] = useState('');
    const [openRenameSubFolderModal, setOpenRenameSubFolderModal] = useState(false);

    useEffect(() => {
        getFiles();
    }, [uploadedFiles]);

    useEffect(() => {
        getSubFolders();
    }, [folderSrc, updateListIndex]);

    useEffect(() => {
        filterSubFolders();
    }, [searchString]);

    useEffect(() => {
        getUsers();
    }, []);

    async function handleRemoveFolder(id: string) {
        await api.delete(`folders/${id}`);
        setSubfolders((state) => state.filter((folder) => folder._id !== id));
        return toast.success('pasta deletada com sucesso');
    }

    async function getSubFolders() {
        const { data } = await api.get(`subfolders/${folderSrc}`);

        if (data) {
            setSubfolders(data.sort((a: Subfolder, b: Subfolder) => {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }));

            setFilteredSubfolders(data);
        }
    }

    async function handleRenameSubfolder() {
        if (folder) {
            await api.put('/folders', {
                _id: folder._id,
                newName: folderEditNewName
            })
            return toast.success('Nome da pasta foi alterado com sucesso');
        } else {
            return toast.success('Erroa ao alterar nome da pasta');
        }
    }

    function filterSubFolders() {
        setFilteredSubfolders(
            subfolders.filter(subfolder => {
                return subfolder.name.toLowerCase().includes(searchString.toLowerCase());
            })
        );
    }

    function getUserName(id: string) {
        var aux;
        users.map(user => {
            if (user._id === id) {
                aux = user.name;
            }
        })

        return aux;
    }

    function getExtension(fileName: string) {
        return fileName.split('.').pop();
    }

    function getIcon(fileName: string) {
        const ext = getExtension(fileName)?.toLowerCase();

        switch (ext) {
            case 'pdf':
                return pdf;

            case 'xlsx':
                return xls;

            case 'xls':
                return xls;

            case 'jpg':
                return jpg;

            case 'jpeg':
                return jpg;

            case 'png':
                return png;

            case 'doc':
                return doc;

            case 'docx':
                return doc;

            case 'pptx':
                return ppt;

            case 'ppt':
                return ppt;
        }
    }

    function getFormattedDate(fileDate: string) {
        const dateFormatted = fileDate.replace('T', " ").split('.')[0];
        return dateFormatted;
    }

    return (
        <Container>
            <Modal
                isOpen={openRenameSubFolderModal}
                onRequestClose={() => setOpenRenameSubFolderModal(false)}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <span>Nome da pasta: </span>
                        <input type="text" value={folderEditProps?.name} disabled
                            style={{ width: 'auto', marginLeft: '1rem', fontSize: '1rem', opacity: '1' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <span>Novo nome da pasta: </span>
                        <input type="text" value={folderEditNewName}
                            style={{ width: 'auto', marginLeft: '1rem', fontSize: '1rem', opacity: '1' }}
                            onChange={e => setFolderEditNewName(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            style={{
                                background: "#30E383",
                                color: "#ffff",
                                border: "1px solid#30E383",
                                padding: '0.5rem 2rem',
                                borderRadius: '4px',
                                marginTop: '1rem'
                            }}
                            onClick={() => {
                                setOpenRenameSubFolderModal(false);
                                handleRenameSubfolder()
                            }}>
                            Alterar
                        </button>
                    </div>

                </div>
            </Modal>

            <ToastContainer />
            {openDropdown && (
                <Dropdown
                    id={fileId}
                    name={fileName}
                    size={fileSize}
                    url={fileUrl}
                />
            )}

            {isLoading ? (
                <ContainerTable>
                    <Loader
                        type="TailSpin"
                        color="#4B88FF"
                        height={75}
                        width={75}
                    />
                </ContainerTable>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome <img src={downArrowSVG} alt="down-arrow" /></th>
                            <th>Tamanho <img src={downArrowSVG} alt="down-arrow" /></th>
                            <th>Usuário</th>
                            <th>Data de inclusão <img src={downArrowSVG} alt="down-arrow" /></th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubfolders.map((subfolder: Subfolder) => (
                            <tr key={subfolder._id} onClick={() => {
                                setFolder(subfolder);
                            }}>
                                <td><img src={folderSVG} alt="foldersvg" /></td>
                                <td>{subfolder.name}</td>
                                <td></td>
                                <td></td>
                                <td>{getFormattedDate(subfolder.createdAt)}</td>
                                <td>
                                    <div>
                                        <img src={trashSVG} alt="lixeira"
                                            onClick={() => {
                                                window.confirm(`Tem certeza que deseja excluir a pasta: ${subfolder.name}?`) &&
                                                    handleRemoveFolder(subfolder._id)
                                            }} />
                                        <img src={editSVG} alt="edit" onClick={() => {
                                            setOpenRenameSubFolderModal(true)
                                            setFolderEditProps(subfolder)
                                        }} />
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredFiles.map((file: IPost) => (
                            <tr key={file._id}>
                                <td><img src={`${getIcon(file.name)}`} alt="file-icon" /></td>
                                <td>
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {file.name}
                                    </a>
                                </td>
                                <td>{filesize(file.size)}</td>
                                <td>{getUserName(file.user)}</td>
                                <td>{getFormattedDate(file.createdAt)}</td>
                                <td>
                                    <button onClick={() => {
                                        setOpenDropdown(!openDropdown);
                                        setFileId(file._id);
                                        setFileName(file.name);
                                        setFileSize(filesize(file.size));
                                        setFileUrl(file.url);
                                    }}>
                                        ...
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Container >
    )
}