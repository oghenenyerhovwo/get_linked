import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"

// import objects and functions
import {
  questionMark,
  faqPic,
  purpleStar,
  star2,
} from "../../assets"

// importing css
import styles from "./sectionfive.module.css"


const faqs = [
  {
    _id: 1,
    question: "Can I work on a project I started before the hackathon?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deserunt aliquam suscipit quis reiciendis libero, earum aperiam.",
  },
  {
    _id: 2,
    question: "What happens if I need help during the hackathon?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deserunt aliquam suscipit quis reiciendis libero, earum aperiam.",
  },
  {
    _id: 3,
    question: "What happens if I need help during the hackathon?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deserunt aliquam suscipit quis reiciendis libero, earum aperiam.",
  },
  {
    _id: 4,
    question: "What happens if I don't have an idea for a project?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deserunt aliquam suscipit quis reiciendis libero, earum aperiam.",
  },
  {
    _id: 5,
    question: "What happens after the hackathon ends?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deserunt aliquam suscipit quis reiciendis libero, earum aperiam.",
  },
  {
    _id: 6,
    question: "Can I work on a project I started before the hackathon?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deserunt aliquam suscipit quis reiciendis libero, earum aperiam.",
  },
]

const faqAnswersVariant = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  
}

const SectionFive = props => {
  const { elFaq } = props
  const [faqAnswerId, setFaqAnswerId] = useState("")

  return (
    <section ref={elFaq} className={`${styles.sectionfive}`}>
      <div className={`${styles.sectionfive_container}`}>
        <div className={`${styles.sectionfive_text}`}>
          <h2 className="spacing-sm">
            <span>Frequently Ask</span>
            <span>Question</span>
          </h2>
          <p className="spacing-md">
            We got answers to the questions that you might
            want to ask about getlinked Hackathon 1.0
          </p>
          <div className={`${styles.sectionfive_faqs}`}>
            {
              faqs.map(faq => {
                const displayAnswers = () => setFaqAnswerId(faq._id)
                const hideAnswers = () => setFaqAnswerId("")

                return (
                  <div className={`${styles.sectionfive_faqs_card}`} key={faq._id}>
                    <div className={`${styles.sectionfive_faqs_card_question}`}>
                      <p>{faq.question} </p>
                      {
                        Number(faqAnswerId) === faq._id ? (
                          <span onClick={hideAnswers}>-</span>
                        ): (
                          <span onClick={displayAnswers}>+</span>
                        )
                      }
                    </div>
                    <AnimatePresence mode="wait">
                      {
                        (Number(faqAnswerId) === faq._id)  && (
                          <motion.div 
                            className={`${styles.sectionfive_faqs_card_answer}`}
                            variants={faqAnswersVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            key="faqs_aswer"
                          >
                            {faq.answer}
                          </motion.div>
                        )
                      }
                    </AnimatePresence>
                  </div>
                )
              })
            }
          </div>
          <img className={`${styles.sectionfive_icons} ${styles.sectionfive_icons_star1}`} src={purpleStar} alt="star1" />
          <img className={`${styles.sectionfive_icons} ${styles.sectionfive_icons_star2}`} src={star2} alt="star2" />
        </div>
        <div className={`${styles.sectionfive_img}`}>
          <div className={`${styles.sectionfive_img_question_mark}`}>
            <img src={questionMark} alt="questionMark" />
            <img src={questionMark} alt="questionMark" />
            <img src={questionMark} alt="questionMark" />
          </div>
          <img src={faqPic} alt="faqPic" />
        </div>
      </div>
    </section>
  )
}

export default SectionFive