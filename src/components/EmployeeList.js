import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import _ from 'lodash';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  componentDidMount() {
    this.props.employeesFetch();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.employees.length !== this.props.employees.length) {
      this.props.employeesFetch();
    }
  }

  render() {
    console.log('props', this.props);

    return (
      <FlatList
        data={this.props.employees}
        renderItem={({ item }) => <EmployeeListItem employee={item} />}
        keyExtractor={item => item.uid}
      />
    );
  }
}

const mapStateToProps = state => {
  // Transforming object from firebase (state.employees) to array
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return { employees };
};

export default connect(
  mapStateToProps,
  { employeesFetch }
)(EmployeeList);
