import React from 'react';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ visible, onClose, title, children }) => {
  if (!visible) return null; // If not visible, return nothing

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#191919] text-black-2 dark:text-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Popup Title */}
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        {/* Popup Content */}
        <div className="mb-4">{children}</div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="bg-primary-gradient px-4 py-2 rounded-md text-sm text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
