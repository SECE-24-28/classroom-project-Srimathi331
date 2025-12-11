import NavbarItem from "./NavbarItem";

function Navbar({ active, onTabChange }) {
  const tabs = ["Home", "Plans", "Recharge History", "Profile", "Offers", "Help"];
  return (
    <nav>
      {tabs.map((tab) => (
        <NavbarItem
          key={tab}
          label={tab}
          isActive={active === tab}
          onClick={() => onTabChange(tab)}
        />
      ))}
    </nav>
  );
}

export default Navbar;
