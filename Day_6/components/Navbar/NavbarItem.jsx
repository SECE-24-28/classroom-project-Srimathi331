function NavbarItem({ label, isActive, onClick }) {
  return (
    <button onClick={onClick}>
      {label} {isActive ? "(Active)" : ""}
    </button>
  );
}

export default NavbarItem;
