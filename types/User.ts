export interface UserProp {
  name: string;
  image: string;
  email: string;
}

export interface ProfileDropdownProps {
  user: UserProp;
  onLogout?: () => void;
}
