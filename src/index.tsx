import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './containers/Home';
import Editor from './containers/Editor';

class MyComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="edit" element={<Editor />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('root'));
