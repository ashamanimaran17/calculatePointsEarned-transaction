import React, { Component } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
  
class RewardsTableNoWrap extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        this.getData().then((data)=>{
            this.setState({data});
        }).catch((error) => {
            this.setState({data});
        });
    }
    getData = ()=>{
      const promise = new Promise((resolve, reject) => {
        fetch ('/src/data/customerTransaction.json',{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }).then((response) => {
            resolve(response.json());
          }).then((myJson) => {
            reject([]);
          })
        }
      )
      return promise;
      }
    render() {
      return(<div>
          {(this.state.data && this.state.data.length) ? 
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  {Object.keys(this.state.data[0]).map((key)=> {
                    return(<TableCell key={key}>{key}</TableCell>);
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                  {this.state.data.map((row, index)=> {
                    return(
                  <TableRow>{
                    Object.keys(row).map((key)=> {
                      return(<TableCell key = {index}>{row[key]}</TableCell>);
                    })}
                  </TableRow>
                    )
                  })}

              </TableBody>
            </Table>
          </TableContainer>
          : "" }
          </div>)
    }
}

export const  RewardsTable = RewardsTableNoWrap;