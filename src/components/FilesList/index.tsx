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
import api from '../../services/api';
import folderSVG from '../../assets/folder-blue.svg';

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
    const { getFiles, filteredFiles, uploadedFiles, isLoading, setOpenDropdown, openDropdown, setFolder } = useFiles();
    const [fileId, setFileId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [subfolders, setSubfolders] = useState<Subfolder[]>([]);

    useEffect(() => {
        getFiles();
    }, [uploadedFiles]);

    useEffect(() => {
        getSubFolders();
    }, [folderSrc,updateListIndex]);

    async function getSubFolders() {
        const { data } = await api.get(`subfolders/${folderSrc}`);
        console.log(data);

        if (data) {
            setSubfolders(data);
        }
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
        }
    }

    function getFormattedDate(fileDate: string) {
        const dateFormatted = fileDate.replace('T', " ").split('.')[0];
        return dateFormatted;
    }

    return (
        <Container>
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
                            <th>Nome</th>
                            <th>Tamanho</th>
                            <th>Tipo</th>
                            <th>Data de inclusão</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subfolders.map((subfolder: Subfolder) => (
                            <tr key={subfolder._id} onClick={() => setFolder(subfolder)}>
                                <td><img src={folderSVG} alt="foldersvg" /></td>
                                <td>{subfolder.name}</td>
                                <td></td>
                                <td></td>
                                <td></td>
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
                                <td>{getExtension(file.name)}</td>
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