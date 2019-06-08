import React, { Component, Fragment } from 'react';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';

import './Feed.css';

class Feed extends Component {
	state = {
		isEditing: false,
		editLoading: false,
		posts: [],
		error: null
	};

	newPostHandler = () => {
		this.setState({ isEditing: true });
	};

	finishEditHandler = postData => {
		this.setState({ editLoading: true });
		const formData = new FormData();
		formData.append('image', postData.image);
		fetch('http://localhost:3002/post-image', {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			},
			body: formData
		})
			.then(res => res.json())
			.then(fileResData => {
				const imageUrl = fileResData.filePath || 'undefined';
				let graphqlQuery = {
					query: `
          mutation CreateNewPost($title: String!, $content: String!, $imageUrl: String!) {
            createPost(postInput: {title: $title, content: $content, imageUrl: $imageUrl}) {
              _id
              title
              content
              imageUrl
              creator {
                name
              }
              createdAt
            }
          }
          `,
					variables: {
						title: postData.title,
						content: postData.content,
						imageUrl: imageUrl
					}
				};
				return fetch('http://localhost:3002/graphql', {
					method: 'POST',
					body: JSON.stringify(graphqlQuery),
					headers: {
						Authorization: 'Bearer ' + this.props.token,
						'Content-Type': 'application/json'
					}
				})
					.then(res => res.json())
					.then(resData => {
						if (resData.errors && resData.errors[0].status === 422) {
							throw new Error(
								"Validation failed. Make sure the email address isn't used yet!"
							);
						}
						if (resData.errors) {
							throw new Error('User login failed!');
						}
						const post = {
							_id: resData.data.createPost._id,
							title: resData.data.createPost.title,
							content: resData.data.createPost.content,
							creator: resData.data.createPost.creator,
							createdAt: resData.data.createPost.createdAt,
							imagePath: resData.data.createPost.imageUrl
						};
						this.setState(prevState => {
							let updatedPosts = [...prevState.posts];
							updatedPosts.push(post);
							return {
								posts: updatedPosts,
								isEditing: false,
								editLoading: false
							};
						});
					})
					.catch(err => {
						console.log(err);
						this.setState({
							isEditing: false,
							editLoading: false,
							error: err
						});
					});
			});
	};

	cancelEditHandler = () => {
		this.setState({ isEditing: false, editPost: null });
	};

	errorHandler = () => {
		this.setState({ error: null });
	};

	render() {
		return (
			<Fragment>
				<ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
				<FeedEdit
					editing={this.state.isEditing}
					loading={this.state.editLoading}
					onCancelEdit={this.cancelEditHandler}
					onFinishEdit={this.finishEditHandler}
				/>
				<section className="feed__control">
					<Button mode="raised" design="accent" onClick={this.newPostHandler}>
						New Post
					</Button>
				</section>
			</Fragment>
		);
	}
}

export default Feed;