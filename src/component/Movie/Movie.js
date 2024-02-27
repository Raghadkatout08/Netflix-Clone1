import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ModalMovie from '../ModalMovie/ModalMovie.js';

function Movie(props) {
    const [showModal, setShowModal] = useState(false)

    const handleAddToFav = () => {
        setShowModal(true);
    };

    const HandleCloseModel = () => {
        console.log("Closing modal");
        setShowModal(false);
    };



    return (
        <>
            <Card style={{ width: '30rem' }}>
                <Card.Img variant="top" src={props.movie.poster_path} alt={props.movie.title} />

                <Card.Body>
                    <Card.Title>{props.movie.title}</Card.Title>
                    <Card.Text>
                    {props.movie.overview}
                    </Card.Text>
                    <Button variant="primary" onClick={handleAddToFav}>Add To Favorite</Button>
                </Card.Body>
            </Card>

            <ModalMovie show={showModal} HandleCloseModel={HandleCloseModel} movie={props.movie} />
        </>
    )
}

export default Movie;