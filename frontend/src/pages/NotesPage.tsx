import { Container } from "react-bootstrap";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import NotesPagesLoggedInView from "../components/NotesPagesLoggedInView";
import { User } from "../models/user";
import styles from "../styles/Note.module.css";

interface NotePageProps {
    loggedInUser: User | null,
}

const NotesPage = ({ loggedInUser }: NotePageProps) => {
    return (
        <Container className={styles.notesPage}>
            <>
                {loggedInUser
                    ? <NotesPagesLoggedInView />
                    : <NotesPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default NotesPage;