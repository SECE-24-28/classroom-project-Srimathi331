import NavItem from "../NavItem/NavItem";

const Navbar = ()=>{
  const menuItems=[
    {name:"Home",link:"#home"},
    {name:"Plans",link:"#plans"},
    {name:"Login",link:"#login"},
    {name:"Signup",link:"#signup"},
  ];//javascript objects .........key:the property name,value:the data stored in that property.............other name Array of objects

  return(
    <div>
      <nav>
        <h2>RechaGo</h2>
        <ul>
          {menuItems.map((item,index) =>(
            <NavItem key={index} name={item.name} link={item.link}/>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;