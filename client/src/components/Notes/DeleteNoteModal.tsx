import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteNote } from '../../features/notes';
import type { Note } from '../../features/notes';
import Modal from '../Modal';

interface DeleteNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  pokemonName: string;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ 
  isOpen, 
  onClose, 
  note,
  pokemonName 
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.notes);

  const handleDelete = async () => {
    if (!note) return;
    
    try {
      await dispatch(deleteNote(note.id)).unwrap();
      onClose();
    } catch (error) {
      // Error is handled by the Redux slice
    }
  };

  if (!note) return null;

  const formatDate = (dateString: string | Date) => {
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
    <Modal
      id="delete-note-modal"
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Note"
      size="small"
    >
      <div className="delete-note-content">
        <div className="warning-icon">
          <i className="material-icons large">warning</i>
        </div>
        
        <h5>Are you sure you want to delete this note?</h5>
        
        <div className="note-preview">
          <p><strong>Pokemon:</strong> {pokemonName}</p>
          <p><strong>Created:</strong> {formatDate(note.createdAt)}</p>
          <div className="note-content-preview">
            <p><strong>Content:</strong></p>
            <div className="note-text">
              {note.content.length > 100 
                ? `${note.content.substring(0, 100)}...` 
                : note.content
              }
            </div>
          </div>
        </div>
        
        <p className="warning-text">
          <i className="material-icons tiny">info</i>
          This action cannot be undone.
        </p>
        
        <div className="modal-actions">
          <button
            type="button"
            onClick={onClose}
            className="btn-system btn-secondary"
            disabled={loading}
          >
            <i className="material-icons">cancel</i>
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn-system btn-danger"
            disabled={loading}
          >
            <i className="material-icons">
              {loading ? 'hourglass_empty' : 'delete'}
            </i>
            <span>{loading ? 'Deleting...' : 'Delete Note'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
