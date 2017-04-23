class Ninja extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ninjas: [],
      lat: null,
      lng: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitNow = this.handleSubmitNow.bind(this);
    this.handleLong = this.handleLong.bind(this);
    this.handleLat = this.handleLat.bind(this);
  }
  render() {
    let ninjas = this.state.ninjas;
    ninjas = ninjas.map((ninja, i) => {
      return (
        <li key={i}>
          <span className={ninja.obj.available} />
          <span className="name">
            {ninja.obj.name}
          </span>
          <span className="rank">
            {ninja.obj.rank}
          </span>
          <span className="dist">
            {Math.floor(ninja.dis / 10000)} km
          </span>
        </li>
      );
    });
    return (
      <div id="ninja-container">
        <form id="search">
          <label>Enter your Latitude:</label>
          <input
            type="text"
            value={this.state.lat}
            placeholder="latitude"
            onChange={this.handleLat}
            required
          />
          <label>Enter your Longitude:</label>
          <input
            type="text"
            value={this.state.lng}
            placeholder="longitude"
            onChange={this.handleLong}
            required
          />
          <input
            type="submit"
            value="Find Ninjas"
            onClick={this.handleSubmitNow}
          />
        </form>
        <ul>{ninjas}</ul>
      </div>
    );
  }

  handleLong(e) {
    this.setState({
      lng: e.target.value
    });
  }
  handleLat(e) {
    this.setState({
      lat: e.target.value
    });
  }
  handleSubmitNow(e) {
    e.preventDefault();
    console.log(this);
    let lng = this.state.lng;
    let lat = this.state.lat;

    console.log(lng);
    console.log(lat);

    console.log(lng);

    fetch(`/api/ninjas?lng=${lng}&lat=${lat}`)
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(json => {
        this.setState({
          ninjas: json
        });
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this);
    let lng = Reathis.refs.lng;
    let lat = this.refs.lat;

    console.log(lng);

    fetch(`/api/ninjas?lng=${lng}&lat=${lat}`)
      .then(data => {
        return data.json();
      })
      .then(json => {
        this.setState({
          ninjas: json
        });
      });
  }
}

ReactDOM.render(<Ninja />, document.getElementById("ninjas"));
