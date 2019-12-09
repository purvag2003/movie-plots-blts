import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MovieStoreData from "./MovieStoreData";

class MovieEdit extends React.Component {

    constructor(props) {
        super(props)
        const data = props.data
        this.state = {
            id: data.id,
            release_year: data.release_year,
            title: data.title,
            origin: data.origin,
            director: data.director,
            cast: data.cast,
            genre: data.genre,
            wiki: data.wiki,
            plot: data.plot,
        }
    }

    handleChange(event) {
        const key = event.target.name;
        if(key === "title") {
            this.setState({
                title: event.target.value
            });
        } else if(key === "release_year") {
            this.setState({
                release_year: event.target.value
            });
        }else if(key === "origin") {
            this.setState({
                origin: event.target.value
            });
        }else if(key === "director") {
            this.setState({
                director: event.target.value
            });
        }else if(key === "cast") {
            this.setState({
                cast: event.target.value
            });
        }else if(key === "genre") {
            this.setState({
                genre: event.target.value
            });
        }else if(key === "wiki") {
            this.setState({
                wiki: event.target.value
            });
        }else if(key === "plot") {
            this.setState({
                plot: event.target.value
            });
        }
    }


    handleSave(event) {
        const data = {
            release_year: this.state.release_year,
            title: this.state.title,
            origin: this.state.origin,
            director: this.state.director,
            cast: this.state.cast,
            genre: this.state.genre,
            wiki: this.state.wiki,
            plot: this.state.plot,
        }
        MovieStoreData.saveData(this.state.id, data).then(r => {
            console.log("Status " + r)
            if(r !== false) {
                this.props.onSaveHandler(this.state.id);

            } else {
                //TODO Way to indicate success or failure
            }
        });

    }

    render() {
        return <div><Row>
            <Col md={2}>
                <Form.Control  placeholder="Year" name={"release_year"}  value={this.state.release_year}  onChange={this.handleChange.bind(this)}/>
            </Col>
            <Col md={4}>
                <Form.Control placeholder="Title" name={"title"}  value={this.state.title}  onChange={this.handleChange.bind(this)}/>
            </Col>
            <Col md={2}>
                <Form.Control as="select" placeholder="Origin" name={"origin"}  value={this.state.origin}  onChange={this.handleChange.bind(this)}>
                    <option>American</option>
                </Form.Control>
            </Col>
            <Col md={4}>
                <Form.Control placeholder="Director" name={"director"}  value={this.state.director}  onChange={this.handleChange.bind(this)}/>
            </Col>
        </Row>
            <Row>
                <Col md={4}>
                    <Form.Control placeholder="Cast" name={"cast"}  value={this.state.cast}  onChange={this.handleChange.bind(this)}/>
                </Col>
                <Col md={3}>
                    <Form.Control as="select" placeholder="Genre" name={"genre"}  value={this.state.genre}  onChange={this.handleChange.bind(this)}>
                        <option>American</option>
                    </Form.Control>
                </Col>
                <Col md={5}>
                    <Form.Control placeholder="Wiki" name={"wiki"}  value={this.state.wiki}  onChange={this.handleChange.bind(this)}/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form.Control as={"textarea"} placeholder="Plot" name={"plot"}  value={this.state.plot}  onChange={this.handleChange.bind(this)}/>
                </Col>
            </Row>
            <Row>
                <Col md={2}><Button onClick={this.handleSave.bind(this)}> Save </Button></Col>
            </Row>
        </div>
    }
}

export default MovieEdit