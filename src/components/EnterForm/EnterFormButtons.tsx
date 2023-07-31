import "./style.css"

interface EnterFormButtonsProps { showReg: () => void; }

const EnterFormButtons = ({ showReg }: EnterFormButtonsProps) => {
    return (
        <>
            <div className = "home__wrapper-container__buttons">
                <button 
                    className = "enter__button" 
                    type="submit"
                    value="submit"
                >
                    войти
                </button>
                <button 
                    className = "register__button" 
                    type = "button"
                    onClick = {showReg}
                >
                    регистрация
                </button>
            </div>
        </>
    )
}

export default EnterFormButtons