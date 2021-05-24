import React, { Dispatch, SetStateAction } from 'react';

import { Container, MenuItem, Titulo, Subtitulo } from './styles';

import downloadSVG from '../../assets/file-download.svg';
import trashSVG from '../../assets/trash-blue.svg';
import eyeSVG from '../../assets/eye.svg';
import { useFiles } from '../../contexts/FilesContext';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';

interface FileInfo {
    id: string,
    name: string,
    size: string,
    url: string,
}

export function Dropdown({ id, name, size, url }: FileInfo) {
    const { deleteFile, setOpenDropdown } = useFiles();

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
    return (
        <Container>
            <img src={getIcon(name)} alt="file-img" width={28} height={28} />
            <Titulo>{name}</Titulo>
            <Subtitulo>{size}</Subtitulo>
            <MenuItem onClick={() => setOpenDropdown(false)}>
                <a href={url} target="_blank">
                    <img src={eyeSVG} alt="Visualizar" />
                    <span>Visualizar</span>
                </a>
            </MenuItem>

            {/* <MenuItem>
                <img src={downloadSVG} alt="Download" />
                <span>Fazer download</span>
            </MenuItem> */}

            <MenuItem onClick={() => {
                deleteFile(id);
                setOpenDropdown(false);
            }}>
                <img src={trashSVG} alt="Trash" />
                <span>Remover</span>
            </MenuItem>
        </Container>
    )
}