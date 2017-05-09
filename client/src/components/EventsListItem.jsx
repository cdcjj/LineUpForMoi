import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const GOOGLE_API = require('../config/google.js');

const GOOGLE_API_KEY = GOOGLE_API.apiSearch;

class EventsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleRemoveClick() {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/deleteEvent',
      data: {
        name: JSON.stringify(this.props.data.name),
        date: JSON.stringify(this.props.data.date.slice(0, 10)),
        contactEmail: JSON.stringify(this.props.data.contactEmail),
      },
      success: () => {
        this.props.handleRemove('filtered');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  render() {
    const removeQ = this.props.ownQ ? <RaisedButton label="Remove this Q" onTouchTap={this.handleRemoveClick} /> : null;
    if (this.props.data.image) {
      return (
        <MuiThemeProvider>
          <Card style={{ align: 'center' }} >
            <CardHeader
              style={{ 'padding-right': '0px' }}
              title={this.props.data.name}
              titleStyle={{ fontSize: '18px' }}
              subtitle={`$${this.props.data.amount}`}
              subtitleStyle={{ fontSize: '24px', color: 'green' }}
            />
            <div className="info">
              {/* direct API request for photo based on photo reference obtained in EventForm*/}
              <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${this.props.data.image}&key=${GOOGLE_API_KEY}`} width={'300'} height={'200'} alt="Estabishment" />
              <CardText className="cardtext" style={{ fontSize: '18px' }}>
                Address: {this.props.data.address}<br />
                Date: {this.props.data.date.slice(0, 10)}<br />
                Time: {this.props.data.time}<br />
                Duration: {`${this.props.data.duration} hours`}<br />
                Contact: {this.props.data.contactEmail}<br />
              </CardText>
            </div>
            {removeQ}
          </Card>
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title={this.props.data.name}
            titleStyle={{ fontSize: '18px' }}
            subtitle={`$${this.props.data.amount}`}
            subtitleStyle={{ fontSize: '20px', color: 'green' }}
          />
          <CardText style={{ fontSize: '18px' }}>
            Address: {this.props.data.address}<br />
            Date: {this.props.data.date.slice(0, 10)}<br />
            Time: {this.props.data.time}<br />
            Duration: {`${this.props.data.duration} hours`}<br />
            Contact: {this.props.data.contactEmail}<br />
          </CardText>
          {removeQ}
        </Card>
      </MuiThemeProvider>
    );
  }
}

EventsListItem.propTypes = {
  data: PropTypes.node.isRequired,
  handleRemove: PropTypes.func,
};

EventsListItem.defaultProps = {
  handleRemove: null,
};

export default EventsListItem;
