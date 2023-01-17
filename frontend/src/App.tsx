import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import * as NotesApi from "./network/notes_api";
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import styles from "./styles/NotesPage.module.css";
import NotesPagesLoggedInViews from './components/NotesPagesLoggedInViews';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginUpModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);

      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser
            ? <NotesPagesLoggedInViews />
            : <NotesPageLoggedOutView />
          }
        </>
      </Container>
      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      }
      {
        showLoginUpModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }
    </div>
  );
}

export default App;
