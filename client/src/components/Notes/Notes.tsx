import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchNotes, clearError, clearNotes } from '../../features/notes';
import type { Note } from '../../features/notes';
import AddNoteModal from './AddNoteModal';
import EditNoteModal from './EditNoteModal';
import DeleteNoteModal from './DeleteNoteModal';
import './Notes.styles.scss';

interface NotesProps {
  favouriteId: number;
  pokemonName: string;
  className?: string;
}

const Notes: React.FC<NotesProps> = ({ favouriteId, pokemonName, className }) => {
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector(state => state.notes);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Fetch notes when component mounts or favouriteId changes
  useEffect(() => {
    if (favouriteId) {
      dispatch(fetchNotes(favouriteId));
    }
    
    // Cleanup: clear notes when component unmounts or favouriteId changes
    return () => {
      dispatch(clearNotes());
    };
  }, [favouriteId]); // Only depend on favouriteId

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleDeleteNote = (note: Note) => {
    setSelectedNote(note);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedNote(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`notes-container ${className || ''}`}>
      <div className="notes-header">
        <h4>
          <i className="material-icons">note</i>
          Notes for {pokemonName}
        </h4>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-system btn-primary btn-small"
        >
          <i className="material-icons">add</i>
          <span>Add Note</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <i className="material-icons">error</i>
          <span>{error}</span>
          <button
            onClick={() => dispatch(clearError())}
            className="btn-system btn-light btn-small"
          >
            <i className="material-icons">close</i>
            <span>Dismiss</span>
          </button>
        </div>
      )}

      {/* Notes List */}
      <div className="notes-list">
        {loading ? (
          <div className="loading-notes">
            <i className="material-icons rotating">refresh</i>
            <span>Loading notes...</span>
          </div>
        ) : notes.length === 0 ? (
          <div className="no-notes">
            <i className="material-icons">note_add</i>
            <p>No notes yet. Add your first note to track your thoughts about {pokemonName}!</p>
          </div>
        ) : (
          notes
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by most recent first
            .map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-content">
                  <p className="note-text">{note.content}</p>
                  <div className="note-meta">
                    <span className="note-date">{formatDate(note.createdAt)}</span>
                    <div className="note-buttons">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="btn-system btn-info btn-small"
                      >
                        <i className="material-icons">edit</i>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note)}
                        className="btn-system btn-danger btn-small"
                      >
                        <i className="material-icons">delete</i>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Modals */}
      <AddNoteModal
        isOpen={showAddModal}
        onClose={closeModals}
        favouriteId={favouriteId}
        pokemonName={pokemonName}
      />

      <EditNoteModal
        isOpen={showEditModal}
        onClose={closeModals}
        note={selectedNote}
        pokemonName={pokemonName}
      />

      <DeleteNoteModal
        isOpen={showDeleteModal}
        onClose={closeModals}
        note={selectedNote}
        pokemonName={pokemonName}
      />
    </div>
  );
};

export default Notes;
