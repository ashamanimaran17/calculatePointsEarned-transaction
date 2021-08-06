import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import _, { reduce } from "underscore";
import moment from 'moment';
class RewardsTableNoWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  //dataFormat=[[{"name": "", "total": 0, "months": [{"month": "" , "monthTotal": 0, "rewardPoints": 0}]}]];

  componentDidMount() {
    this.getData().then((data) => {
      const dataWithRewardPoints = this.getDataWithRewardPoints(data);
      this.setState({ data: dataWithRewardPoints });
    }).catch((data) => {
      this.setState({ data });
    });
  }
  getDataWithRewardPoints = (data) => {
    const temp = data;
    temp.forEach((transaction, index) => {
      const rewardsForOverHundred = (transaction.transactionAmount > 100) ? (transaction.transactionAmount - 100) * 2 : 0;
      const rewardsForOverFiftyLessThanHundred = (transaction.transactionAmount > 50 && transaction.transactionAmount < 100) ? (transaction.transactionAmount - 50) :
        ((transaction.transactionAmount > 100) ? 50 : 0);
      temp[index]["rewardPoints"] = rewardsForOverHundred + rewardsForOverFiftyLessThanHundred;
      temp[index]["monthAndYear"] = moment(transaction.dateOfPurchase).format("MMM-YY");
    })
    const dataWithRewardsPoints = [...temp];
    const records = [];
    const transactionsGroupedByName = _.groupBy(dataWithRewardsPoints, (rowWithRewardsPoints) => {
      return (rowWithRewardsPoints.name);
    });
    Object.keys(transactionsGroupedByName).forEach((name) => {
      const consumerTotal={ consumerName: "", monthAndYear:"Total for year", totalRewardsForMonth: 0 };
      let transactions = transactionsGroupedByName[name];
      const transactionsGroupedByMonth = _.groupBy(transactions, (transaction) => {
        return (transaction.monthAndYear);
      })
      Object.keys(transactionsGroupedByMonth).forEach((monthAndYear) => {
        let transactions = transactionsGroupedByMonth[monthAndYear];
        const newRecord = { consumerName: name, monthAndYear, totalRewardsForMonth: 0 };
        for (let i = 0; i < transactions.length; i++) {
          newRecord.totalRewardsForMonth += transactions[i].rewardPoints;
        }
        consumerTotal.totalRewardsForMonth +=newRecord.totalRewardsForMonth
        records.push(newRecord);
      })
      records.push(consumerTotal);
    })
    console.log(records);
    return records;
  }
  getData = () => {
    const promise = new Promise((resolve, reject) => {
      fetch('/src/data/customerTransaction.json', {
        headers: {
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
    return (<div style={{padding:"20px"}}>
      {(this.state.data && this.state.data.length) ?
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {Object.keys(this.state.data[0]).map((key) => {
                  return (<TableCell key={key}>{key}</TableCell>);
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row, index) => {
                return (
                  <TableRow>{
                    Object.keys(row).map((key) => {
                      return (<TableCell key={index}>{row[key]}</TableCell>);
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        : ""}
    </div>)
  }
}

export const RewardsTable = RewardsTableNoWrap;

/*
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
*/