import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNote } from '../../features/notes';
import Modal from '../Modal';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  favouriteId: number;
  pokemonName: string;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ 
  isOpen, 
  onClose, 
  favouriteId, 
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

  const handleSubmit = async (values: { content: string }, { resetForm, setSubmitting }: any) => {
    try {
      await dispatch(addNote({ favouriteId, content: values.content.trim() })).unwrap();
      resetForm();
      onClose();
    } catch (error) {
      // Error is handled by the Redux slice
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      id="add-note-modal"
      isOpen={isOpen}
      onClose={onClose}
      title={`Add Note for ${pokemonName}`}
      size="medium"
    >
      <Formik
        key={isOpen ? 'open' : 'closed'} // Reset form when modal opens/closes
        initialValues={{ content: '' }}
        validationSchema={noteValidationSchema}
        onSubmit={handleSubmit}
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
                <span>{isSubmitting ? 'Saving...' : 'Save Note'}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddNoteModal;
