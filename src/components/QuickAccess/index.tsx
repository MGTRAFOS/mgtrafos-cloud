import { Container, FileCard } from './styles';
import { Dropdown } from '../Dropdown';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';

import filesize from 'filesize';

import { useFiles } from '../../contexts/FilesContext';
import { useState } from 'react';

export function QuickAccess() {
    const { filteredFiles } = useFiles();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [fileId, setFileId] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [fileUrl, setFileUrl] = useState('');

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