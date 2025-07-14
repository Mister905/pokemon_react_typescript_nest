import { useEffect } from 'react';
import M from 'materialize-css';

export const useMaterializeInit = () => {
  useEffect(() => {
    // Initialize floating labels
    M.updateTextFields();
    
    // Initialize all input fields with proper label behavior
    const inputs = document.querySelectorAll('.input-field input[type=text], .input-field input[type=password], .input-field input[type=email]');
    
    const handleFocus = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const label = input.parentElement?.querySelector('label');
      if (label) {
        label.classList.add('active');
      }
    };
    
    const handleBlur = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const label = input.parentElement?.querySelector('label');
      if (label && input.value === '') {
        label.classList.remove('active');
      } else if (label && input.value !== '') {
        label.classList.add('active');
      }
    };
    
    const handleInput = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const label = input.parentElement?.querySelector('label');
      if (label) {
        if (input.value !== '') {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      }
    };
    
    inputs.forEach((input) => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      input.addEventListener('input', handleInput);
      
      // Check initial value
      const htmlInput = input as HTMLInputElement;
      const label = htmlInput.parentElement?.querySelector('label');
      if (label && htmlInput.value !== '') {
        label.classList.add('active');
      }
    });

    return () => {
      // Cleanup event listeners
      inputs.forEach((input) => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
        input.removeEventListener('input', handleInput);
      });
    };
  }, []);
};
