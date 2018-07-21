import React from 'react';
import NavigationBar from './NavigationBar';
import UsersNotes from "./UsersNotes";
import ModalWindow from './ModalWindow';
import Note from "./AddNote/index";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <NavigationBar />
                <UsersNotes commentsFromAllUser = 'true'/>
                <ModalWindow
                    value = 'Новая заметка'
                    component = {Note}/>
            </div>

        );
    }

}
export default App;