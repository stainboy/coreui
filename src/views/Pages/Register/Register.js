import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordRepeat: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 &&
      this.state.password === this.state.passwordRepeat;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      let user = {
        email: this.state.email,
        password: this.state.password
      }
      let res = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.status !== 200) {
        throw new Error("Register failed, " + res.status)
      }
      this.props.history.push('/')
    } catch (error) {
      alert('Register failed, ' + error.message)
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username"
                        onChange={this.handleChange} id="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email"
                        onChange={this.handleChange} id="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password"
                        onChange={this.handleChange} id="password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password"
                        onChange={this.handleChange} id="passwordRepeat" />
                    </InputGroup>
                    <Button color="success" block disabled={!this.validateForm()}>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="4">
                      <Button className="btn-facebook mb-1" block disabled><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="4">
                      <Button className="btn-twitter mb-1" block disabled><span>twitter</span></Button>
                    </Col>
                    <Col xs="12" sm="4">
                      <Button className="btn-wechat mb-1" block disabled><span>wechat</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
