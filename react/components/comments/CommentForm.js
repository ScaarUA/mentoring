import React from 'react';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };
    }

    render() {
        return (
            <form className="commentForm" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Your name"
                        className="form-control"
                        value={this.state.author}
                        onChange={(e) => this.handleAuthorChange(e)}
                    />
                    <input
                        type="text"
                        placeholder="Say something..."
                        className="form-control"
                        value={this.state.text}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                </div>
                <button type="submit"
                        className="btn btn-primary">Post
                </button>
            </form>
        );
    }

    handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }
}
