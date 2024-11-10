import alertify from 'alertifyjs';
import { Form, Label, Input, FormGroup, Button } from 'reactstrap';
import React, { Component } from 'react'

export default class FormDemo2 extends Component {
    state = {
        email : "",
        password : "",
        city: "",
        description : ""
    }
    inputChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }
    submitHandler = (event) => {
        event.preventDefault();
        alertify.success(this.state.email + " Kaydedildi.");
    }
  render() {
    return (
      <div>
         <Form onSubmit={this.submitHandler}>
            <FormGroup>
            <Label for="email">Email</Label>
            <Input name="email" type="email" id="email" placeholder="Email" onChange={this.inputChangeHandler}></Input>
            </FormGroup>

            <FormGroup>
            <Label for="password">Password</Label>
            <Input name="password" type="password" id="password" placeholder="Password" onChange={this.inputChangeHandler}></Input>
            </FormGroup>

            <FormGroup>
            <Label for="description">Description</Label>
            <Input name="description" type="textarea" id="description" placeholder="description" onChange={this.inputChangeHandler}></Input>
            </FormGroup>

            <FormGroup>
            <Label for="city">City</Label>
            <Input name="city" type="select" id="city" onChange={this.inputChangeHandler}>
                <option>Ankara</option>
                <option>İstanbul</option>
                <option>İzmir</option> 
                <option>Adana</option>
                <option>Eskişehir</option>
            </Input>
            </FormGroup>
            
            <Button type="submit">Save</Button>
         </Form>
      </div>
    )
  }
}
