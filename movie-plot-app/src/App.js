import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import MovieStoreData from "./components/MovieStoreData";
import MovieEdit from "./components/MovieEdit";
import FormControl from 'react-bootstrap/FormControl';


class App extends React.Component {

    constructor(props) {
        super(props);
        const filter = {
            title: null, origin: null
        }
        const data = []
        this.state = {
            filter, data
        }
    }

    componentDidMount() {
        console.log("componentDidMount")
        MovieStoreData.getData(this.state.filter).then(value => {
            let data = value;
            console.log("Success call");
            console.log(data)
            this.setState({data})
        }).catch(error => {
            console.error("Error getting data", error)
        })
    }

    handleSearchTitleChange(event) {
        let filter = this.state.filter;
        filter['title'] = event.target.value;
        this.setState(filter)

        //TODO: can do better
        this.componentDidMount()
    }

    handleEdit(event) {
        const editID = event.target.name;
        let openEdits = this.state.openEdits;
        if (!openEdits) {
            openEdits = []
        }
        if (!openEdits.includes(editID)) {
            openEdits.push(editID)
        }

        this.setState({
            openEdits
        })
    }

    onSaveHandler(editID) {
        console.log(editID)
        let openEdits = this.state.openEdits;
        if (!openEdits) {
            openEdits = []
        }
        openEdits = openEdits.filter(id => id !== editID)
        this.setState({
            openEdits
        })

        //TODO: Only update specific element of the table
        this.componentDidMount()
    }

    render() {
        console.log(this.state)
        let table = <Row></Row>

        let openEdits = this.state.openEdits
        if (!openEdits) {
            openEdits = []
        }

        const data = this.state.data
        table = data.map((value, index) => {
            let dataRow = <Row></Row>
            if (openEdits.includes(value.id)) {
                dataRow = <MovieEdit data={value} onSaveHandler={this.onSaveHandler.bind(this)}/>
            } else {
                let cast = value.cast;
                // if (value.cast && value.cast != "") {
                //     cast = value.cast.join(",")
                // }
                dataRow = <Row className={"table-row"} key={value.id}>
                    <Col md={1}>
                        {value.release_year}
                    </Col>
                    <Col md={1}>
                        {value.title}
                    </Col>
                    <Col md={1}>
                        {value.origin}
                    </Col>
                    <Col md={1}>
                        {value.director}
                    </Col>
                    <Col md={1}>
                        {cast}
                    </Col>
                    <Col md={1}>
                        {value.genre}
                    </Col>
                    <Col md={1}>
                        <a href={value.wiki} target={"_blank"}> wiki </a>
                    </Col>
                    <Col md={4} className={"plot-col"}>
                        {value.plot}
                    </Col>
                    <Col md={1}>
                        <Button name={value.id} onClick={this.handleEdit.bind(this)}>Edit</Button>
                    </Col>
                </Row>
            }

            return <div>
                {dataRow}
            </div>
        });

        let titleSearch = this.state.filter.title;

        return (<div className="App">
            <Container fluid={true}>
                <Navbar expand="lg">
                    <Navbar.Brand href="#home">Movies Plot Search</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <FormControl type="text" placeholder="Title" className="mr-sm-2" value={titleSearch} onChange={this.handleSearchTitleChange.bind(this)}/>

                </Navbar>
                <Row className={"table-head"}>
                    <Col md={1}>Release Year</Col>
                    <Col md={1}>Title</Col>
                    <Col md={1}>Origin</Col>
                    <Col md={1}>Director</Col>
                    <Col md={1}>Cast</Col>
                    <Col md={1}>Genre</Col>
                    <Col md={1}>Wiki</Col>
                    <Col md={3}>Plot</Col>
                    <Col md={1}>&nbsp;</Col>
                </Row>
                {table}
            </Container>
        </div>);
    }

}

export default App;
