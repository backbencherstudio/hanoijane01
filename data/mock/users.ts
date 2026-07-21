export interface UserData {
  id: number;
  standNum: string;
  email: string;
  username: string;
  standType: string;
  status: "Active" | "Banned";
  role: "Super Admin" | "Admin";
  joinedDate: string;
  avatar: string;
}

export const users: UserData[] = [
  {
    id: 1,
    standNum: "Leslie Alexander",
    email: "john.smith@gmail.com",
    username: "Jonny777",
    standType: "Premium A",
    status: "Active",
    role: "Super Admin",
    joinedDate: "20 Jun 2026",
    avatar: "/avatars/avatar-1.png",
  },
  {
    id: 2,
    standNum: "Floyd Miles",
    email: "john.smith@gmail.com",
    username: "Jonny777",
    standType: "Standard",
    status: "Active",
    role: "Admin",
    joinedDate: "20 Jun 2026",
    avatar: "",
  },
  {
    id: 3,
    standNum: "Darrell Steward",
    email: "john.smith@gmail.com",
    username: "Jonny777",
    standType: "Premium B",
    status: "Active",
    role: "Admin",
    joinedDate: "20 Jun 2026",
    avatar: "/avatars/avatar-3.png",
  },
  {
    id: 4,
    standNum: "Ralph Edwards",
    email: "john.smith@gmail.com",
    username: "Jonny777",
    standType: "Outdoor",
    status: "Banned",
    role: "Admin",
    joinedDate: "20 Jun 2026",
    avatar: "/avatars/avatar-4.png",
  },
  {
    id: 5,
    standNum: "Cameron Williamson",
    email: "john.smith@gmail.com",
    username: "Jonny777",
    standType: "Premium C",
    status: "Active",
    role: "Admin",
    joinedDate: "20 Jun 2026",
    avatar: "/avatars/avatar-5.png",
  },
];