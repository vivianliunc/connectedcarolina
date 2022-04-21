function Navbar() {
	return (
		<nav className="navbar py-2 px-5" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="https://bulma.io">
					<h1 className="is-size-4 has-text-primary has-text-weight-bold">connectedcarolina</h1>
				</a>

				<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-start">

				</div>

				<div className="navbar-end">
					<a className="navbar-item has-text-weight-medium has-text-primary">
						Home
					</a>

					<a className="navbar-item has-text-weight-medium has-text-primary">
						Create Group
					</a>

					<a className="navbar-item has-text-weight-medium has-text-primary">
						My Groups
					</a>
					<a className="navbar-link">
						<img src={require("../assets/profile_pic.png")} width="42" height="42" alt="profile pic" />
					</a>
				</div>
			</div>
		</nav >
	)
}

export default Navbar;