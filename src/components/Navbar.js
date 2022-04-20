function Navbar() {
    return (
        <nav class="navbar py-2 px-5" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                    <h1 class="is-size-4 has-text-primary has-text-weight-bold">connectedcarolina</h1>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">

                </div>

                <div class="navbar-end">
                    <a class="navbar-item has-text-weight-medium has-text-primary">
                        Home
                    </a>

                    <a class="navbar-item has-text-weight-medium has-text-primary">
                        Create Group
                    </a>

                    <a class="navbar-item has-text-weight-medium has-text-primary">
                        My Groups
                    </a>
                    <a class="navbar-link">
                        <img src={require("../assets/profile_pic.png")} width="42" height="42" alt="profile pic" />
                    </a>
            </div>
        </div>
        </nav >
    )
}

export default Navbar;