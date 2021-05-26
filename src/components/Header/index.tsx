import { useContext, useEffect, useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';

import {
    InputContainer,
    ProfileImage,
    ProfileInfo,
} from './styles';

import profileImg from '../../assets/profile-user.svg';
import searchSVG from '../../assets/search.svg';
import downRight from '../../assets/down-arrow.svg';
import logoutSVG from '../../assets/logout.svg';
import { AuthContext } from '../../contexts/AuthContext';

interface HeaderProps {
    onOpenNewUploadModal: () => void;
}

export function Header({ onOpenNewUploadModal }: HeaderProps) {
    const { files, getFilteredFiles, getFilteredFolders } = useFiles();
    const [search, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);

    const { handleLogout } = useContext(AuthContext);

    useEffect(() => {
        getFilteredFiles(search);
        getFilteredFolders(search);
    }, [search, files]);

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <InputContainer>
                        <img src={searchSVG} alt="search" />
                        <input placeholder="Pesquise aqui" onChange={e => setSearch(e.target.value)} />
                    </InputContainer>

                    <button onClick={onOpenNewUploadModal} className="btn_upload">Enviar arquivos</button>

                    <ProfileInfo>
                        <span>{sessionStorage.getItem('@mgtrafos/user_name')?.split('"')}</span>
                        <span>{sessionStorage.getItem('@mgtrafos/user_email')?.split('"')}</span>
                    </ProfileInfo>

                    <ProfileImage>
                        <img src={profileImg} alt="profile" />
                    </ProfileImage>

                    <button className="icon-button" onClick={() => setOpenMenu(!openMenu)}>
                        <img src={downRight} alt="logout" />
                    </button>

                    {openMenu && (
                        <div className="dropdown"> 
                            <button className="menu-item" onClick={handleLogout}>
                                <img src={logoutSVG} alt="Sair" />
                                <span>Sair</span>
                            </button>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    )
}