import { Link } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/global.scss';
import '../styles/auth.scss';


export function NewRoom() {
  // const { user } = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="Background" />
        <strong>create live Q&amp;A rooms</strong>
        <p>Clarify the doubts of your audience in real time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="Letmeask" />
          <h2>Create new room</h2>
          <form>
            <input type="text" placeholder="Room name"/>
            <Button type="submit">
              Enter the room
            </Button>
          </form>
          <p>Want to join an existing room? <Link to="/">Click here!</Link></p>
        </div>
      </main>
    </div>
  );
}