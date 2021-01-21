import React, { Component } from "react";
import DragAndDrop from "./components/DragAndDrop";
import firebase from "firebase/app";
import { projectStorage } from "./firebase/config";
import "./App.css";
import { FileTypes } from "./enums/FileTypes";

class App extends Component {
  state = {
    files: [],
    uploaded: [],
    failed: [],
    progress: 0,
  };

  handleDrop = (selectedFiles) => {
    const files = Object.values(selectedFiles).map((file) => {
      return {
        file,
        url: URL.createObjectURL(file),
      };
    });
    this.setState({
      files: [...this.state.files, ...files],
    });
    this.setState({ progress: 0 });
  };

  firebaseUpload = (e) => {
    e.preventDefault();
    this.state.files.forEach((item) => {
      var metadata = {
        contentType: item.file.type,
      };
      var uploadTask = projectStorage
        .ref()
        .child(item.file.type + item.file.name)
        .put(item.file, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          //  Here is the function to see the progress, or if the upload is paused or cancelled
        },
        () => {
          this.setState({ failed: [...this.state.failed, item] });
        },
        () => {
          this.setState({ uploaded: [...this.state.uploaded, item] });
          this.setState({ files: [] });
        }
      );
    });
  };

  delete = (item) => {
    this.setState({
      files: [...this.state.files.filter((file) => file.file.name !== item)],
    });
  };

  render() {
    return (
      <div className="App">
        <div className="drop-card">
          <h1 className="title">File Upload</h1>
          <hr width="90%" />
          <br />
          <div className="container">
            <div className="upload">
              <DragAndDrop handleUpload={this.handleDrop}>
                <h1 className="drag-text">Drag Files to Upload</h1>
              </DragAndDrop>
              <div className="choose-file-btn">
                <input
                  type="file"
                  id="actual-btn"
                  multiple
                  onChange={(e) => this.handleDrop(e.target.files)}
                  hidden
                />
                <label htmlFor="actual-btn" id="choose-file-btn-label">
                  Choose File
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`selected-card ${
            this.state.files.length === 0 ? "none" : ""
          }`}
        >
          <div className="files">
            <div className="files-header">
              <h1 className="files-title">Selected Files</h1>
              <button className="upload-btn" onClick={this.firebaseUpload}>
                Upload
              </button>
            </div>
            <div className="preview-container">
              {this.state.files.map((item, index) => {
                return (
                  <div key={index} className="preview-item-container">
                    <div className="preview-image-container">
                      <img
                        className="image-preview"
                        src={
                          FileTypes.image.includes(item.file.type)
                            ? item.url
                            : FileTypes.audio.includes(item.file.type)
                            ? "audio.png"
                            : FileTypes.video.includes(item.file.type)
                            ? "video.png"
                            : FileTypes.msDoc.includes(item.file.type)
                            ? "doc.png"
                            : FileTypes.pdf.includes(item.file.type)
                            ? "pdf.png"
                            : FileTypes.archive.includes(item.file.type)
                            ? "zip.png"
                            : "search.png"
                        }
                        alt={item.file.name}
                      />
                      <button
                        onClick={(e) => this.delete(item.file.name)}
                        className="delete-btn"
                      >
                        <i className="fa fa-close"></i>
                      </button>
                    </div>
                    <div className="preview-text">
                      <p>{item.file.name}</p>
                    </div>
                    <hr width="70%" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={`selected-card ${
            this.state.uploaded.length === 0 ? "none" : ""
          }`}
        >
          <div className="files">
            <div className="completed-files-header">
              <h1 className="files-title">Uploaded Files</h1>
            </div>
            <div className="preview-container">
              {this.state.uploaded.map((item, index) => {
                return (
                  <div key={index} className="preview-item-container">
                    <div className="preview-image-container">
                      <img
                        className="image-preview"
                        src={
                          FileTypes.image.includes(item.file.type)
                            ? item.url
                            : FileTypes.audio.includes(item.file.type)
                            ? "audio.png"
                            : FileTypes.video.includes(item.file.type)
                            ? "video.png"
                            : FileTypes.msDoc.includes(item.file.type)
                            ? "doc.png"
                            : FileTypes.pdf.includes(item.file.type)
                            ? "pdf.png"
                            : FileTypes.archive.includes(item.file.type)
                            ? "zip.png"
                            : "search.png"
                        }
                        alt={item.file.name}
                      />
                    </div>
                    <div className="preview-text">
                      <p>{item.file.name}</p>
                    </div>
                    <hr width="70%" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
