import React from 'react';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import CommentList from './CommentList'
import CommentForm from './CommentForm'

class CommentBox extends React.Component {
    render() {
        const { data, addComment, deleteComment } = this.props;
        return (
            <div className="commentBox">
                <nav role="navigation" className="navbar navbar-default">
                    <div id="navbarCollapse" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <Link to="/comments">Comments</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/login">Sign In</Link></li>
                        </ul>
                    </div>
                </nav>
                <h1>Comments</h1>
                <CommentList
                    data={this.props.data}
                    onCommentDelete={this.props.deleteComment}
                />
                <CommentForm onCommentSubmit={this.props.addComment}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { data: state.comments }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)