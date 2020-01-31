import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
// import PropTypes from 'prop-types';


// class Name extends Component{
//   render(){

//     const Name =(props) =>{

//       return(
//         <div>
//           <h1>{props.str}</h1>
//         </div>
//       )
//     }

//   }

// }

// // Name.propTypes ={
// //   str:PropTypes.string
// // }




// class App extends Component{
//   render(){
//     return(
//       <div>
//         <Name str={'Abdul'}/>
//       </div>
//     );
//   }
// }


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      skills: ''

    }
    this.assignInput = this.assignInput.bind(this)
  }
  assignInput() {
    let skill = this.state.skills.split(',');
    let skill1 = this.state;
    skill1['skills'] = skill;
    this.props.dataSet(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      skills: ''

    });
  }



  render() {
    return (
      <div>
        fname: <input onChange={(event) => this.setState({ firstName: event.target.value })}></input>
        lname:<input onChange={(event) => this.setState({ lastName: event.target.value })}></input>
        skill:<input onChange={(event) => this.setState({ skills: event.target.value })}></input>
        <button onClick={this.assignInput} >Add</button>
        <input></input>)
      </div>
    );

  }
}
class Search extends Component {
  render() {
    return (
      <div>
        <input onChange={(event) => this.props.searchInfo(event.target.value)}></input>
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          'firstName': 'Pramod',
          'lastName': 'Ray',
          'skills': ['Python', 'HTML', 'CSS']
        },
        {
          'firstName': 'Sachin',
          'lastName': 'Suresh',
          'skills': ['Python', 'HTML', 'CSS', 'CAT']
        },
        {
          'firstName': 'Samarth',
          'lastName': 'Hegde',
          'skills': ['Python', 'Git', 'CSS']
        }
      ],
      Searchname: ''
    }
    this.getList = this.getList.bind(this)
    this.sortfname = this.sortfname.bind(this)
    this.sortlname = this.sortlname.bind(this)
    this.sortSkills = this.sortSkills.bind(this)
    this.SearchItem = this.SearchItem.bind(this)

  }
  getList(char) {
    this.setState({
      students: [...this.state.students, char]

    })
  }
  sortfname() {
    let sortedFirstName = this.state.students
    sortedFirstName.sort(function (a, b) {
      return a.firstName.localeCompare(b.firstName)
    })
    this.setState({
      students: sortedFirstName
    });

  }
  sortlname() {
    let sortedLastName = this.state.students
    sortedLastName.sort(function (a, b) {
      return a.lastName.localeCompare(b.lastName)
    })
    this.setState({
      students: sortedLastName
    });

  }
  sortSkills() {
    let sortedSkills = this.state.students
    sortedSkills.sort(function (a, b) {
      if (a.skills.length > b.skills.length) {
        return -1;
      }
      if (a.skills.length < b.skills.length) {
        return 1;
      }
      return 0;
    });
    this.setState({
      students: sortedSkills
    })
  }
  SearchItem(text) {
    this.setState({
      Searchname: text
    })
  }
  getData() {
    console.log('mounting now...');
    axios.get('http://127.0.0.1:8000/students/')
      .then(res => {
        console.log(res);
        this.setState({
          students: res.data
        });
      })
  }
  componentDidMount() {
    this.getData();
  }
  // ondelete(){
  //s   Axios.delete('http://127.0.0.1:8000/'+pk+'/')
  // }


  render() {
    return (

      <div className="App">
        {console.log('rendered')}
        <Input dataSet={this.getList} />
        <Search searchInfo={this.SearchItem} />
        <div className='list1' >

          <table>
            <thead>
              <tr>
                <th onClick={this.sortfname}>Firstname</th>
                <th onClick={this.sortlname}>Lastname</th>
                <th onClick={this.sortSkills}>skills</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.students } */}
              { this.state.students.filter(name => {

                return name.firstName.toLowerCase().includes(
                  this.state.Searchname.toLowerCase()) ||
                  name.lastName.toLowerCase().includes(this.state.Searchname.toLowerCase());
                }).map((x, index) => (
                  <tr key={index}>


                  <td>{x.firstName} </td>
                  <td>{x.lastName}</td>
                  <td>{x.skills.map((x, index) => (
                     <ul key={index}>
                     <ol>{x}</ol>
                   </ul>)
                  )}</td>
                  </tr>
                  )
                  )
              }
              </tbody>
          </table> 
        </div>


    
      </div>
    );
  }
}

export default App;



