import React from "react";

function ViewTable(props: { title: any; duration: any; category: any; starring: any; }) {
  const { title, duration, category, starring } = props;

  return (
    <div>
      <h1>Movie Details</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Category</th>
            <th>Starring</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{title}</td>
            <td>{duration}</td>
            <td>{category}</td>
            <td>{starring}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewTable;

