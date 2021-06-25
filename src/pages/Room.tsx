import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>React's Room</h1>
          <span>5 questions</span>
        </div>

        <form action="">
          <textarea placeholder="Make a question here" />
          <div className="form-footer">
            <span>To create a question, <button>log into your account</button>.</span>
            <Button type="submit">Send question</Button>
          </div>
        </form>
      </main>
    </div>
  );
}