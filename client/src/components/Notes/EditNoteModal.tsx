import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateNote } from '../../features/notes';
import type { Note } from '../../features/notes';
import Modal from '../Modal';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  pokemonName: string;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ 
  isOpen, 
  onClose, 
  note,
  pokemonName 
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.notes);

  const noteValidationSchema = Yup.object({
    content: Yup.string()
      .required('Note content is required')
      .min(1, 'Note must have at least 1 character')
      .max(1000, 'Note cannot exceed 1000 characters')
      .trim()
  });

  const handleSubmit = async (values: { content: string }, { setSubmitting }: any) => {
    if (!note) return;
    
    try {
      await dispatch(updateNote({ noteId: note.id, content: values.content.trim() })).unwrap();
      onClose();
    } catch (error) {
      // Error is handled by the Redux slice
    } finally {
      setSubmitting(false);
    }
  };

  if (!note) return null;

  return (
    <Modal
      id="edit-note-modal"
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Note for ${pokemonName}`}
      size="medium"
    >
      <Formik
        initialValues={{ content: note.content }}
        validationSchema={noteValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, isSubmitting, isValid, dirty }) => (
          <Form>
            <div className="input-field">
              <Field
                as="textarea"
                name="content"
                placeholder="Write your note here..."
                maxLength={1000}
                rows={6}
                className="materialize-textarea note-textarea"
              />
              <ErrorMessage name="content" component="div" className="error-text" />
              <div className="char-count-container">
                <span className={`char-count ${values.content.length > 900 ? 'warning' : ''} ${values.content.length > 990 ? 'danger' : ''}`}>
                  {values.content.length}/1000
                </span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn-system btn-secondary"
                disabled={isSubmitting}
              >
                <i className="material-icons">cancel</i>
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="btn-system btn-success"
                disabled={!isValid || !dirty || isSubmitting || loading}
              >
                <i className="material-icons">
                  {isSubmitting ? 'hourglass_empty' : 'save'}
                </i>
                <span>{isSubmitting ? 'Updating...' : 'Update Note'}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditNoteModal;
