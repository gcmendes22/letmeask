import { FormEvent, useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/global.scss';
import '../styles/auth.scss';


export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();
    
    if(newRoom.trim() === '') return;
    
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Create new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Room name"
              onChange={(e) => setNewRoom(e.target.value)}
              value={newRoom}
            />
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