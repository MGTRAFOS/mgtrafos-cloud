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
    folderSrc: string,
    name: string,
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

interface IFileContextData {
    files: IPost[];
    folder?: IFolder;
    isLoading: boolean;
    openDropdown: boolean;
    uploadedFiles: IFile[];
    users: User[];
    deleteFile(id: string): void;
    handleUpload(file: any): void;
    getFiles: () => Promise<void>;
    getFilteredFiles: (search: string) => void;
    filteredFiles: IPost[];
    setUploadedFiles: (files: IFile[]) => void;
    setFolder: (folder: IFolder) => void;
    setIsLoading: (aux: boolean) => void;
    setOpenDropdown: (aux: boolean) => void;
    handleRemoveGroup: (id: string) => void;
    getUsers: () => Promise<void>;
}
const FilesContext = createContext<IFileContextData>({} as IFileContextData);

const FileProvider: React.FC = ({ children }) => {
    const [files, setFiles] = useState<IPost[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<IPost[]>([]);
    const [users, setUsers] = useState([]);
    const [folder, setFolder] = useState<IFolder>();
    const [isLoading, setIsLoading] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        return () => {
            uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    });

    useEffect(() => {
        getFiles();
    }, [folder?._id]);

    useEffect(() => {
        getUsers();
    }, []);

    const updateFile = useCallback((id, data) => {
        setUploadedFiles((state) =>
            state.map((file) => (file.id === id ? { ...file, ...data } : file))
        );
    }, []);

    async function getUsers() {
        await api.get('/users').then(response => {
            const { data } = response;

            if (data)
                setUsers(data);
        });
    }

    async function getFiles() {
        setIsLoading(true);
        if (folder) {
            await api.get(`posts/${folder._id}`).then((response) => {
                const { data } = response;
                setFiles(data);
                setIsLoading(false);
            }).catch(response => {
                console.log(response);
                setIsLoading(false);
            });
        }

        setIsLoading(false);
    }

    async function handleRemoveGroup(id: string) {
        if (id) {
            await api.delete(`groups/${id}`);
        }
    }

    function getFilteredFiles(search: string) {
        setFilteredFiles(
            files.filter(file => {
                return file.name.toLowerCase().includes(search.toLowerCase())
            })
        );
    }

    const processUpload =
        (uploadedFile: IFile) => {
            const data = new FormData();
            if (uploadedFile.file) {
                data.append("file", uploadedFile.file, uploadedFile.name);
                if (folder) {
                    data.append("folder_id", folder._id);
                }
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
        }

    const handleUpload = (files: File[]) => {
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
        }));

        setUploadedFiles((state) => state.concat(newUploadedFiles));
        newUploadedFiles.forEach(processUpload);
    }

    const deleteFile = ((id: string) => {
        api.delete(`posts/${id}`).then(() => getFiles());
        setUploadedFiles((state) => state.filter((file) => file.id !== id));
    });

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
            setFolder,
            folder,
            isLoading,
            setIsLoading,
            setOpenDropdown,
            openDropdown,
            handleRemoveGroup,
            getUsers,
            users,
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