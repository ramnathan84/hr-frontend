import React, { Component } from 'react';
import { withRouter ,Link} from 'react-router-dom';
import ReactTable from "react-table";

class EmployeeDetails extends React.Component{

    constructor(props) {
        super(props);
        console.log("props:: ",this.props.location.state.response);

    }

   

	render() {

       
		return (
          
        <div>
              <button style={{ padding: '10px' }}> <Link to="/Home">Back</Link></button>
             <div><h2>Employee Details Page</h2></div>
           
            <div> Employee ID : {this.props.location.state.response.id}</div>
            <div> Name : {this.props.location.state.response.name}</div>
            <div> Gender : {this.props.location.state.response.sex}</div>
            <div> Mobile Number : {this.props.location.state.response.mobile}</div>
            <div> Address : {this.props.location.state.response.address}</div>

            

        </div>
		)
	}
}
export default withRouter(EmployeeDetails)