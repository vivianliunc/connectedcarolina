import Navbar from "../components/Navbar";
import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import db from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import GroupCard from "../components/GroupCard";

function GroupFeed() {


  const [formats, setFormats] = useState(() => ['bold', 'italic']);
  const [groupsFiltered, setGroupsFiltered] = useState();
  const [groups, setGroups] = useState();
  const [filter, setFilter] = useState(
    {startDate : undefined,
    endDate : undefined,
    tags : undefined,
    event : false,
    days : undefined,
    groupType : ["study", "social"],
    search : undefined
    });

  const handleFormat = (
    event: MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  let groupcards = (groupsFiltered && groupsFiltered.map(group => (

    <GroupCard 
      creator={group.creator}
      days={group.days}
      title={group.title}
      description={group.description}
      event={group.event}
      tags={group.tags}
      key={group.created}
      social={isSocial(group)} />
  )))

  function isSocial(group) {
    if(group.groupType === undefined) {
      return false;
    } else {
      return group.groupType.includes("social");
    }
  }

  function updateFilter(event) {

    switch(typeof Object.getOwnPropertyDescriptor(filter, event.target.id).value) {
      case "boolean":
        setFilter(prevState => (
          {
            ...prevState,
            [event.target.id] : event.target.checked
          }
        ));
        break;
      case "object":
        let arrCopy = Object.getOwnPropertyDescriptor(filter, event.target.id).value;
        if(event.target.checked) {
          console.log("check");
          arrCopy.push(event.target.value);
        } else {
          arrCopy = arrCopy.filter(elm => elm !== event.target.value)
        }

        setFilter(prevState => (
          {
            ...prevState,
            [event.target.id] : arrCopy
          }
        ));
        break;
      default:
        break;

    }
  }

  function filterGroups(group) {
    //let res = filter.event? group.event : !group.event;
    let res = true;

    for (const val in filter) {

      let groupPropVal = Object.getOwnPropertyDescriptor(group, val);
      let filterPropVal = Object.getOwnPropertyDescriptor(filter, val);

      if(groupPropVal === undefined || filterPropVal === undefined) continue;

      switch(typeof filterPropVal.value) {
        case "boolean":
          res = filterPropVal.value? groupPropVal.value : !groupPropVal.value;
          break;
        case "object":
          let success = false;
          for(let idx = 0; idx < filterPropVal.value.length; idx++) {
            let elm = filterPropVal.value[idx];
            if(groupPropVal.value.includes(elm)) {
              success = true;
              break;
            }
          }
          
          res = success;
          break;
        default:
          break;
      }

      if(!res) {
        break;
      }
    }

    return res;
  }

  useEffect(() => {
    async function getQuery() {
      let groupsList = []
      const query = await getDocs(collection(db, 'Groups'))
      query.forEach(doc => groupsList.push(doc.data()));
      setGroups(groupsList);
      setGroupsFiltered(groupsList.filter(filterGroups))
    }
    getQuery();
  }, [])

  useEffect(() => {
    if(groups === undefined) return;
    setGroupsFiltered(groups.filter(filterGroups));
  }, [filter])

  return (
    <>
      <div className="group-feed">
        <Navbar />
        <section className="section p-6">
          <div className="container is-widescreen">
            <div className="columns is-variable is-8">
              <div className="column">
                <div className="box">
                  <p className="has-text-weight-bold is-size-3 has-text-black pt-1 pb-3">
                    Filters
                  </p>
                  <p className="has-text-black has-text-weight-semibold is-size-5 pt-1 pb-2">Types</p>
                  <div className="py-1">
                    <label className="checkbox has-text-weight-medium">
                      <input id="groupType" value="social" type="checkbox" defaultChecked onChange={updateFilter}/>
                      <span className="has-text-white">_</span>Social Groups
                    </label>
                  </div>
                  <div className="py-1">
                    <label className="checkbox has-text-weight-medium pr-4">
                      <input id="groupType" value="study" type="checkbox" defaultChecked onChange={updateFilter}/>
                      <span className="has-text-white">_</span>Study Groups
                    </label>
                  </div>
                  <div className="py-1">
                    <label className="checkbox has-text-weight-medium pr-4">
                      <input id="event" type="checkbox" onChange={updateFilter}/>
                      <span className="has-text-white">_</span>(Temp) Event / Recurring
                    </label>
                  </div>
                  <hr className="my-4" />
                  <p className="has-text-black has-text-weight-semibold is-size-5 pt-1 pb-4">Tags</p>
                  <div className="control has-icons-right pb-4">
                    <input className="input has-text-black is-small" type="text" placeholder="Search for a tag" />
                    <span className="icon is-small is-right">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <div className="has-text-black has-text-weight-medium mb-3">
                    <span className="mr-1">Majors</span>
                    <span className="icon">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                  <div className="has-text-black has-text-weight-medium mb-3">
                    <span className="mr-1">Sports</span>
                    <span className="icon">
                      <i className="fas fa-chevron-up"></i>
                    </span>
                  </div>
                  <div className="tags are-small are-rounded">
                    <span className="tag is-rounded is-primary has-text-weight-semibold has-text-white">Soccer</span>
                    <span className="tag is-rounded is-primary has-text-weight-semibold has-text-white">Football</span>
                    <span className="tag is-rounded has-text-weight-semibold has-text-dark">Baseball</span>
                    <span className="tag is-rounded has-text-weight-semibold has-text-dark">Basketball</span>
                    <span className="tag is-rounded has-text-weight-semibold has-text-dark">Hockey</span>
                    <span className="tag is-rounded has-text-weight-semibold has-text-dark">Golf</span>
                    <span className="tag is-rounded has-text-weight-semibold has-text-dark">Other Sports</span>
                    <span className="tag is-rounded has-text-weight-semibold has-text-dark">Sports Watching</span>
                  </div>
                  <div className="has-text-black has-text-weight-medium mb-3">
                    <span className="mr-1">Interests</span>
                    <span className="icon">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                  <div className="has-text-black has-text-weight-medium mb-3">
                    <span className="mr-1">Music</span>
                    <span className="icon">
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>

                  <hr className="my-3" />
                  <p className="has-text-black has-text-weight-semibold is-size-5 pt-1 pb-4">Meeting Availability</p>
                  <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                    color="primary"
                    size="small"
                    fullWidth
                    sx={{
                      borderRadius: '9999px',
                    }}
                  >
                    <ToggleButton value="sunday" aria-label="bold">
                      S
                    </ToggleButton>
                    <ToggleButton value="monday" aria-label="italic">
                      M
                    </ToggleButton>
                    <ToggleButton value="tuesday" aria-label="underlined">
                      T
                    </ToggleButton>
                    <ToggleButton value="wednesday" aria-label="color">
                      W
                    </ToggleButton>
                    <ToggleButton value="thursday" aria-label="italic">
                      T
                    </ToggleButton>
                    <ToggleButton value="friday" aria-label="underlined">
                      F
                    </ToggleButton>
                    <ToggleButton value="saturday" aria-label="color">
                      S
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <div className="column is-half">
                <span className="is-size-2 has-text-weight-bold has-text-black">Home</span>
                <div className="field pt-4">
                  <div className="control has-icons-right">
                    <input className="input has-text-black" type="text" placeholder="Search for groups by name" />
                    <span className="icon is-small is-right">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                {groupcards}
                {/* <article className="media my-5">
									<figure className="media-left">
										<p className="image is-64x64">
											<img src={require("../assets/profile_pic.png")} alt="face" />
										</p>
									</figure>
									<div className="media-content">
										<div className="content">
											<p>
												<strong className="has-text-black">Cricket @ Community Pitch</strong>
												<br />
												Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ex tortor. In
												a metus nisi. Sed laoreet sit amet lacus et sagittis. Quisque interdum purus quis
												quam eleifend tempus. In ultrices diam ac odio vestibulum, ut lacinia sapien id tristique tortor efficitur. Nam semper...                                         </p>
										</div>
										<div className="tags">
											<span className="tag is-rounded has-text-weight-semibold has-text-white is-success">Social Group</span>
											<span className="tag is-rounded has-text-weight-semibold has-text-dark">Other Sports</span>
										</div>
									</div>
								</article>
								<article className="media my-5">
									<figure className="media-left">
										<p className="image is-64x64">
											<img src={require("../assets/ui-faces/person_1.png")} alt="face" />
										</p>
									</figure>
									<div className="media-content">
										<div className="content">
											<p>
												<strong className="has-text-black">COMP 550 Study Group</strong>
												<br />
												Aliquam lobortis sodales ipsum, vel molestie ipsum sollicitudin ac. Curabitur
												vehicula urna eget ex mattis, id tristique tortor efficitur. Nam semper pretium
												scelerisque. Nunc enim ex.
											</p>
										</div>
										<div className="tags">
											<span className="tag is-rounded has-text-weight-semibold has-text-white is-success">Study Group</span>
											<span className="tag is-rounded has-text-weight-semibold has-text-dark">COMP</span>
										</div>
									</div>
								</article>
								<article className="media my-5">
									<figure className="media-left">
										<p className="image is-64x64">
											<img src={require("../assets/profile_pic.png")} alt="face" />
										</p>
									</figure>
									<div className="media-content">
										<div className="content">
											<p>
												<strong className="has-text-black">PHYS118 Study Buddies</strong>
												<br />
												Vestibulum at quam eleifend, interdum nibh eu, laoreet tortor.
											</p>
										</div>
										<div className="tags">
											<span className="tag is-rounded has-text-weight-semibold has-text-white is-success">Study Group</span>
											<span className="tag is-rounded has-text-weight-semibold has-text-dark">PHYS</span>
										</div>
									</div>
								</article>
								<article className="media my-5">
									<figure className="media-left">
										<p className="image is-64x64">
											<img src={require("../assets/ui-faces/person_1.png")} alt="face" />
										</p>
									</figure>
									<div className="media-content">
										<div className="content">
											<p>
												<strong className="has-text-black">Indie Film Appreciators</strong>
												<br />
												Integer eget hendrerit quam. Nam elementum nec ligula at gravida. Nulla non
												tincidunt lectus. Suspendisse accumsan egestas massa, at sollicitudin dui tincidunt
												accumsan suscipit dolor, et euismod ante blandit quis.
											</p>
										</div>
										<div className="tags">
											<span className="tag is-rounded has-text-weight-semibold has-text-white is-success">Social Group</span>
											<span className="tag is-rounded has-text-weight-semibold has-text-dark">Movies</span>
										</div>
									</div>
								</article> */}
              </div>
              <div className="column">

              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="footer">
        <div className="content has-text-centered has-text-white">
          <span className="is-size-4 has-text-weight-bold">connectedcarolina</span>
          <p className="has-text-weight-medium mt-4">
            ConnectedCarolina by Pranav Chintalapudi, Will Ritchie, Vivian Li and Shivram Ramkumar.
          </p>
        </div>
      </footer>
    </>
  );
}

export default GroupFeed;