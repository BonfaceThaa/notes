import React, {Component} from 'react';

import {Button, Container, Row, Col} from 'reactstrap';

import ListNotes from './components/ListNotes';

import { fetchNotes, fetchNote } from './api'

var notes_temp = [
    {
        'id': 1,
        'title': 'This is a react note data',
        'content': 'This is the content',
    },
    {
        'id': 2,
        'title': 'My second note',
        'content': 'And here is my second note',
    },
    {
        'id': 3,
        'title': 'Third and last',
        'content': 'The third and last note',
    },
];

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            notes: [],
            current_note_id:0,
            is_creating: true,
            is_fetching: true,
        }

        this.handlerItemCLick = this.handlerItemCLick.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        let data = await fetchNotes();
        this.setState({notes: data});
    }

    handlerItemCLick(id) {
        this.setState((prevState) => {
            return {is_creating: false, current_note_id: id}
        })
    }

    handleAddNote () {
        this.setState((prevState) => {
            return {is_creating: true}
        })

    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col xs="10">
                            <h2>Real-time notes</h2>
                        </Col>
                        <Col xs="2">
                            <Button color="primary" onClick={this.handleAddNote}> Create note</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                                <ListNotes notes={this.state.notes} handlerItemClick={(id) => this.handlerItemCLick(id)} />
                        </Col>
                        <Col xs="8">
                            <p>Edit notes here</p>
                            {
                                this.state.is_creating ?
                                    "Creating now.....":
                                    `Edit note with id: ${this.state.current_note_id}`
                            }
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
    );
        }
    }

export default App;
