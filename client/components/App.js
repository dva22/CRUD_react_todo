import React from 'react';
import NavigationBar from './NavigationBar';
import UsersNotes from "./UsersNotes";


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <NavigationBar />
                <UsersNotes/>
            </div>

        );
    }

}
export default App;