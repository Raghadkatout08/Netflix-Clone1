import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function ModalMovie(props) {
    const [comment, setComment] = useState('');

    const handleComment = (event) => {
        setComment(event.target.value);
    };

    const handleAddToFav = () => {
        const { id, title, release_date, poster_path, overview, comment } = props.movie;

        console.log('Sending data:', { id, title, release_date, poster_path, overview, comment });

        fetch('http://localhost:3013/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                title,
                release_date,
                poster_path,
                overview,
                comment
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                props.HandleCloseModel();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <Modal show={props.show} onHide={props.HandleCloseModel}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.movie.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.movie.poster_path} alt={props.movie.title} style={{ maxWidth: '100%' }} />
                    <p>{props.movie.overview}</p>
                    <label htmlFor="comment">Add a Comment:</label> 
                    <input type="text" id="comment" placeholder="Enter your comment" value={comment} onChange={handleComment} />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {props.HandleCloseModel()}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddToFav}>
                        Add to Favorite
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalMovie;