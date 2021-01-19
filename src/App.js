import React, { Component } from "react";
import Upload from "./components/Upload";
import firebase from "firebase/app";
import { projectStorage } from "./firebase/config";
import "./App.css";

class App extends Component {
  state = {
    files: [],
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
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress: progress });
      });
      this.setState({ files: [] });
    });
  };

  render() {
    return (
      <div className="App">
        <div className="card">
          <h1 className="title">File Upload</h1>
          <hr width="90%" />
          <br />

          <div className="container">
            <div className="upload">
              <Upload handleUpload={this.handleDrop}>
                <h1 className="drag-text">Drag Files to Upload</h1>
              </Upload>
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

            <div className="files">
              <div className="files-header">
                <h2 className="files-title">Selected Files</h2>
                <button className="upload-btn" onClick={this.firebaseUpload}>
                  Upload
                </button>
              </div>
              {this.state.progress === 100 && (
                <h1 className="uploaded">Uploaded</h1>
              )}
              {this.state.files.map((item, index) => {
                return (
                  <div key={index} className="preview-container">
                    <div className="preview-image-container">
                      <img
                        className="image-preview"
                        src={
                          item.file.type === "image/jpeg" ||
                          item.file.type === "image/jpg" ||
                          item.file.type === "image/png" ||
                          item.file.type === "image/gif"
                            ? item.url
                            : item.file.type === "audio/mpeg" ||
                              item.file.type === "audio/wav" ||
                              item.file.type === "audio/aac"
                            ? "mp3.png"
                            : item.file.type === "video/mpeg" ||
                              item.file.type === "audio/wav"
                            ? "avi.png"
                            : item.file.type === "application/msword" ||
                              item.file.type === "application/vnd.ms-excel"
                            ? "doc.png"
                            : item.file.type === "application/pdf"
                            ? "pdf.png"
                            : item.file.type === "application/zip" ||
                              item.file.type === "application/x-zip-compressed"
                            ? "zip.png"
                            : "search.png"
                        }
                        alt={item.file.name}
                      />
                    </div>
                    <div className="preview-text">{item.file.name}</div>
                    <hr width="100%" />
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
