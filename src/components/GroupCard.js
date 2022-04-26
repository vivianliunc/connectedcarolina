function GroupCard(props) {
  let tags = (props.tags && props.tags.map(tag => (
    <span className="tag is-rounded has-text-weight-semibold has-text-dark"
      key={tag}>
      {tag}
    </span>
  )))

  return (
    <article className="media my-5">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={require("../assets/profile_pic.png")} alt="face" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong className="has-text-black">{props.title}</strong>
            <br />
            {props.description}
          </p>
        </div>
        <div className="tags">
          <span className="tag is-rounded has-text-weight-semibold has-text-white is-success">
            {props.social ? 'Social Group' : 'Study Group'}
          </span>
          {tags}
        </div>
      </div>
    </article>
  )
}

export default GroupCard;