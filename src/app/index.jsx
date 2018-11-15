/**
 * (C) Copyright 2018 Hewlett Packard Enterprise Development LP” on your code
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 * of the Software, and to permit persons to whom the Software is furnished to do 
 * so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
// import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as reduxStore from 'redux/r_store.jsx';
import NetworkGraph from 'NetworkGraph.jsx';
import NavBarThingy from 'NavBarThingy.jsx';
import NodeList from 'components/NodeList.jsx';

// import BarChartOverview from 'BarChartOverview.jsx';

require('./styles/everything.scss');

const REDUX_STORE = reduxStore.configureStore();


class App extends React.Component {
  render() {
    return (
      <Provider store={REDUX_STORE}>
        <Container id='svgBody' fluid>
          <NodeList />
          <Row>
            <Col>
              <NavBarThingy></NavBarThingy>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <GraphAutoUpdate updateTimer={appConfig.graph.updateRate} /> */}
              <NetworkGraph name="The World" />
            </Col>
            {/* <BarChartOverview /> */}
          </Row>
        </Container>
      </Provider >
    );
  }//render
}//app


render(<App />, document.getElementById('app'));