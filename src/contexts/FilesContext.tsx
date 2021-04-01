import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
} from "react";

import filesize from "filesize";
import { v4 as uuidv4 } from "uuid";

import api from '../services/api';

export interface IPost {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
    createdAt: string,
}

export interface IFolder {
    _id: string,
    name: string,
    user: string,
    createdAt: string,
}

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
    folder_Id: string,
}

interface IFileContextData {
    files: IPost[];
    uploadedFiles: IFile[];
    deleteFile(id: string): void;
    handleUpload(file: any): void;
    getFiles: () => Promise<void>,
    getFilteredFiles: (search: string) => void,
    filteredFiles: IPost[],
    setUploadedFiles: (files: IFile[]) => void,
}
const FilesContext = createContext<IFileContextData>({} as IFileContextData);

const FileProvider: React.FC = ({ children }) => {
    const [files, setFiles] = useState<IPost[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<IPost[]>([]);

    useEffect(() => {
        return () => {
            uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    });

    const updateFile = useCallback((id, data) => {
        setUploadedFiles((state) =>
            state.map((file) => (file.id === id ? { ...file, ...data } : file))
        );
    }, []);

    async function getFiles() {
        try {
            const { data } = await api.get(`posts/${'6065aedcbf0bdc18306cf33d'}`);
            console.log(data);
            setFiles(data);
        } catch (error) {
            alert(error);
        }
    }

    function getFilteredFiles(search: string) {
        setFilteredFiles(
            files.filter(file => {
                return file.name.toLowerCase().includes(search.toLowerCase())
            })
        );
    }

    const processUpload = useCallback(
        (uploadedFile: IFile) => {
            const data = new FormData();
            if (uploadedFile.file) {
                data.append("file", uploadedFile.file, uploadedFile.name);
                data.append("folder_id", uploadedFile.folder_Id);
            }

            api.post("/posts", data, {
                onUploadProgress: (progressEvent) => {
                    let progress: number = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );

                    console.log(`A imagem ${uploadedFile.name} est√° ${progress}% carregada... `);

                    updateFile(uploadedFile.id, { progress });
                },
            }).then((response) => {
                console.log(`A imagem ${uploadedFile.name} j√° foi enviada para o servidor!`);
                console.log(response);

                updateFile(uploadedFile.id, {
                    uploaded: true,
                    id: response.data._id,
                    url: response.data.url,
                });
            })
                .catch((err) => {
                    console.error(`Houve um problema para fazer upload da imagem ${uploadedFile.name} no servidor AWS`);
                    console.log(err);

                    updateFile(uploadedFile.id, {
                        error: true,
                    });
                });
        },
        [updateFile]
    );

    const handleUpload = useCallback(
        (files: File[]) => {
            const newUploadedFiles: IFile[] = files.map((file: File) => ({
                file,
                id: uuidv4(),
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                progress: 0,
                uploaded: false,
                error: false,
                url: "",
                folder_Id: '6065d1bc5770f220982b3a15',
            }));

            setUploadedFiles((state) => state.concat(newUploadedFiles));
            newUploadedFiles.forEach(processUpload);
        },
        [processUpload]
    );

    const deleteFile = useCallback((id: string) => {
        api.delete(`posts/${id}`);
        setUploadedFiles((state) => state.filter((file) => file.id !== id));
    }, []);

    return (
        <FilesContext.Provider value={{
            files,
            uploadedFiles,
            deleteFile,
            handleUpload,
            filteredFiles,
            getFilteredFiles,
            getFiles,
            setUploadedFiles,
        }}>
            {children}
        </FilesContext.Provider>
    );
};

function useFiles(): IFileContextData {
    const context = useContext(FilesContext);

    if (!context) {
        throw new Error("useFiles must be used within FileProvider");
    }

    return context;
}

export { FileProvider, useFiles };