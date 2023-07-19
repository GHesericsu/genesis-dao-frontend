const AccountCircle = ({
  fill = '#FAFAFA',
  width = 16,
  height = 16,
  className,
}: {
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.62484 14.6875C5.49984 14.0764 6.36789 13.6076 7.229 13.2812C8.09012 12.9549 9.01373 12.7917 9.99984 12.7917C10.9859 12.7917 11.913 12.9549 12.7811 13.2812C13.6491 13.6076 14.5207 14.0764 15.3957 14.6875C16.0068 13.9375 16.4408 13.1806 16.6978 12.4167C16.9547 11.6528 17.0832 10.8472 17.0832 10C17.0832 7.98611 16.4061 6.30208 15.0519 4.94791C13.6978 3.59375 12.0137 2.91666 9.99984 2.91666C7.98595 2.91666 6.30192 3.59375 4.94775 4.94791C3.59359 6.30208 2.9165 7.98611 2.9165 10C2.9165 10.8472 3.04845 11.6528 3.31234 12.4167C3.57623 13.1806 4.01373 13.9375 4.62484 14.6875ZM9.99596 10.625C9.19299 10.625 8.5172 10.3494 7.96859 9.79821C7.41998 9.24701 7.14567 8.56993 7.14567 7.76696C7.14567 6.96398 7.42127 6.28819 7.97246 5.73958C8.52366 5.19097 9.20074 4.91666 10.0037 4.91666C10.8067 4.91666 11.4825 5.19226 12.0311 5.74346C12.5797 6.29465 12.854 6.97173 12.854 7.77471C12.854 8.57768 12.5784 9.25347 12.0272 9.80208C11.476 10.3507 10.7989 10.625 9.99596 10.625ZM10.0096 18.3333C8.8642 18.3333 7.78456 18.1146 6.77067 17.6771C5.75678 17.2396 4.87137 16.6424 4.11442 15.8854C3.35748 15.1285 2.76025 14.2447 2.32275 13.234C1.88525 12.2234 1.6665 11.1435 1.6665 9.99446C1.6665 8.84537 1.88525 7.76736 2.32275 6.76041C2.76025 5.75347 3.35748 4.87153 4.11442 4.11458C4.87137 3.35764 5.75516 2.76041 6.7658 2.32291C7.77643 1.88541 8.8563 1.66666 10.0054 1.66666C11.1545 1.66666 12.2325 1.88541 13.2394 2.32291C14.2464 2.76041 15.1283 3.35764 15.8853 4.11458C16.6422 4.87153 17.2394 5.75369 17.6769 6.76108C18.1144 7.76847 18.3332 8.84486 18.3332 9.99025C18.3332 11.1356 18.1144 12.2153 17.6769 13.2292C17.2394 14.2431 16.6422 15.1285 15.8853 15.8854C15.1283 16.6424 14.2461 17.2396 13.2388 17.6771C12.2314 18.1146 11.155 18.3333 10.0096 18.3333ZM9.99984 17.0833C10.7637 17.0833 11.5103 16.9722 12.2394 16.75C12.9686 16.5278 13.6873 16.1389 14.3957 15.5833C13.6873 15.0833 12.9651 14.7014 12.229 14.4375C11.4929 14.1736 10.7498 14.0417 9.99984 14.0417C9.24984 14.0417 8.50678 14.1736 7.77067 14.4375C7.03456 14.7014 6.31234 15.0833 5.604 15.5833C6.31234 16.1389 7.03109 16.5278 7.76025 16.75C8.48942 16.9722 9.23595 17.0833 9.99984 17.0833ZM9.99984 9.375C10.4721 9.375 10.8575 9.22569 11.1561 8.92708C11.4547 8.62847 11.604 8.24305 11.604 7.77083C11.604 7.29861 11.4547 6.91319 11.1561 6.61458C10.8575 6.31597 10.4721 6.16666 9.99984 6.16666C9.52762 6.16666 9.1422 6.31597 8.84359 6.61458C8.54498 6.91319 8.39567 7.29861 8.39567 7.77083C8.39567 8.24305 8.54498 8.62847 8.84359 8.92708C9.1422 9.22569 9.52762 9.375 9.99984 9.375Z'
        fill={fill}
      />
    </svg>
  );
};

export default AccountCircle;