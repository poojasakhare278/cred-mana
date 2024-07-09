import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCredential } from '../features/credentials/credentialsSlice';
import { v4 as uuidv4 } from 'uuid';
import '../styles/AddCredential.scss';

const AddCredential: React.FC = () => {
  const [loginUrl, setLoginUrl] = useState('');
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (passcode === confirmPasscode) {
      dispatch(
        addCredential({
          id: uuidv4(),
          loginUrl,
          username,
          passcode,
        })
      );
      setLoginUrl('');
      setUsername('');
      setPasscode('');
      setConfirmPasscode('');
    } else {
      alert('Passcodes do not match');
    }
  };

  return (
    <div className="add-credential">
      <h2>Add Credential</h2>
      <form>
        <div className="form-group">
          <label>Login URL</label>
          <input
            type="text"
            value={loginUrl}
            onChange={(e) => setLoginUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Passcode</label>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Passcode</label>
          <input
            type="password"
            value={confirmPasscode}
            onChange={(e) => setConfirmPasscode(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCredential;
