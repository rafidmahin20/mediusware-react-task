import React, { useState, useEffect } from 'react';

const ModalA = ({ handleClose, handleOpenModalB }) => (
    <div className="modal">
        <div className="modal-content">
            <h2>Modal A</h2>
            <button onClick={handleOpenModalB}>Switch to Modal B</button>
            <button onClick={handleClose}>Close</button>
        </div>
    </div>
);

const ModalB = ({ handleClose, handleOpenModalA }) => (
    <div className="modal">
        <div className="modal-content">
            <h2>Modal B</h2>
            <button onClick={handleOpenModalA}>Switch to Modal A</button>
            <button onClick={handleClose}>Close</button>
        </div>
    </div>
);

const ModalC = ({ handleClose }) => (
    <div className="modal">
        <div className="modal-content">
            <h2>Modal C</h2>
            <button onClick={handleClose}>Close</button>
        </div>
    </div>
);

const Problem2 = () => {
    const [contacts, setContacts] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleOpenModal = (type) => {
        setModalType(type);
        setShowModal(true);

        window.history.pushState({}, '', `/modal/${type}`);

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCheckboxChange = () => {
        setOnlyEven(!onlyEven);
    };

    const handleSearchChange = (event) => {
        const text = event.target.value;
        setSearchText(text);
    };

    useEffect(() => {
        
        const apiUrl = `https://api.example.com/contacts?modalType=${modalType}&onlyEven=${onlyEven}&searchText=${searchText}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, [modalType, onlyEven, searchText]);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={() => handleOpenModal('AllContacts')}
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={() => handleOpenModal('USContacts')}
                    >
                        US Contacts
                    </button>
                </div>

                {showModal && modalType === 'AllContacts' && (
                    <ModalA
                        handleClose={handleCloseModal}
                        handleOpenModalB={() => handleOpenModal('USContacts')}
                    />
                )}

                {showModal && modalType === 'USContacts' && (
                    <ModalB
                        handleClose={handleCloseModal}
                        handleOpenModalA={() => handleOpenModal('AllContacts')}
                    />
                )}
                
            </div>
        </div>
    );
};

export default Problem2;
