function Rocket({progress}) {

    return (
        <div className='space-container'>
            <div className='rocket-animation'>
                <main className='container'>
                    <div className='rocket'>
                        <div className='window'></div>
                        <span>{progress}</span>
                    </div>
                    <div className='fin-left fin'></div>
                    <div className='fin-right fin'></div>
                    <div className='Propeller'></div>
                    <div className="fire">
                        <div className="orange"></div>
                        <div className="yellow"></div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Rocket