import React, { useCallback } from "react";
import { useFiles } from "../../contexts/FilesContext";
import Modal from 'react-modal';
import UploadList from '../UploadList';

import {
    Container,
    Content,
    DropContainer,
    UploadMessage,
} from './styles';

import { useDropzone } from 'react-dropzone';

import closeSVG from '../../assets/close.svg';

Modal.setAppElement('#root');

interface NewUploadModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function UploadModal({ isOpen, onRequestClose }: NewUploadModalProps) {
    const { handleUpload } = useFiles();

    const onDrop = useCallback(
        (files) => {
            handleUpload(files);
        },
        [handleUpload]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
    } = useDropzone({
        accept: [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-word.document.macroEnabled.12",
            "application/vnd.ms-project",
        ],
        onDrop,
    });

    const renderDragMessage = useCallback(() => {
        if (!isDragActive) {
            return <UploadMessage>Arraste seus arquivos aqui...</UploadMessage>;
        }

        if (isDragReject) {
            return (
                <UploadMessage type="error">
                    Tipo de arquivo não suportado
                </UploadMessage>
            );
        }

        return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
    }, [isDragActive, isDragReject]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeSVG} alt="Fechar Modal" />
            </button>
            <Container>
                <Content>
                    <DropContainer {...getRootProps()}>
                        <input {...getInputProps()} />
                        {renderDragMessage()}
                    </DropContainer>
                </Content>
                <UploadList />
            </Container>
        </Modal>

    )
}