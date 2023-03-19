import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function next() {
        setCurrentStepIndex(i => {
            //if at the last step, return current index, otherwise increment by 1
            if(i >= steps.length - 1) return i
            return i + 1
        })
    }

    function back() {
        setCurrentStepIndex(i => {
            //if at the first step, return current index, otherwise decrement by 1
            if(i <= 0) return i
            return i - 1
        })

    }

    function goTo(index:number){
        setCurrentStepIndex(index)
    }

    return {
        //this will return our current step
        currentStepIndex,
        step: steps[currentStepIndex],
        //automatically return the steps we pass in
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back
    }
}
