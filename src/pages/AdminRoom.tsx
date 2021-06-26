import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  const {title, questions } = useRoom(roomId);

  async function handleCloseRoom() {
    await database.ref(`rooms/${roomId}`).update({ closedAt: new Date() });
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Do you really want to remove this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleCloseRoom}>Close Room</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Room: {title}</h1>
          {questions.length > 0 ? (
            <span>{questions.length} question(s)</span>
          ) : null}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={e => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Mark as answered" />
                    </button>
                    <button
                      type="button"
                      onClick={e => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Highlight question" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={e => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImage} alt="Remove question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}