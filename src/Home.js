import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getEmployees} from './util/APIUtils';
import Employee from './Employee';
import { ExportReactCSV } from './ExportReactCSV'
import {
   Link
  } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fileName: 'Employee'
        }
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    loadEmployees() {
        let promise;
        
        promise = getEmployees();

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise            
        .then(response => {
            this.setState({
                data: response
            });       
          console.log("Response:: ",this.state);
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    componentDidMount() {
      
        this.loadEmployees();

    }
    handleRefresh(){

        this.loadEmployees();
    }

    render() {
        
		const employees = this.state.data.map((emp, index) =>
            <Employee key={index} employee={emp}></Employee>
		);
		return (

            <div>
            <div><h2>Employee HR System</h2></div>
            
            <button style={{ padding: '10px' }}> <Link to="/Signup">Create New Employee</Link></button>
            <button style={{ padding: '10px' }}> <ExportReactCSV csvData={this.state.data} fileName={this.state.fileName} /> </button>
			<button style={{ padding: '10px' }} onClick={this.handleRefresh}> Refresh </button>
			
            <table>
				<tbody>
					<tr style={{ textAlign: 'left' }}>
						<th>Name</th>
						<th>Gender</th>
					
					</tr>
					{employees}
				</tbody>
             
			</table>
           
            
            </div>

        )
        
      
	}
}

export default Home;