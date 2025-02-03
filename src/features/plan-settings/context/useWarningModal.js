import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useWarningModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const saveAnyways = () => {
    setLoadingOverlay(true);
    // Perform save logic, then close modal
    setLoadingOverlay(false);
    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        loadingOverlay,
        saveAnyways,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
