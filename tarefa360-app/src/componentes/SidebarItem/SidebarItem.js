import style from './SidebarItem.module.css';
import { Link } from 'react-router-dom';

export function SidebarItem({texto, link, logo}) {
    return (
        
            <Link to={link} className={style.sidebar_item}>
                {logo}
                <h5 className={style.texto_link}>{texto}</h5>
             </Link>
        
    );
}