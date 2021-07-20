import { Container, MenuItem, Titulo, Subtitulo } from './styles';

import downloadSVG from '../../assets/file-download.svg';
import trashSVG from '../../assets/trash-blue.svg';
import eyeSVG from '../../assets/eye.svg';
import link from '../../assets/link-quebrado.png';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useFiles } from '../../contexts/FilesContext';

import pdf from '../../assets/pdf.svg';
import xls from '../../assets/xls.svg';
import jpg from '../../assets/jpg.svg';
import png from '../../assets/png.svg';
import ppt from '../../assets/ppt.svg';
import doc from '../../assets/doc.svg';
import { useState } from 'react';
import Modal from 'react-modal';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface FileInfo {
    id: string,
    name: string,
    size: string,
    url: string,
}

Modal.setAppElement('#root');

export function Dropdown({ id, name, size, url }: FileInfo) {
    const { deleteFile, setOpenDropdown } = useFiles();
    const [openModalLink, setOpenModalLink] = useState(false);

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
    return (
        <Container>
            <Modal
                isOpen={openModalLink}
                onRequestClose={() => setOpenModalLink(false)}
                overlayClassName="react-modal-overlay"
                className="react-modal-content-link"
            >
                <ToastContainer autoClose={2000}/>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                        background: '#4B88FF',
                        padding: '0.5rem',
                        borderRadius: '999px',
                        marginRight: '1rem',
                    }}>
                        <img src={link} alt="gerar link" width="24px" height="24px" />
                    </div>
                    <h1 style={{ opacity: '0.75', fontSize: '1.5rem' }}>Copiar Link Compartilhável</h1>
                </div>


                <input type="text" value={url} readOnly
                    style={{
                        width: '100%',
                        background: '#f0f0f0',
                        border: 0,
                        borderRadius: '4px',
                        padding: '1rem',
                        outline: 'none',
                    }}
                />

                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <CopyToClipboard text={url}>
                        <button style={{
                            background: '#ffff',
                            border: 0,
                            borderRadius: '4px',
                            padding: '0.75rem',
                            marginTop: '2rem',
                            fontWeight: 'bold',
                            color: '#4B88FF'
                        }}
                            onClick={() => {
                                return toast.dark('Link copiado');
                            }}
                        >
                            Copiar Link
                        </button>
                    </CopyToClipboard>

                    <button style={{
                        background: '#4B88FF',
                        border: 0,
                        borderRadius: '4px',
                        padding: '0.75rem',
                        marginTop: '2rem',
                        fontWeight: 'bold',
                        color: '#ffff'
                    }}
                        onClick={() => {
                            setOpenModalLink(false);
                            setOpenDropdown(false);
                        }}
                    >
                        Concluído
                    </button>
                </div>
            </Modal>
            <img src={getIcon(name)} alt="file-img" width={28} height={28} />
            <Titulo>{name}</Titulo>
            <Subtitulo>{size}</Subtitulo>
            <MenuItem onClick={() => setOpenDropdown(false)}>
                <a href={url} target="_blank">
                    <img src={eyeSVG} alt="Visualizar" />
                    <span>Visualizar</span>
                </a>
            </MenuItem>

            <MenuItem>
                <img src={downloadSVG} alt="Download" />
                <span>Fazer download</span>
            </MenuItem>

            <MenuItem onClick={() => {
                setOpenModalLink(true);
            }}>
                <img src={link} alt="gerar link" />
                <span>Gerar link</span>
            </MenuItem>

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