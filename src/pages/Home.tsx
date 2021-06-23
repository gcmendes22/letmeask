import { useHistory } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/global.scss';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
    history.push('/rooms/new');
  }

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
          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIconImg} alt="Google Logo" />
            Create your room with Google
          </button>
          <div className="separator">Or enter a room</div>
          <form>
            <input type="text" placeholder="Enter the room code"/>
            <Button type="submit">
              Enter the room
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}