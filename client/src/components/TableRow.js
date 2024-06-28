import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableRow extends Component {
  render() {
    return (
     <tr>
        <td>
            {this.props.obj.course}
        </td>
        <td>
            {this.props.obj.assignment_name}
        </td>
        <td>
            {this.props.obj.deadline}
        </td>
        <td>
            <Link to="/Createsubmission" className='btn btn-primary'>Do this</Link>
        </td>
     </tr>
    )
  }
}
export default TableRow;
