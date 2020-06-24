import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      limit: 15,
      start: 1,
    };
  }

  componentDidMount() {
    const { limit, start } = this.state;
    axios
      .get(`https://picsum.photos/v2/list?page=${start}&limit=${limit}`)
      .then((res) => this.setState({ images: res.data }));
  }

  fetchImages = () => {
    const { limit, start } = this.state;

    axios
      .get(`https://picsum.photos/v2/list?page=${start + 1}&limit=${limit}`)
      .then((res) =>
        this.setState({
          images: this.state.images.concat(res.data),
          start: this.state.start + 1,
        })
      );
  };

  handleDragStart = (e, url) => {
    e.dataTransfer.setData("current_image", url);
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.images.length}
        next={this.fetchImages}
        hasMore={true}
        height="100%"
        loader={<h4>Images are loading...</h4>}
      >
        <div className="images">
          {this.state.images.map((image, index) => (
            <img
              onClick={() => this.props.setImage(image.download_url)}
              onDragStart={(event) => {
                this.handleDragStart(event, image.download_url);
              }}
              draggable
              key={index}
              src={image.download_url}
              alt={image.author}
            />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}

export default Images;
