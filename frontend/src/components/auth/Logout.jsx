import Button from '../Button';
import { useAuth } from '../../utils/AuthContext';

export default function Logout() {
  const { logoutSetup } = useAuth();
  return <Button text="Logout" onClick={logoutSetup} />;
}
