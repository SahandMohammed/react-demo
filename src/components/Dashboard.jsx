import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  BarChart3,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  ShoppingCart,
  FileText,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const { user, logout, hasPermission } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", name: "Overview", icon: Home, permission: "read" },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      permission: "view_analytics",
    },
    {
      id: "users",
      name: "User Management",
      icon: Users,
      permission: "manage_users",
    },
    { id: "inventory", name: "Inventory", icon: Package, permission: "read" },
    { id: "orders", name: "Orders", icon: ShoppingCart, permission: "read" },
    { id: "reports", name: "Reports", icon: FileText, permission: "read" },
    { id: "calendar", name: "Calendar", icon: Calendar, permission: "read" },
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
      permission: "manage_settings",
    },
  ];

  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      name: "Active Users",
      value: "2,350",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
    },
    {
      name: "Orders",
      value: "3,456",
      change: "+8.2%",
      changeType: "positive",
      icon: ShoppingCart,
    },
    {
      name: "Inventory Items",
      value: "12,847",
      change: "-2.4%",
      changeType: "negative",
      icon: Package,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New order placed",
      user: "John Doe",
      time: "2 minutes ago",
      type: "order",
    },
    {
      id: 2,
      action: "User registered",
      user: "Jane Smith",
      time: "5 minutes ago",
      type: "user",
    },
    {
      id: 3,
      action: "Inventory updated",
      user: "System",
      time: "10 minutes ago",
      type: "inventory",
    },
    {
      id: 4,
      action: "Report generated",
      user: "Admin",
      time: "15 minutes ago",
      type: "report",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    hasPermission(item.permission)
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <stat.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp
                      className={`w-4 h-4 mr-1 ${
                        stat.changeType === "positive"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      from last month
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "order"
                            ? "bg-blue-100 text-blue-600"
                            : activity.type === "user"
                            ? "bg-green-100 text-green-600"
                            : activity.type === "inventory"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {activity.type === "order" && (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                        {activity.type === "user" && (
                          <Users className="w-4 h-4" />
                        )}
                        {activity.type === "inventory" && (
                          <Package className="w-4 h-4" />
                        )}
                        {activity.type === "report" && (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          by {activity.user}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analytics Dashboard
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Sales Chart</p>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Growth Metrics</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              User Management
            </h3>
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                User management interface would go here
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {activeTab}
            </h3>
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">{activeTab} content would go here</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">ERP System</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 overflow-y-auto">
          <div className="space-y-1">
            {filteredMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden md:block ml-4 lg:ml-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {activeTab}
            </h2>
            <p className="text-gray-600">
              Welcome back, {user.email.split("@")[0]}!
            </p>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
