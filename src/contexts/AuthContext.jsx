import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextDefinition";

// Mock user data with different roles
const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@company.com",
    role: "admin",
    permissions: [
      "read",
      "write",
      "delete",
      "manage_users",
      "view_analytics",
      "manage_settings",
    ],
  },
  {
    id: 2,
    username: "manager",
    password: "manager123",
    email: "manager@company.com",
    role: "manager",
    permissions: ["read", "write", "view_analytics"],
  },
  {
    id: 3,
    username: "employee",
    password: "employee123",
    email: "employee@company.com",
    role: "employee",
    permissions: ["read"],
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (localStorage)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    login,
    logout,
    hasPermission,
    hasRole,
    hasAnyRole,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
