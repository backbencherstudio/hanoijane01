
export interface User {
  name: string;
  image: string;
  email: string;
}

interface ProfileDropdownProps {
  user: User;
  onLogout?: () => void;
}