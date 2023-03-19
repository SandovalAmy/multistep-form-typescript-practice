import { FormEvent, useState } from "react"
import { AccountForm } from "./AccountForm"
import { AddressForm } from "./AddressForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./UserForm"

type FormData = {
  firstName: string,
  lastName: string,
  age: string,
  street: string,
  city: string,
  state: string,
  zip: string,
  email: string,
  password: string,
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

function App() {
  {/*use state to persist data between back and next buttons --
    this means creating initial data, passing it through to each step,
    then updating state with updateFields function --
    this uses partial type so everything is optional and 
    any of the values can be passed through 
    instead of all of the form data being passed through every time
    that we call the updateFields function*/}
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    {/* previous data from last render*/}
    setData(prev => {
      {/* override old info (prev) with new info (fields)*/}
      return { ...prev, ...fields}
    })
  }

  {/*here we are passing the data, as well as a way to update it*/}
  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultistepForm([
  <UserForm {...data} updateFields={updateFields} />, 
  <AddressForm {...data} updateFields={updateFields} />, 
  <AccountForm {...data} updateFields={updateFields} />
])

  {/*instead of calling next() in next button (like the back button), 
    calling next() in onSubmit prevents page refresh and provides form validation
    also, when on the last step, and clicking finish, an alert will pop up
    here you could add a POST request*/}
  function onSubmit(e: FormEvent){
    e.preventDefault()
    if (!isLastStep) return next()
    alert("Your account has been successfully created.")
  }

  return (
    <div style={{
      position: "relative",
      background: "white",
      border: "1px solid black",
      padding: "2rem",
      margin: "1rem",
      borderRadius: ".5rem",
      fontFamily: "Arial",
      maxWidth: "max-content",
    }}>
      <form onSubmit={onSubmit}>
        {/*div for handling current step and total steps*/}
        <div style={{
           position: "absolute",
           top: ".5rem",
           right: ".5rem"
        }}>
          {/* +1 so that array starts with 1 instead of 0*/}
          {currentStepIndex + 1} / {steps.length}
        </div>
        {/*render step we are on*/}
        {step}
        {/*container for buttons*/}
        <div style={{
          marginTop: "1rem",
          display: "flex",
          gap: ".5rem",
          justifyContent: "flex-end",
        }}>
          {/* if we are not on the first step, return the back button*/}
          {!isFirstStep && <button type="button" onClick={back}>Back</button>}
          {/* if we are on the last step, display 'finish,' otherwise 'next'*/}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>

        </div>
      </form>
    </div>
  )
}

export default App
