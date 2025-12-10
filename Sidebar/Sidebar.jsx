import SidebarItem from "./SidebarItem";

const Sidebar=()=>{
    const menuItems=[
        {label:"Home"},
        {label:"Plans"},
        {label:"Offers"},
        {label:"Recharge History"},
        {label:"Profile"},
    ];
    
    return(
        <aside>
            <h3>Menu</h3>
            <ul>
                {menuItems.map((index,item)=>
                {
                    <SidebarItem key={index} label={item.label}/>
                })}
            </ul>
        </aside>
    );
}

export default Sidebar;