import 'izitoast/dist/css/iziToast.min.css';
import iZtoast from 'izitoast';

const defaultConfig = {
  position: 'topRight',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOut',
  transitionOutMobile: 'fadeOutDown',
  closeOnEscape: true,
  class: 'toast',
};

const toast = {
  error: (message, title = 'Error') => {
    return iZtoast.error({
      title: title,
      message: message,
      ...defaultConfig,
    });
  },
  success: (message, title = 'Success') => {
    return iZtoast.success({
      title: title,
      message: message,
      ...defaultConfig,
    });
  },
};

export default toast;
