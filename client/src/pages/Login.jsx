import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div>
            <div>Login page</div>
            <Link to="/admin">Login as Admin</Link>
            <Link to="/customer">Login as Customer</Link>
        </div>
    )
}

export default Login