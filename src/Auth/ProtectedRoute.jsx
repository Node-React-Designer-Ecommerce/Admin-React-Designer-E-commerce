import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return user ? children : null;
}

ProtectedRoute.propTypes = { 
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
