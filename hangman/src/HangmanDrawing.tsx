const HEAD = (
    <div className="head"></div>
)

const BODY = (
    <div className="body"></div>
)

const RIGHTARM = (
    <div className="rightArm"></div>
)

const LEFTARM = (
    <div className="leftArm"></div>
)

const LEFTLEG = (
    <div className="leftLeg"></div>
)

const RIGHTLRG = (
    <div className="rightLeg"></div>
)

const BODYPARTS = [HEAD, BODY, RIGHTARM,LEFTARM,RIGHTLRG,LEFTLEG]

//define numberOfGuesses's type as number
type HangmanDrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
    return (
        <div className="hangmanDrawing">
            {/* show up part of the hangman when users guess a wrong letter everytime till all of the body parts appear*/}
           {BODYPARTS.slice(0,numberOfGuesses)}
            <div className="shortBar"></div>
            <div className="topBar"></div>
            <div className="verticalBar"></div>
            <div className="bottomBar"></div>
        </div>
    )
}