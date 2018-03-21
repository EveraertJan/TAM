import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentApp extends Component {
	render(){
		return (
			<div className="commentHolder">
				<div className="container commentWrap">
					<div className="createComment">
						<input type="text" name="commentAdd" placeholder="Add a comment" />
						<input type="submit" />
					</div>
				</div>
				<div className="container commentHolder">
					<div className="commentItem">
						<div className="commentBy">
							<div className="user-image-small">
								<img src="img/testImages/img2.jpg" />
							</div>
							<div className="userName">
								Jan Everaert
							</div>
						</div>
						<div className="commentContent">
							<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula, dolor a scelerisque iaculis, turpis est mollis lectus, nec eleifend tortor arcu nec ligula. Praesent tempor non sem sit amet elementum. Duis sed elit molestie, dictum mauris et, interdum ipsum. Maecenas finibus vulputate nisl, mattis maximus leo mattis a. Sed libero tellus, viverra id sapien ac, constius sodales magna. Aenean sagittis leo malesuada mauris auctor posuere. Sed lorem est, tempus id imperdiet vitae, faucibus non metus. Aenean mi orci, porta convallis velit eu, bibendum congue nisl. In pharetra porta sem, non pretium neque viverra at. Sed porttitor condimentum risus, eget fermentum enim tincidunt eu. Mauris aliquet mauris quis risus molestie, nec sollicitudin orci viverra.


							</p>
						</div>
					</div>
					<div className="commentItem">
						<div className="commentBy">
							<div className="user-image-small">
								<img src="img/testImages/img2.jpg" />
							</div>
							<div className="userName">
								Jan Everaert
							</div>
						</div>
						<div className="commentContent">
							<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula, dolor a scelerisque iaculis, turpis est mollis lectus, nec eleifend tortor arcu nec ligula. Praesent tempor non sem sit amet elementum. Duis sed elit molestie, dictum mauris et, interdum ipsum. Maecenas finibus vulputate nisl, mattis maximus leo mattis a. Sed libero tellus, viverra id sapien ac, constius sodales magna. Aenean sagittis leo malesuada mauris auctor posuere. Sed lorem est, tempus id imperdiet vitae, faucibus non metus. Aenean mi orci, porta convallis velit eu, bibendum congue nisl. In pharetra porta sem, non pretium neque viverra at. Sed porttitor condimentum risus, eget fermentum enim tincidunt eu. Mauris aliquet mauris quis risus molestie, nec sollicitudin orci viverra.


							</p>
						</div>
					</div>
					<div className="commentItem">
						<div className="commentBy">
							<div className="user-image-small">
								<img src="img/testImages/img2.jpg" />
							</div>
							<div className="userName">
								Jan Everaert
							</div>
						</div>
						<div className="commentContent">
							<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula, dolor a scelerisque iaculis, turpis est mollis lectus, nec eleifend tortor arcu nec ligula. Praesent tempor non sem sit amet elementum. Duis sed elit molestie, dictum mauris et, interdum ipsum. Maecenas finibus vulputate nisl, mattis maximus leo mattis a. Sed libero tellus, viverra id sapien ac, constius sodales magna. Aenean sagittis leo malesuada mauris auctor posuere. Sed lorem est, tempus id imperdiet vitae, faucibus non metus. Aenean mi orci, porta convallis velit eu, bibendum congue nisl. In pharetra porta sem, non pretium neque viverra at. Sed porttitor condimentum risus, eget fermentum enim tincidunt eu. Mauris aliquet mauris quis risus molestie, nec sollicitudin orci viverra.


							</p>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default connect(state => {
return {}
}, dispatch => {
 return {}
 }
)(CommentApp);
