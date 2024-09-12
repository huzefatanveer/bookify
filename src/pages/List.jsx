import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const ListingPage = () => {

    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNubmer] = useState('')
    const [price, setPrice] = useState('')
    const [coverPic, setCoverPic] = useState('')

    const handleSubmit= () => {

    }

    return (
        <div className='container mt-5'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control 
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text" 
                placeholder="Book name " />
 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control onChange={(e) => setIsbnNubmer(e.target.value)}
                value={isbnNumber}
                type="text" 
                placeholder="ISBN" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text" 
                placeholder="Enter Price" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control onChange={(e) => setCoverPic(e.target.files[0])}
                value={coverPic}
                type="file" 
                placeholder="" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>


        </div>
    )

}

export default ListingPage