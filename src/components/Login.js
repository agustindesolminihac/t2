import {useState, useContext, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const history = useHistory();

    const handleInputChange = (e) => {
        setUsuario(e.target.value);
      };

    return ( 
        <div className="login">
            <h2>Inicio de sesión</h2>
            <form>
                <label>Número de alumno:
                    <input 
                    type="text" 
                    required
                    value={usuario}
                    onChange={handleInputChange}
                    />
                </label>
                <Link
                    to={{
                        pathname: '/sala',
                        state: { valor: usuario },
                        }}
                >
                    <button>Iniciar sesión</button>
                </Link>
            </form>
        </div>
     );
}
 
export default Login;