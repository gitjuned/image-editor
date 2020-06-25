import React, { Component } from "react";
import "./App.scss";
import Images from "./Components/Images";
import BrandLogo from "./assets/images/inv-logo.png";

export class App extends Component {
  constructor(props) {
    super(props);
    this.myCanvas = React.createRef();

    this.state = {
      canvasDimension: {
        width: 800,
        height: 470,
      },
      isCanvasLandscape: true,
      currentImage: "",
    };
  }

  componentDidMount() {
    const canvas = this.myCanvas.current.getContext("2d");
    this.setState({
      canvas,
    });
  }

  setImage = (
    imageUrl,
    isPortrait = this.state.isCanvasLandscape ? false : true
  ) => {
    const {
      canvas,
      canvasDimension: { width, height },
    } = this.state;

    const image = new Image();
    image.src = imageUrl;

    if (isPortrait) {
      image.onload = () => {
        canvas.drawImage(image, 0, 0, width, height);
        canvas.drawImage(image, 0, 125, 235, 150);
      };
    } else {
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        canvas.drawImage(image, 0, 0, width, height);
      };
    }

    this.setState({
      currentImage: imageUrl,
    });
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleDrop = (e) => {
    let selectedImage = e.dataTransfer.getData("current_image");
    this.setImage(selectedImage);
  };

  handleChangeOrientationClick = (isLandscape) => {
    this.setImage(this.state.currentImage, isLandscape);

    this.setState({
      isCanvasLandscape: !this.state.isCanvasLandscape,
    });
  };

  render() {
    const { isCanvasLandscape } = this.state;
    return (
      <div>
        <header>
          <img src={BrandLogo} alt="invideo logo" className="brand-logo" />

          <div className="options">
            <button
              onClick={() =>
                this.handleChangeOrientationClick(isCanvasLandscape)
              }
            >
              CHANGE ORIENTATION
            </button>
          </div>
        </header>

        <div className="main-wrapper">
          <aside>
            <Images setImage={this.setImage} />
          </aside>

          <main>
            <canvas
              ref={this.myCanvas}
              onDrop={this.handleDrop}
              onDragOver={this.handleDragOver}
              width={isCanvasLandscape ? this.state.canvasDimension.width : 235}
              height={
                isCanvasLandscape ? this.state.canvasDimension.height : 400
              }
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
