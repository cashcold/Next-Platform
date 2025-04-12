import React, { Component } from 'react';
import axios from 'axios';

class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            error: null,
        };
    }

    componentDidMount() {
        const gameId = this.props.match.params.id; // If using React Router
        axios
            .get(`https://api.rawg.io/api/games/${gameId}?key=e1fbdfe6840f485282801980ab3f63de`)
            .then((response) => {
                this.setState({ game: response.data });
            })
            .catch((error) => {
                console.error('Error fetching game details:', error);
                this.setState({ error: 'Failed to fetch game details.' });
            });
    }

    render() {
        const { game, error } = this.state;

        if (error) {
            return <p>{error}</p>;
        }

        if (!game) {
            return <p>Loading...</p>;
        }

        return (
            <div className="game-details">
                <h1>{game.name}</h1>
                <img src={game.background_image} alt={game.name} />
                <p>{game.description_raw}</p>
                <p><strong>Released:</strong> {game.released}</p>
                <p><strong>Rating:</strong> {game.rating}</p>
                <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
                <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(', ')}</p>
                <p><strong>Developers:</strong> {game.developers.map(d => d.name).join(', ')}</p>
                <p><strong>Publishers:</strong> {game.publishers.map(p => p.name).join(', ')}</p>
                <a href={game.website} target="_blank" rel="noopener noreferrer">Official Website</a>
            </div>
        );
    }
}

export default GameDetails;