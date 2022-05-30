import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './containers/Home/Home';
import Editor from './containers/Editor/Editor';

class MyComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="edit" element={<Editor isEdit/>}></Route>
          <Route path="new-product" element={<Editor isEdit={false}/>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('root'));
