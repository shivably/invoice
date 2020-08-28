import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
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
    axios.post('http://127.0.0.1:8000/create/', this.state)
    //let skill = this.state.skills.split(',');
    //let skill1 = this.state;
    //skill1['skills'] = skill;
    
    this.props.dataSet(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      skills: ''

    });
  }



  render() {
    return (
<form>
      <div class="form-row">
      <div class="col">
        First Name: <input class="form-control" onChange={(event) => this.setState({ firstName: event.target.value })}></input>
        </div>
        <div class="col">
        Last Name:<input class="form-control" onChange={(event) => this.setState({ lastName: event.target.value })}></input>
        </div>
        <div class="col">
        Skills:<input class="form-control" onChange={(event) => this.setState({ skills: event.target.value })}></input>
        </div>
        <button class="btn btn-primary" onClick={this.assignInput} >Add</button>
      </div>

      </form>
    );

  }
}
class Search extends Component {
  render() {
    return (
      <div class="form-row">
        <div class="col">
        <input placeholder="Search" class="form-control" onChange={(event) => this.props.searchInfo(event.target.value)}></input>
      </div>
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


  /*render(){
    return(<div>Hello!</div>)
  };*/

  render() {
    return (

      <div className="App">
        {console.log('rendered')}
        <Input dataSet={this.getList} />
        <Search searchInfo={this.SearchItem} />
        <div className='list1' >

          <table class="table table-striped"> 
            <thead>
              <tr>
                <th scope="col" onClick={this.sortfname}>Firstname</th>
                <th scope="col" onClick={this.sortlname}>Lastname</th>
                <th scope="col" onClick={this.sortSkills}>skills</th>
              </tr>
            </thead>
            <tbody>
    {/* {this.state.students */} 
              { this.state.students.filter(name => {

                return name.firstName.toLowerCase().includes(
                  this.state.Searchname.toLowerCase()) ||
                  name.lastName.toLowerCase().includes(this.state.Searchname.toLowerCase());
                }).map((x, index) => (
                  <tr scope="row" key={index}>


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



