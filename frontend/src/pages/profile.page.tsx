import MyContainer from "../components/hoc/my.container";
import Profile from "../components/profile";
import redux from "../redux";

export default function ProfilePage() {
  const { user } = redux.getState();

  return (
    <MyContainer>
      <Profile data={user} />
    </MyContainer>
  );
}
