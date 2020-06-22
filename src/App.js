import React, { Component } from "react";
import "./App.scss";
import Images from "./Components/Images";

export class App extends Component {
  constructor(props) {
    super(props);
    this.myCanvas = React.createRef();
    this.state = {
      canvasDimension: {
        width: 800,
        height: 470,
      },
    };
  }

  componentDidMount() {
    this.setWhiteCanvasBackground();
  }

  setWhiteCanvasBackground = () => {
    const { width, height } = this.state.canvasDimension;
    const canvas = this.myCanvas.current.getContext("2d");
    canvas.fillStyle = "white";
    canvas.fillRect(0, 0, width, height);
  };

  setImage = (imageUrl) => {
    const canvas = this.myCanvas.current.getContext("2d");
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.drawImage(
        image,
        0,
        0,
        this.state.canvasDimension.width,
        this.state.canvasDimension.height
      );
    };
  };

  handleDragOver = (e) => {
    e.preventDefault();
    // console.log(e);
  };

  handleDrop = (e) => {
    let selectedImage = e.dataTransfer.getData("current_image");
    this.setImage(selectedImage);
  };

  handleChangeOrientationClick = () => {
    this.setState({
      canvasDimension: {
        width: 470 / 2,
        height: 800 / 2,
      },
    });
  };
  render() {
    return (
      <div>
        <header>InVideo</header>

        <div className="main-wrapper">
          <aside>
            <Images setImage={this.setImage} />
          </aside>

          <main>
            <div className="options">
              <button onClick={this.handleChangeOrientationClick}>
                CHANGE ORIENTATION
              </button>
            </div>
            <canvas
              ref={this.myCanvas}
              onDrop={this.handleDrop}
              onDragOver={this.handleDragOver}
              width={this.state.canvasDimension.width}
              height={this.state.canvasDimension.height}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
