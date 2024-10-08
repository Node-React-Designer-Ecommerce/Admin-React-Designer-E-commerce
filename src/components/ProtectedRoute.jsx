import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Default import
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children, isAuth = true }) {
  const { isLoggedIn, role } = useContext(AuthContext);

  if (isAuth && (!isLoggedIn || role !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuth && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};