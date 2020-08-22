import React from "react";
import datafile from "../datafile/test.json";
import Model from "./Model";
function MemberDetails() {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User id</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datafile.members.map((info, i) => (
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>{info.id}</td>
              <td>{info.real_name}</td>
              <td>{info.tz}</td>
              <td>
                <Model text="View detail" id={info.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberDetails;
