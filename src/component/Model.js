import React, { Component } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import datafile from "../datafile/test.json";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import Header from "./Header";

export class Model extends Component {
  state = {
    open: false,
    startDate: null,
    endDate: null,
    startTimeArray: [],
    endTimeArray: [],
    show: false,
    error: false,
    errorMsg: "",
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  dialogClosedHandler = () => {
    this.setState({
      open: false,
    });
  };

  submitHander = (event) => {
    event.preventDefault();
    let startDateValue = Date.parse(this.state.startDate);
    let endDateValue = Date.parse(this.state.endDate);
    let arrayEnd = [];
    let arrayStart = [];
    datafile.members.map((del) =>
      del.activity_periods.map((info) => {
        let startTime = Date.parse(info.start_time);
        let endTime = Date.parse(info.end_time);
        if (this.props.id === del.id) {
          if (startTime >= startDateValue && endTime <= endDateValue) {
            arrayStart.push(
              moment(startTime).format("dddd, D MMMM YYYY, h:mm a")
            );
            arrayEnd.push(moment(endTime).format("dddd, D MMMM YYYY h:mm a"));
          } else {
            arrayEnd.length === 0
              ? new Date(startTime).getMonth() >=
                  new Date(endDateValue).getMonth() &&
                new Date(startTime).getMonth() >=
                  new Date(endDateValue).getMonth()
                ? this.setState({
                    error: true,
                    errorMsg: "No such Activity Details Found",
                  })
                : this.setState({
                    error: false,
                    errorMsg: "",
                  })
              : this.setState({
                  error: false,
                  errorMsg: "",
                });
          }
        }
      })
    );
    this.setState({
      startTimeArray: arrayStart,
      endTimeArray: arrayEnd,
      show: true,
    });
  };

  render() {
    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <div class="alert alert-danger" role="alert">
          {this.state.errorMsg}
        </div>
      );
    }
    return (
      <div>
        <button
          type="button"
          className="btn btn-light btn-lg btn-block"
          onClick={this.handleClickOpen}
        >
          {this.props.text}
        </button>
        <Dialog
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          disableBackdropClick={true}
          fullScreen={true}
        >
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.dialogClosedHandler}
          >
            <span
              style={{ position: "absolute", right: "10px", color: "red" }}
              aria-hidden="true"
            >
              &times;
            </span>
          </button>
          <div style={{ color: "black", textAlign: "center" }}>
            <Header />
          </div>
          <form onSubmit={this.submitHander.bind()} className="form-inline">
            <DialogContent>
              <div>
                <div style={{ textAlign: "center", marginBottom: "50px" }}>
                  <DateRangePicker
                    startDateId="your_unique_start_date_id"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({ startDate, endDate })
                    }
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) =>
                      this.setState({ focusedInput })
                    }
                  />{" "}
                  <button type="submit" class="btn btn-info">
                    Search
                  </button>
                </div>
                {errorMessage}
                <table
                  className="table table-striped"
                  style={{ marginBottom: "250px" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Start Timing</th>
                      <th scope="col">End Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.show
                      ? this.state.startTimeArray.map((el, i) => (
                          <tr key={i + 1}>
                            <td>{i + 1}</td>
                            <td>{el.toString()}</td>
                            <td>{this.state.endTimeArray[i].toString()}</td>
                          </tr>
                        ))
                      : datafile.members.map((del) => {
                          return del.activity_periods.map((info, i) =>
                            del.id === this.props.id ? (
                              <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{info.start_time}</td>
                                <td>{info.end_time}</td>
                              </tr>
                            ) : null
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default Model;
