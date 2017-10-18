import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SingleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {}
    }
    this.arrowToggle = this.arrowToggle.bind(this);
  }

  arrowToggle() {
    var backArrow = document.getElementById('myArrow');
    if (backArrow.className === "material-icons") {
      backArrow.className += " rotate";
      this.props.history.push('#demo');
    } else {
      backArrow.className = "material-icons";
    }
  }

  componentDidMount() {
    let match = this.props.match;
    const id = match.params.id;
    const URL = `https://dry-forest-51238.herokuapp.com/api/game/${id}`;
    fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({game: data})
    })
  }

  render() {

    let game = this.state.game;
    let gameCategory = this.state.game.category;
    let gameIcon;

    switch (gameCategory) {
      case "card":
        gameIcon = 'style';
        break;
      case "board":
        gameIcon = 'dashboard';
        break;
      case "dice":
        gameIcon = 'casino';
        break;
      case "recreational sports":
        gameIcon = "golf_course";
        break;
      default:
        gameIcon = "widgets"
    }

    return (
      <div className="singleGame">
        <div className='card card-block'>
          <div className="title_block">
            <div>
              <h3 className='card-title alert'>{game.title}</h3>
              <p className='game_category alert'>{game.category}</p>
            </div>
            <div className="arrow_container">
              <Link to='/games'>
                <i className="material-icons md-36">arrow_back</i>
              </Link>
            </div>
          </div>

          <div className='alert icon_bar'>
          <div>
            <i className="material-icons group">{gameIcon}</i>
            <p>Category</p>
            <p>{game.category}</p>
          </div>
            <div>
              <i className="material-icons group">group</i>
              <p>Players</p>
              {/* Grab number of players from new api data once deployed */}
              <p className=''>2-5</p>
            </div>
            <div>
              <i className="material-icons face">face</i>
              <p>Ages</p>
              {/* Grab Players age Range from new api data once deployed */}
              <p className=''>13+</p>
            </div>
          </div>

          <div className='alert game_objective'>
            <h5>How to Win:</h5>
            <p>{game.objective}</p>
          </div>

          <div className='house_rules alert normal_rules'>
            <p><span>The normal rules:</span><br/>{game.original_rules}</p>
            <button className='btn' data-toggle="collapse" data-target="#demo" onClick={this.arrowToggle}><i className="material-icons" id="myArrow">expand_more</i></button>
          </div>

          <p id="demo" className="collapse alt_rules alert"><span>The house rules:</span><br/>{game.alternate_rules}</p>

        </div>
      </div>
    );
  }
};
