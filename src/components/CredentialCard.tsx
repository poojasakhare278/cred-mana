import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCredential, updateCredential } from '../features/credentials/credentialsSlice';
import QRCode from 'qrcode.react';
import Modal from './Modal'; // Assuming Modal component is implemented
import '../styles/CredentialCard.scss';

interface CredentialCardProps {
  id: string;
  loginUrl: string;
  username: string;
  passcode: string;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ id, loginUrl: initialLoginUrl, username: initialUsername, passcode: initialPasscode }) => {
  const dispatch = useDispatch();

  const [loginUrl, setLoginUrl] = useState(initialLoginUrl);
  const [username, setUsername] = useState(initialUsername);
  const [passcode, setPasscode] = useState(initialPasscode);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch(deleteCredential(id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateCredential({ id, loginUrl, username, passcode }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset fields to initial values or exit editing mode
    setLoginUrl(initialLoginUrl);
    setUsername(initialUsername);
    setPasscode(initialPasscode);
    setIsEditing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="credential-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={loginUrl}
            onChange={(e) => setLoginUrl(e.target.value)}
          />
          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{username}</h3>
          <p>{loginUrl}</p>
          <p>{passcode}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => copyToClipboard(loginUrl)}>Copy URL</button>
          <button onClick={() => copyToClipboard(passcode)}>Copy Passcode</button>
          <button onClick={openModal}>QR Code</button> 
          {showModal && (
            <Modal onClose={closeModal}>
              <QRCode value={loginUrl} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default CredentialCard;
