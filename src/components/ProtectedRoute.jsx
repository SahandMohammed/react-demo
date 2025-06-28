import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, permissions = [], roles = [] }) => {
  const { user, hasPermission, hasAnyRole } = useAuth();

  if (!user) {
    return null; // Will be handled by the main App routing logic
  }

  // Check if user has required permissions
  if (permissions.length > 0) {
    const hasRequiredPermissions = permissions.every((permission) =>
      hasPermission(permission)
    );

    if (!hasRequiredPermissions) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-red-500 mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }
  }

  // Check if user has required roles
  if (roles.length > 0) {
    const hasRequiredRole = hasAnyRole(roles);

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-yellow-500 mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Insufficient Role
            </h1>
            <p className="text-gray-600">
              Your role doesn't have access to this page.
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
