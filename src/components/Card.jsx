import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useFirebase } from '../context/Firebase';

const BookCard = (props) => {

    const firebase= useFirebase();
    const [url,setURL] = useState(null)

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then(url => setURL(url))
    }, [] )
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            This book has a title { props.name} and this book is sold by {props.displayName} and this book costs
            Rs.{props.price}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>               

    )

}

export default BookCard;