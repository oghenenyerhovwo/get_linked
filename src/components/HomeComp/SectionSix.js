import React from 'react'

// importing css
import styles from "./sectionsix.module.css"

const timeline = [
  {
    _id: 1,
    title: "Hackathon Announcement",
    body: "The getlinked tech hackathon 1.0 is formally announced to the general public and teams begin to get ready to register",
    date: "November 18, 2023",
  },
  {
    _id: 2,
    title: "Teams Registration begins",
    body: "Interested teams can now show their interest in the getlinked tech hackathon 1.0 2023 by proceeding to register",
    date: "November 18, 2023",
  },
  {
    _id: 3,
    title: "Teams Registration ends",
    body: "Interested Participants are no longer Allowed to register",
    date: "November 18, 2023",
  },
  {
    _id: 4,
    title: "Announcement of the accepted teams and ideas",
    body: "All teams whom idea has been accepted into getlinked tech hackathon 1.0 2023 are formally announced",
    date: "November 18, 2023",
  },
  {
    _id: 5,
    title: "Getlinked Hackathon 1.0 Offically Begins",
    body: "Accepted teams can now proceed to build their ground breaking skill driven solutions",
    date: "November 18, 2023",
  },
  {
    _id: 6,
    title: "Demo Day",
    body: "Teams get the opportunity to pitch their projects to judges. The winner of the hackathon will also be announced on this day",
    date: "November 18, 2023",
  },
]

const SectionSix = props => {
  const { elTimeline } = props

  return (
    <section ref={elTimeline} className={`${styles.sectionsix}`}>
      <div className={`${styles.sectionsix_container}`}>
        <h2 className="spacing-sm">Timeline</h2>
        <p className="spacing-md">Here is the breakdown of the time we anticipate using for the upcoming event.</p>
        <div className={`${styles.sectionsix_timeline}`}>
          {
            timeline.map(event => (
              <div className={`${styles.sectionsix_event}`} key={event._id}>
                <div className={`${styles.sectionsix_event_main}`}>
                  <h3>{event.title} </h3>
                  <p>{event.body} </p>
                </div>
                <h4 className={`${styles.sectionsix_event_date}`}>{event.date} </h4>
                <div className={`${styles.sectionsix_event_lines_circle}`}>
                  <div className={`${styles.sectionsix_event_lines_circle_container}`}>
                    <div></div>
                    <div>{event._id} </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default SectionSix