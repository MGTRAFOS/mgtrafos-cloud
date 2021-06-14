import { Container, FileCard } from './styles';
import { Dropdown } from '../Dropdown';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';
import ppt from '../../assets/ppt.svg';
import doc from '../../assets/doc.svg';
import folderSVG from '../../assets/folder-blue.svg';

import filesize from 'filesize';

import { useFiles } from '../../contexts/FilesContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';

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

export function QuickAccess({ folderSrc, updateListIndex }: Props) {
    const { getFiles, filteredFiles, uploadedFiles, isLoading, setFolder } = useFiles();
    const [openDropdown, setOpenDropdown] = useState(false);
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
    }, [folderSrc, updateListIndex]);

    async function getSubFolders() {
        const { data } = await api.get(`subfolders/${folderSrc}`);

        if (data) {
            setSubfolders(data.sort((a: Subfolder, b: Subfolder) => {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }));
        }
    }

    function getExtension(fileName: string) {
        return fileName.split('.').pop();
    }

    function getName(fileName: string) {
        return fileName.split('.' + getExtension(fileName));
    }

    function getIcon(fileName: string) {
        const ext = getExtension(fileName)?.toLowerCase();

        switch (ext) {
            case 'pdf':
                return pdf;

            case 'xlsx':
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

            {subfolders.map((subfolder) => (
                <FileCard key={subfolder._id} onClick={() => setFolder(subfolder)}>
                    <img src={folderSVG} alt="folder" />
                    <span>{getName(subfolder.name)}</span>
                </FileCard>
            ))}

            {filteredFiles.map((file) => (
                <FileCard key={file._id} onClick={() => {
                    setOpenDropdown(!openDropdown);
                    setFileId(file._id);
                    setFileName(file.name);
                    setFileSize(filesize(file.size));
                    setFileUrl(file.url);
                }}>
                    <img src={`${getIcon(file.name)}`} alt="fileCard" />
                    <span>{getName(file.name)}</span>
                    <span>{filesize(file.size)}</span>
                </FileCard>
            ))}
        </Container>
    )
}