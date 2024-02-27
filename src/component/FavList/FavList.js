import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from "react-bootstrap/Modal";

function FavList() {

    const [favArr, setFavArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [updateComment, setUpdateComment] = useState('')
    const [editComment, setEditComment] = useState(false);

    const sendReq = async () => {
        const serverURL = 'https://movies-library-server-bpo3.onrender.com/getMovies';
        const res = await fetch(serverURL);
        const data = await res.json();
        setFavArr(data);
        console.log(data)
        console.log(setFavArr)
    }

    useEffect(() => {
        sendReq();
    }, [])

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setUpdateComment('');


    }

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setUpdateComment(item.updateComment);
        setEditComment(true);
        console.log(editComment);
        setShowModal(true);
    }

    const handleUpdate = async () => {
        if (!selectedItem) return
        const updatedItem = { ...selectedItem, comment: updateComment };
        const serverURLUpdate = `https://movies-library-server-bpo3.onrender.com/UPDATE/${selectedItem.id}`;
        const res2 = await fetch(serverURLUpdate, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
        if (res2.ok) {
            sendReq();
        }

        handleCloseModal();
    }


    const handleDeleteClick = async (itemId) => {
        const serverURLDelete = `https://movies-library-server-bpo3.onrender.com/DELETE/${itemId}`
        const res1 = await fetch(serverURLDelete, {
            method: 'DELETE',
        })
            .then((res1) => {
                if (res1.ok) {
                    const updateFavArr = favArr.filter(item => item.id !== itemId);
                    setFavArr(updateFavArr)
                }
            })
            .catch((error) => {
                console.error('Error while deleting item:', error);
            })
            .finally(() => {
                handleCloseModal();
            })
    }

    return (
        <>

            <Row xs={1} md={2} className="g-4">
                {favArr.map((item) => (
                    <Col key={item.id}>
                        <Card style={{ width: '30rem' }}>
                            <Card.Img variant="top" src={item.poster_path} alt={item.title} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Button variant="outline-primary" onClick={() => handleUpdateClick(item)}>See More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    {selectedItem && <Modal.Title>{selectedItem.title}</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <>
                            <img src={selectedItem.poster_path} alt={selectedItem.title} style={{ maxWidth: '100%' }} />
                            <p>{selectedItem.overview}</p>
                            {editComment ? (
                                <textarea value={updateComment} onChange={(edit) => setUpdateComment(edit.target.value)} placeholder="Your New Comment"/> 
                                ) : null }
                        </>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => { handleCloseModal() }}>
                        Close
                    </Button>

                    <Button variant="outline-primary" onClick={() => { handleUpdate() }}>
                        Update
                    </Button>

                    <Button variant="outline-danger" onClick={() => { handleDeleteClick(selectedItem.id) }}>
                        Delete
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    )
}

export default FavList;