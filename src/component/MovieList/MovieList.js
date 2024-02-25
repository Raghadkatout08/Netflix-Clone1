import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Movie from '../Movie/Movie';


function MovieList({movieArr})
{
    return(
        <>
            <Row xs={1} md={2} className="g-4">
                {movieArr.map((item) => (
                     <Col key={item.id}>
                        <Movie movie={item} />
                    </Col >
                ))}
            </Row>

        </>
    )
}

export default MovieList;