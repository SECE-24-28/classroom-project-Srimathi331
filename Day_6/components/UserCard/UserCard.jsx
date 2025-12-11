function UserCard({ user }) {
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Mobile: {user.mobile}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserCard;
