import Navbar from "../Navbar/Navbar";

const NavItem=({name,link})=>{
    return(
        <li>
            <a href={link}>{name}</a>
        </li>
    );
}

export default NavItem;