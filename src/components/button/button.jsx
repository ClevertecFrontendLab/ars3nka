import './button.scss';

export const BookingButton = ({ className, text }) => (
  <button type='button' className={className}>
    {text}
  </button>
);
