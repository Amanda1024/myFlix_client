import React from 'react'

function UpdateUser() {
    return (
        <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthday)}>
        <p className='update'>Update Profile</p>
          <Form.Group controlId='formName'>
            <Form.Label className='form-label'>Name</Form.Label>
            <Form.Control type='text' placeholder='Change Name' onChange={(e) => this.setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicUsername'>
            <Form.Label className='form-label'>Username</Form.Label>
            <Form.Control type='text' placeholder='Change Username' onChange={(e) => this.setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label className='form-label'>Password</Form.Label>
            <Form.Control type='password' placeholder='New Password' onChange={(e) => this.setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='form-label'>Email</Form.Label>
            <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicBirthday'>
            <Form.Label className='form-label'>Birthday</Form.Label>
            <Form.Control type='date' placeholder='Change Birthday' onChange={(e) => this.setBirthday(e.target.value)} />
          </Form.Group>

          <button className='button' variant='danger' type='submit'>
            Update
          </button>

          <button className='delete-button' variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
            Delete Account
          </button>
        </Form>
    )
}

export default UpdateUser