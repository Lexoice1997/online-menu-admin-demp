import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate('/signin');

  return (
    <section className="unauthorized">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <Button onClick={goBack} variant="contained" sx={{ mt: 3 }}>
          Вход
        </Button>
      </div>
    </section>
  );
}

export default Unauthorized;
