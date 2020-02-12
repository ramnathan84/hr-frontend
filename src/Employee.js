import React, { Component } from 'react';
import { getEmployeeById } from './util/APIUtils';
import { notification } from 'antd';
import { withRouter } from 'react-router-dom';

class Employee extends React.Component{

    constructor(props) {
        super(props);
        console.log("props:: ",props.location);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    handleSubmit(){
        console.log("inside view Details",this.props.employee.id);

        getEmployeeById(this.props.employee.id)
        .then(response => {
            console.log("Success:: ",response);
            notification.success({
                message: 'Success',
                description: "View Details!",
            });    
            this.props.history.push("/EmployeeDetails",{ response: response });      
        }).catch(error => {
            console.log("error:: ",error);
            notification.error({
                message: 'Fail',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

	render() {
		return (
			<tr  >
				<td>{this.props.employee.name}</td>
                <td>{this.props.employee.sex}</td>	
                <td><button onClick={this.handleSubmit}>View All Details</button></td>	
			</tr>
		)
	}
}

export default withRouter(Employee)