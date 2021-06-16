import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      data: '',
      displayMap: false,
      displayError: false,
    }

  }

  getLocation = async (event) => {
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=pk.43fed3791d35ddb76aa14f749c6d3080&q=${this.state.searchQuery}&format=json`;

    try {
      let result = await axios.get(url)


      this.setState({
        data: result.data[0],
        displayMap: true,
      })
    }

    catch {
      this.setState({
        displayMap: false,
        displayError: true,
      })

    }

  }

  updateSearch = (event) => {

    this.setState({
      searchQuery: event.target.value
    })



  }


  render() {


    return (
      <div >

        <Form onSubmit={this.getLocation} >
          <Form.Group>
            <input type='text' onChange={this.updateSearch} placeholder='Explore a city' />
            <input type='submit' value='Explore' />
          </Form.Group>
        </Form>


        {this.state.displayMap &&

          <Card style={{ width: '40rem' }} >

            <Card.Body>

              <Card.Text>
                Name:{this.state.data.display_name} ,Latitude: {this.state.data.lat} ,Longitude:{this.state.data.lon}
              </Card.Text>

            </Card.Body>

            <Card.Img
              variant="top"
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.43fed3791d35ddb76aa14f749c6d3080&center=${this.state.data.lat},${this.state.data.lon}`}
              alt='map'

            />


          </Card>

        }

        {this.state.displayError &&

          <Card style={{ width: '35rem' }} >
            <Card.Body>

              <Card.Title>Error</Card.Title>

            </Card.Body>

            <Card.Body>

              <Card.Text>Error in getting data</Card.Text>

            </Card.Body>
          </Card>
        }

      </div>
    )
  }

}
export default App;